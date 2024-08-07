import fs from "fs/promises"
import { existsSync, writeFileSync } from "fs"
import path from "path"
import { Auth, google } from "googleapis"
import express, { Request, Response } from "express"

const SCOPES = [
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
]
const TOKEN_PATH = path.join(process.cwd(), "token.json")
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json")

async function authorize_fail(): Promise<Auth.OAuth2Client> {
  const content = await fs.readFile(CREDENTIALS_PATH, "utf-8")
  const credentials = JSON.parse(content)

  const { client_secret, client_id } = credentials.installed
  //  || credentials.web

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    "http://localhost:3000/oauth2callback"
    // redirect_uris
  )
  if (existsSync(TOKEN_PATH)) {
    const token = await fs.readFile(TOKEN_PATH, "utf-8")
    oAuth2Client.setCredentials(JSON.parse(token))
  } else {
    await getAccessToken(oAuth2Client)
  }
  return oAuth2Client
}

async function getAccessToken(oAuth2Client: Auth.OAuth2Client) {
  return new Promise<void>((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    })

    console.log("Authorize this app by visiting this url:", authUrl)

    const app = express()
    app.use("/oauth2callback", async (req: Request, res: Response) => {
      const code = req.query.code as string
      if (!code) {
        res.send("Error: No code found in the URL")
        return reject("No code found in the URL")
      }
      try {
        const { tokens } = await oAuth2Client.getToken(code)
        oAuth2Client.setCredentials(tokens)
        writeFileSync(TOKEN_PATH, JSON.stringify(tokens))
        console.log("Token stored to", TOKEN_PATH)
        res.send("Authorization successful! You can close this window.")
        resolve()
      } catch (err) {
        res.send(`Error retrieving access token: ${err}`)
        reject(err)
      } finally {
        server.close()
      }
    })
    const server = app.listen(3001, () => {
      console.log("OAuth2 callback server is running on http://localhost:3001")
    })
  })
}
export { authorize_fail }
