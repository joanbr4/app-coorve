import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { apiConfig, appConfig } from "../../config";
import { Request, Response } from "express";
import { pathRoot } from "../../routes/routes";

const SCOPES = [
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];

// In-memory storage for token (Note: This will not persist across function invocations)
export let savedToken: any = null;

async function loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
  if (savedToken) {
    const client = new OAuth2Client(
      apiConfig.google_cl_id,
      apiConfig.google_cl_secret,
      apiConfig.google_redirect_uris
    );
    client.setCredentials(savedToken);
    return client;
  }
  return null;
}

function saveCredentials(client: OAuth2Client) {
  savedToken = client.credentials;
  return savedToken;
}

async function oAuthController(req: Request, res: Response) {
  console.log("hola Oauth");
  const userEmail = req.query.userEmail as string;

  const client = new OAuth2Client(
    apiConfig.google_cl_id,
    apiConfig.google_cl_secret,
    appConfig.backend_url + apiConfig.google_redirect_uris
  );

  // Generate a url that asks permissions for the required scopes
  const authorizationUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    state: userEmail,
  });

  // console.log("Authorize this app by visiting this url:", authorizationUrl);
  res.redirect(authorizationUrl);
}

async function oAuth2CallbackController(req: Request, res: Response) {
  const code = req.query.code as string;
  const userEmail = req.query.state as string;

  console.log("code:", code);
  const client = new OAuth2Client(
    apiConfig.google_cl_id,
    apiConfig.google_cl_secret,
    appConfig.backend_url + apiConfig.google_redirect_uris
  );

  const { tokens } = await client.getToken(code);
  console.log("token:", tokens);
  client.setCredentials(tokens);

  saveCredentials(client);

  res.cookie("refresh_token", tokens.refresh_token, {
    httpOnly: true,
    secure: true, // Only send over HTTPS
    sameSite: "strict",
  });

  console.log("Authorization successful!");
  // res.redirect(
  //   `http://localhost:3000/api/v1/google/sheets?userEmail=${userEmail}`
  // );
  // res.redirect("http://localhost:5173/user/dashboard");
  res.send(`
    <html>
      <body>
        <script>
          // Inform the parent window about the successful authentication
          if (window.opener) {
            window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', token: '${tokens.access_token}' }, '${appConfig.frontend_url}');
          }
          // Close the popup window after a short delay to ensure the message is sent
          setTimeout(() => {
            window.close();
          }, 500);
        </script>
        <p>Authorization successful! You can close this window.</p>
      </body>
    </html>
  `);
}

export { oAuth2CallbackController, oAuthController };
