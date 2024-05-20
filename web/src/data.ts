import { Ttarifa } from "./types/types";

export const tarifas: Ttarifa[] = [
  {
    titulo: "Free",
    detalles: "Receive 10 free leads, every week",
    precio: 0,
    features: [
      "Receive 10 leads upon signup (~10 leads)",
      "Receive 10 new leads every week",
      "(~10 leads)",
      "20+ data points per company",
      "Likely to outsource field",
      "Partnership opportunitie",
    ],
    action: "Sign Up",
  },
  {
    titulo: "Monthly",
    detalles: "Receive a new list, every month",
    precio: 50,
    features: [
      "Receive previous month's list upon signup (~1,000 leads)",
      "Receive a brand new list on the 1st of every month",
      "(~1,000 leads)",
      "Every list has 500+ verified email addresses",
      "Every list has 1,000+ LinkedIn accounts",
    ],
    action: "Suscribe",
  },
];
