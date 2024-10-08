import { z } from "zod";

const genereSchema = z.enum(["Hombre", "Mujer", "NS/NC"]);

export const userSchema = z.object({
  name: z.string().min(3, { message: "El nombre no puede estar vacío" }),
  surname: z
    .string()
    .min(3, { message: "El/los apellidos no puede estar vacío" }),
  phone: z.string().min(5, { message: "El teléfono no puede estar vacío" }),
  genere: genereSchema,
  email: z
    .string()
    .min(5, { message: "El email no puede estar vacío" })
    .email("Formato de correo no válido"),
  password: z
    .string()
    .regex(/[a-z]/, {
      message: "La contraseña tiene que tener una letra minuscula",
    })
    .regex(/[A-Z]/, {
      message: "La  contraseña tiene que tener una letra mayúscula",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "La contrasena tiene que tener un letra especial",
    })
    .min(8, { message: "La contraseña debe tener entre 8 y 20 carácteres" })
    .max(20, { message: "La contraseña debe tener entre 8 y 20 carácteres" }),
  confirm: z.string(),
});

export type User = z.infer<typeof userSchema>;
