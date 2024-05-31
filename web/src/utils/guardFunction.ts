import { UserRegister } from "@/schemas/registerSchema";
import { ErrorfromServer } from "@/types/types";

export function isUserRegister(data: unknown): data is UserRegister {
  return data != null && (data as UserRegister).email !== undefined;
}

export function isErrorFromServer(data: unknown): data is ErrorfromServer {
  return data != null && (data as ErrorfromServer).succes !== undefined;
}
