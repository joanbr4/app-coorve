import { userSchema } from "./userSchema";

export const resetSchema = userSchema.pick({
  email: true,
});
