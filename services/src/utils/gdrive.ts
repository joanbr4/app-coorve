import fs from "fs/promises"
import path from "path"
import process from "process"
import { authenticate } from "@google-cloud/local-auth"
import { Auth, google } from "googleapis"

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"]
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
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
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: Auth.OAuth2Client) {
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
  if (client.credentials) {
    await saveCredentials(client)
  }
  return client
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function listFiles(authClient: Auth.OAuth2Client, fileName: string) {
  // const folerId = "19YqQZInMkGGOVL7VHPZMDSnDLk0E6_0o"
  const folerId = "1vakbR28Pi-zSL-3OMfb9_P7DoKJluRl0"
  const drive = google.drive({ version: "v3", auth: authClient })
  const res = await drive.files.list({
    pageSize: 1000,
    fields: "nextPageToken, files(id, name)",
    // q: `${folerId} in parents`,
  })
  const files = res.data.files
  if (files?.length === 0 || files == undefined) {
    console.log("No files found.")
    return
  }

  console.log("Files:")
  files.map((file) => {
    if (file.name?.includes(fileName)) {
      console.log(`${file.name} (${file.id})`)
      return file.id
    }
    // console.log(`${file.name} (${file.id})`)
  })
  return files
}

authorize().then(listFiles).catch(console.error)

const googleDriveApi = async (fileName: string) => {
  const data = await authorize()
  const listFilesId = listFiles(data, fileName)

  return listFilesId[0]

  // return nameFile
}

export { googleDriveApi }
