import { Response, Request } from "express";
import { apiConfig } from "../config";
import { pathRoot } from "../routes/routes";
import { OAuth2Client } from "google-auth-library";

const SCOPES = [
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];

const oauth2Client = new OAuth2Client(
  apiConfig.google_cl_id,
  apiConfig.google_cl_secret,
  "http://localhost:3000/api/v1/google/sheets/outh2callback"
  // "http://localhost:3000"
  // + pathRoot.v1.google.sheets
);

const oauthController = (req: Request, res: Response) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  res.redirect(url);
};

const oauthCallbackController = async (req: Request, res: Response) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code as string);
  oauth2Client.setCredentials(tokens);
  res.send("Successfully authenticated with Google Drive API!");
};

export { oauthController, oauthCallbackController };
