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
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: apiConfig.google_cl_id,
    client_secret: apiConfig.google_cl_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function createTemporaryCredentialsFile(): Promise<string> {
  const tempCredentialsPath = path.join(process.cwd(), "temp_credentials.json");

  const credentials = {
    installed: {
      client_id: apiConfig.google_cl_id,
      project_id: apiConfig.google_project_id,
      auth_uri: apiConfig.google_auth_uri,
      token_uri: apiConfig.google_token_uri,
      auth_provider_x509_cert_url: apiConfig.google_auth_provider_cert_url,
      client_secret: apiConfig.google_cl_secret,
      redirect_uris: [apiConfig.google_redirect_uris],
    },
  };

  await fs.writeFile(tempCredentialsPath, JSON.stringify(credentials));
  return tempCredentialsPath;
}

async function authorize(): Promise<Auth.OAuth2Client> {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }

  const tempCredentialsPath = await createTemporaryCredentialsFile();

  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: tempCredentialsPath,
  });

  if (client?.credentials) {
    await saveCredentials(client);
  }

  // Clean up the temporary credentials file
  await fs.unlink(tempCredentialsPath);

  return client;
}

export { authorize };
