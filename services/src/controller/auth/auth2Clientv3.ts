import fs from "fs/promises";
import path from "path";
import { authenticate } from "@google-cloud/local-auth";
import { Auth, google } from "googleapis";
import { apiConfig } from "../../config";

const SCOPES = [
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];

const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

async function loadSavedCredentialsIfExist(): Promise<Auth.OAuth2Client | null> {
  try {
    const content = await fs.readFile(TOKEN_PATH, "utf-8");
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials) as Auth.OAuth2Client;
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client: Auth.OAuth2Client) {
  const content = await fs.readFile(CREDENTIALS_PATH, "utf-8");
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}
async function createCredentialsFileIfNotExists(): Promise<void> {
  const credentials = {
    installed: {
      client_id: apiConfig.google_cl_id,
      project_id: apiConfig.google_project_id,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_secret: apiConfig.google_cl_secret,
      redirect_uris: [apiConfig.google_redirect_uris],
    },
  };

  try {
    await fs.writeFile(CREDENTIALS_PATH, JSON.stringify(credentials), "utf-8");

    // Optional: Check that the file exists and is readable
    await fs.access(CREDENTIALS_PATH);
  } catch (err) {
    console.error("Error writing credentials file:", err);
    throw err;
  }
}

async function authorize(): Promise<Auth.OAuth2Client> {
  await createCredentialsFileIfNotExists();

  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  console.log("bye-bye2");

  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  console.log("bye-bye3");

  if (client?.credentials) {
    await saveCredentials(client);
  }

  // Clean up the temporary credentials file
  // await fs.unlink(TEMP_CREDENTIALS_PATH);

  return client;
}

export { authorize };
