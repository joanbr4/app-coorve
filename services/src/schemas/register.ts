import { z } from "zod"
import { userSchema } from "./user"

export const userRgisterSchema = userSchema
  .pick({
    name: true,
    apellidos: true,
    email: true,
    genere: true,
    created_at: true,
  })
  .extend({ password: z.string().min(8), confirmPassword: z.string().min(8) })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password no coincide",
    path: ["confirmPassword"],
  })

export type UserRegister = z.infer<typeof userRgisterSchema>
