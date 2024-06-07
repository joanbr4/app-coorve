import { z } from "zod"
import { userLoginSchema } from "./login"
import { userSchema } from "./user"

// export type TSsoLoginRequest = z.infer<typeof userLoginSchema>

export const ssoLoginResponseSchema = userSchema.pick({ id: true }).extend({
  authToken: z.string().min(1),
  refreshToken: z.string().min(1),
})

export type TSsoLoginResponse = z.infer<typeof ssoLoginResponseSchema>

const validateRequestSchema = ssoLoginResponseSchema.pick({
  authToken: true,
})
export type ValidateRequest = z.infer<typeof validateRequestSchema>
