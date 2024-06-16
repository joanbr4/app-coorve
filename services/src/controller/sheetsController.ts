import { Response, Request } from "express"
import { db } from "../db/client"
import { users } from "../db/schemas"
import { eq } from "drizzle-orm"
import fs from "fs/promises"
import path from "path"
import { authenticate } from "@google-cloud/local-auth"
import { Auth, google } from "googleapis"

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
const TOKEN_PATH = path.join(process.cwd(), "token.json")
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json")

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist(): Promise<Auth.OAuth2Client | null> {
  try {
    const content = await fs.readFile(TOKEN_PATH, "utf-8")
    const credentials = JSON.parse(content)
    return google.auth.fromJSON(credentials) as Auth.OAuth2Client
  } catch (err) {
    return null
  }
}
/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client}  client
 * @return {Promise<void>}
 */
async function saveCredentials(client: Auth.OAuth2Client): Promise<void> {
  const content = await fs.readFile(CREDENTIALS_PATH, "utf-8")
  const keys = JSON.parse(content)
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await fs.writeFile(TOKEN_PATH, payload)
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize(): Promise<Auth.OAuth2Client> {
  let client = await loadSavedCredentialsIfExist()
  if (client) {
    return client
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  })
  if (client?.credentials) {
    await saveCredentials(client)
  }
  return client
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/19EpmzZlA1Dsxf9FnFpup82oLVekNIgf22GIqL-0DQ_w/edit?gid=2007987894#gid=2007987894
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function listMajors(
  auth: Auth.OAuth2Client,
  name: string
): Promise<string[][] | void> {
  const sheets = google.sheets({ version: "v4", auth })
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "19EpmzZlA1Dsxf9FnFpup82oLVekNIgf22GIqL-0DQ_w",
    range: "Resumen!F11:I",
  })
  const rows = res.data.values as Array<string[]>
  // console.log(rows)
  if (!rows || rows.length === 0) {
    console.log("No data found.")
    return
  }
  // return rows
  // console.log("Name, Major:")
  let indexUser = 0
  let user = ""
  const dataUseTable: string[][] = []
  rows.forEach((row) => {
    if (row[0].includes("Concepto")) {
      indexUser = row.findIndex((item) => item == name)
      user = row[indexUser]
      console.log(indexUser)
    }
    dataUseTable.push([row[0], row[indexUser]])
  })
  return dataUseTable
}

const sheetsController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const dataUser = await db.select().from(users).where(eq(users.email, email))
    const { name } = dataUser[0]
    const auth = authorize()
    const dataTable = await auth
    const dataUserTable = await listMajors(dataTable, name)
    console.log("data", dataUserTable)
    res.send({ data: dataUserTable })
  } catch (err: any) {
    console.error
    throw new Error(err)
  }
}

export default sheetsController
