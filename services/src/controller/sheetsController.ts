import { Auth, google } from "googleapis";
import { ErrorsApisDrive, NotFoundError } from "../utils/errors";
import { authorize } from "./auth/auth2Clientv2";
import { apiConfig } from "../config/index";
import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { users } from "../db/schemas";
import { Request, Response } from "express";

async function listFiles(
  authClient: Auth.OAuth2Client,
  fileName: string,
  folderId: string
): Promise<string[] | void> {
  const drive = google.drive({ version: "v3", auth: authClient });
  const res = await drive.files.list({
    pageSize: 200,
    fields: "nextPageToken, files(id, name)",
    q: `'${folderId}' in parents`,
  });

  const files = res.data.files;

  if (files?.length === 0 || files == undefined) {
    console.log("No files found.");
    return;
  }

  const fileId = files
    .filter((file) => file.name?.includes(fileName))
    .map((file) => file.id as string);

  console.log("Files:", fileId);
  return fileId;
}
let dataObjTable = {
  total: 0,
  no_interesa: 0,
  fuera_presupuesto: 0,
  cita_realizada: 0,
  contestaron: 0,
  NO_contestaron: 0,
  agendaron: 0,
  renta: 0,
  no_calificados: 0,
  primer_contacto: 0,
  interesado: 0,
  otros: 0,
};
type InitialDataObject = typeof dataObjTable;

async function listMajors(
  auth: Auth.OAuth2Client,
  sheetId: string
): Promise<InitialDataObject | void> {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Comprador!A1:M",
  });
  const rows = res.data.values as Array<string[]>;

  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return;
  }

  rows.forEach((row) => {
    if (row[4] == "Categoria") dataObjTable.otros += 0;
    else if (row[4] == "No interesa") dataObjTable.no_interesa += 1;
    else if (row[4] == "Fuera de presupuesto")
      dataObjTable.fuera_presupuesto += 1;
    else if (row[4] == "Cita realizada") dataObjTable.cita_realizada += 1;
    else if (row[4] == "Contestaron") dataObjTable.contestaron += 1;
    else if (row[4] == "NO constestaron") dataObjTable.NO_contestaron += 1;
    else if (row[4] == "Agendaron cita") dataObjTable.agendaron += 1;
    else if (row[4] == "Renta") dataObjTable.renta += 1;
    else if (row[4] == "") dataObjTable.no_calificados += 1;
    else if (row[4] == "Primer Contacto") dataObjTable.primer_contacto += 1;
    else if (row[4] == "Interesado") dataObjTable.interesado += 1;
    else dataObjTable.otros += 1;
  });
  dataObjTable.total = rows.length - 1;

  const copyTable = { ...dataObjTable };
  dataObjTable = {
    total: 0,
    no_interesa: 0,
    fuera_presupuesto: 0,
    cita_realizada: 0,
    contestaron: 0,
    NO_contestaron: 0,
    agendaron: 0,
    renta: 0,
    no_calificados: 0,
    primer_contacto: 0,
    interesado: 0,
    otros: 0,
  };
  return copyTable;
}

const sheetsController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const dataUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    const { name: nameUser, apellidos: apellidosUser } = dataUser[0];
    console.log("email", email, nameUser);
    const folderId = apiConfig.folder_id;
    const auth = await authorize();
    const nameFile = "Buyers - " + nameUser + " " + apellidosUser; //XLS doesnt works for api
    console.log("file", nameFile);
    const filesListId = await listFiles(auth, nameFile, folderId);
    if (filesListId == undefined)
      throw new NotFoundError("Not Found a User's File");
    if (filesListId.length > 1) throw new NotFoundError("More 1 match file");

    const fileId = filesListId[0];
    const dataUserTable = await listMajors(auth, fileId);
    console.log("data", dataUserTable);

    res.send({ data: dataUserTable });
  } catch (error) {
    const err = error as ErrorsApisDrive;
    console.log(
      err.message,
      "on",
      err.errors?.[0].location,
      err.errors?.[0].locationType
    );
    throw new Error(
      `${err.message} "on" ${err.errors?.[0].location} ${err.errors?.[0].locationType}`
    );
  }
};

export default sheetsController;
