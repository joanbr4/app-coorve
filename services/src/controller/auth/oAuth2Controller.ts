import { OAuth2Client } from "google-auth-library"
import { google } from "googleapis"
import { apiConfig, appConfig } from "../../config"
import { Request, Response } from "express"
import { pathRoot } from "../../routes/routes"

const SCOPES = [
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
]

// In-memory storage for token (Note: This will not persist across function invocations)
export let savedToken: any = null

async function loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
  if (savedToken) {
    const client = new OAuth2Client(
      apiConfig.google_cl_id,
      apiConfig.google_cl_secret,
      apiConfig.google_redirect_uris
    )
    client.setCredentials(savedToken)
    return client
  }
  return null
}

function saveCredentials(client: OAuth2Client) {
  savedToken = client.credentials
  return savedToken
}

async function oAuthController(req: Request, res: Response) {
  console.log("hola Oauth")
  const userEmail = req.query.userEmail as string

  const client = new OAuth2Client(
    apiConfig.google_cl_id,
    apiConfig.google_cl_secret,
    apiConfig.google_redirect_uris
  )

  // Generate a url that asks permissions for the required scopes
  const authorizationUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    state: userEmail,
  })

  // console.log("Authorize this app by visiting this url:", authorizationUrl);
  res.redirect(authorizationUrl)
}

async function oAuth2CallbackController(req: Request, res: Response) {
  const code = req.query.code as string
  const userEmail = req.query.state as string

  console.log("code:", code)
  const client = new OAuth2Client(
    apiConfig.google_cl_id,
    apiConfig.google_cl_secret,
    apiConfig.google_redirect_uris
  )

  const { tokens } = await client.getToken(code)
  console.log("token:", tokens)
  client.setCredentials(tokens)

  saveCredentials(client)

  res.cookie("refresh_token_google", tokens.refresh_token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, //7d
    secure: appConfig.port == "3000" ? false : true, // Only send over HTTPS
    sameSite: "lax",
    path: "/",
    domain: appConfig.port == "3000" ? "localhost" : "coorve.vercel.app", // Ensure path is root by default
  })

  res.cookie("auth_token_google", tokens.access_token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, //1d
    secure: appConfig.port == "3000" ? false : true, // Only send over HTTPS
    sameSite: "lax",
    path: "/", // Ensure path is root by default
    domain: appConfig.port == "3000" ? "localhost" : "coorve.vercel.app", // Ensure path is root by default
  })

  console.log("Authorization successful!")

  res.send(`
      <html>
      <body>
        <script>
          if (window.opener) {
            // Communicate success to opener
            window.opener.postMessage('oauth-success', '${appConfig.frontend_url}');
            // Close the window
            window.close();
          } else {
            document.body.innerHTML = 'Authentication successful. You can close this window.';
          }
        </script>
      </body>
    </html>
  `)
}

export { oAuth2CallbackController, oAuthController }
