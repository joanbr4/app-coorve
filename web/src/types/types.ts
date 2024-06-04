export type Ttarifa = {
  titulo: string;
  detalles: string;
  time: string;
  precio: number;
  features: string[];
  action: string;
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
