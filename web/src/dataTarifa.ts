import { Ttarifa } from "./types/types";

export const tarifas: Ttarifa[] = [
  {
    titulo: "Semanal",
    detalles: "Comprueba tu inversión",
    time: "WEEK",
    precio: 20,
    features: [
      "Accesos de cuenta publicitaria",
      "Creación de oferta de valor",
      "Copy de los anuncios",
      "Lanzamiento de campañas",
      "Notificacion instantanea de nuevo lead",
      "Seguimieto de campaña",
      "Optimizacion de campaña",
      "2 Juntas mensuales en video llamada siempre que sea necesario",
    ],
    action: "Seleccionar",
  },
  {
    titulo: "Mensual",
    detalles: "Maxima tu inversión",
    time: "MONTH",
    precio: 50,
    features: [
      "Accesos de cuenta publicitaria",
      "Creación de oferta de valor",
      "Copy de los anuncios",
      "Lanzamiento de campañas",
      "Notificacion instantanea de nuevo lead",
      "Seguimieto de campaña",
      "Optimizacion de campaña",
      "2 Juntas mensuales en video llamada siempre que sea necesario",
    ],
    action: "Suscribete",
  },
];
