// import { z } from "zod";
import { z } from "zod";
import { userSchema } from "./userSchema";

export const loginSchema = userSchema.pick({
  email: true,
  password: true,
});

export type UserLogin = z.infer<typeof loginSchema>;
