import { Dispatch, SetStateAction } from "react";

export type Ttarifa = {
  titulo: string;
  detalles: string;
  time: string;
  precio: number;
  features: string[];
  action: string;
  url: string;
};

export type ErrorfromServer = {
  succes: boolean;
  status: number;
  message: string;
  stack: object;
};

export type TUser = {
  name: string;
  apellidos: string;
  email: string;
  genere: string;
  residency: string;
  created_at: string;
  telephone: string;
} | null;

export type TdataChart = {
  total: number;
  no_interesa: number;
  fuera_presupuesto: number;
  cita_realizada: number;
  contestaron: number;
  NO_contestaron: number;
  agendaron: number;
  renta: number;
  otros: number;
};
export type TdataFromLogin = {
  user: TUser;
  token: string;
};

export type Ttoken = {
  access_token: string;
  scope: string;
  token_type: string;
  expiry_date: string;
};

export type TdataSheetApi = {
  data: TdataChart;
  token: Ttoken;
};

export type Tcontext<T> = {
  user: TUser;
  setParamId: Dispatch<SetStateAction<T>>;
};
