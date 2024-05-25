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
  .extend({ password: z.string().min(8) })

export type UserRegister = z.infer<typeof userRgisterSchema>
