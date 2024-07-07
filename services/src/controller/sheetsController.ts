import { Auth, google } from "googleapis"
import { NotFoundError } from "../utils/errors"
import { authorize } from "./auth/auth2Clientv2"
import { apiConfig } from "../config"
import { eq } from "drizzle-orm"
import { db } from "../db/client"
import { users } from "../db/schemas"
import { Request, Response } from "express"

async function listFiles(
  authClient: Auth.OAuth2Client,
  fileName: string,
  folderId: string
): Promise<string[] | void> {
  const drive = google.drive({ version: "v3", auth: authClient })
  const res = await drive.files.list({
    pageSize: 200,
    fields: "nextPageToken, files(id, name)",
    q: `'${folderId}' in parents`,
    // q: `'${folderId}' in parents and name contains '${fileName}'`,
  })

  const files = res.data.files

  if (files?.length === 0 || files == undefined) {
    console.log("No files found.")
    return
  }

  const fileId = files
    .filter((file) => file.name?.includes(fileName))
    .map((file) => file.id as string)

  // console.log(`${file.name})`)
  // console.log(`${file.name} (${file.id})`)
  // fileId.push(file.id as string)

  // console.log(`${file.name} (${file.id})`)

  console.log("Files:", fileId)
  return fileId
}

async function listMajors(
  auth: Auth.OAuth2Client,
  sheetId: string,
  name: string
): Promise<string[][] | void> {
  const sheets = google.sheets({ version: "v4", auth })
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Line!B29:E",
  })
  const rows = res.data.values as Array<string[]>
  // console.log(rows)
  if (!rows || rows.length === 0) {
    console.log("No data found.")
    return
  }

  let indexUser = 0

  const dataUseTable: string[][] = []
  console.log("dataF:", dataUseTable)
  rows.forEach((row) => {
    if (row[0] == "Concepto") {
      indexUser = row.findIndex((item) => item == name)
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
    const { name: nameUser } = dataUser[0]
    const folderId = apiConfig.folder_id
    const auth = await authorize()
    const nameFile = "Log Aprov" //XLS doesnt works for api
    const filesListId = await listFiles(auth, nameFile, folderId)
    // const name = "Bordo"
    if (filesListId == undefined)
      throw new NotFoundError("Not Found a User's File")
    if (filesListId.length > 1) throw new NotFoundError("More 1 match file")

    const fileId = filesListId[0]
    const dataUserTable = await listMajors(auth, fileId, nameUser)
    console.log("data", dataUserTable)

    // console.log("datafromG:", dataFileId)
    res.send({ data: dataUserTable })
  } catch (err: any) {
    console.log("eerrr", err)
    throw new Error(err)
  }
}

export default sheetsController
