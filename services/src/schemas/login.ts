import { z } from "zod"
import { userSchema as userSchema } from "./user"

export const userLoginSchema = userSchema.pick({
  email: true,
  password: true,
})

export const userJwtLoginSchema = userSchema.pick({
  id: true,
  email: true,
})

export const userLoginClientSchema = userSchema.pick({
  name: true,
  apellidos: true,
  email: true,
  genere: true,
  created_at: true,
})

export const userDataSchema = userSchema.omit({
  id: true,
})

export type UserLogin = z.infer<typeof userLoginSchema>
export type UserJwtLogin = z.infer<typeof userJwtLoginSchema>
export type UserLoginClient = z.infer<typeof userLoginClientSchema>
export type UserDataLogin = z.infer<typeof userDataSchema>
