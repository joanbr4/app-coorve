import bcrypt from "bcrypt"
import { bcryptConfig } from "../config/index"

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, bcryptConfig.saltRounds)
}

export const checkPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}
