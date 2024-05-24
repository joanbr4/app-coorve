import z from "zod"

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  apellidos: z.string(),
  email: z.string().email(),
  password: z.string(),
  genere: z.string(),
  created_at: z.string().date(),
})

export type User = z.infer<typeof userSchema>
