import { useEffect, useState } from "react";
import { redirect, Form, useActionData } from "react-router-dom";
import { UserRegister, registerSchema } from "../schemas/registerSchema";
import { ErrorfromServer } from "@/types/types";
import { isErrorFromServer, isUserRegister } from "@/utils/guardFunction";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import "isomorphic-fetch";

const initialState = {
  name: "",
  surname: "",
  phone: "",
  genere: "",
  email: "",
  password: "",
  confirm: "",
};
type InitialStateKeys = keyof typeof initialState;

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const dataObject = Object.fromEntries(formData);
  console.log("as", dataObject);
  const dataValidatedZod = registerSchema.safeParse({
    name: dataObject.name,
    surname: dataObject.surname,
    phone: dataObject.phone,
    genere: dataObject.genere,
    email: dataObject.email,
    password: dataObject.password,
    confirm: dataObject.confirm,
  });
  console.log("zod:", dataValidatedZod);
  if (dataValidatedZod.success == false) {
    const errorsFormated = dataValidatedZod.error?.issues.reduce(
      (acc, item) => {
        return { ...acc, [item.path[0] as string]: item.message };
      },
      {}
    ) as UserRegister;

    return errorsFormated;
  } else {
    const payload = {
      name: dataObject.name,
      surname: dataObject.surname,
      phone: dataObject.phone,
      genere: dataObject.genere,
      email: dataObject.email,
      password: dataObject.password,
      created_at: new Date(),
    };
    console.log(payload);
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.status !== 200) {
      const errorMessage = await response.json();
      return errorMessage;
    } else {
      return redirect("/signup");
    }
  }
};

function Register() {
  const [form, setForm] = useState<typeof initialState>(initialState);
  const [errorsZod, setErrorsZod] = useState<typeof initialState>(initialState);
  const [watchPass, setWatchPass] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<string>("");

  const dataFromAction = useActionData() as UserRegister | ErrorfromServer;
  useEffect(() => {
    if (isUserRegister(dataFromAction)) {
      setErrorsZod(dataFromAction);
    } else if (isErrorFromServer(dataFromAction)) {
      console.log(dataFromAction.message);
      setErrorEmail(dataFromAction.message);
    }
  }, [dataFromAction]);

  //Props Getter, patrón de Diseño React
  const register = (
    propertyName: InitialStateKeys,
    inputProps: Omit<React.ComponentProps<"input">, "name" | "value"> = {}
  ) => {
    const { type = "text" } = inputProps;
    return {
      ...inputProps,
      name: propertyName,
      value: form[propertyName],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        inputProps.onChange?.(e);
        setForm((form) => ({
          ...form,
          [propertyName]:
            type === "text"
              ? e.target.value
              : type === "tel"
                ? e.target.valueAsNumber
                : new Error(),
        }));
      },
    };
  };

  //Patron Clasico
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    property: string
  ) => {
    setForm((form) => ({ ...form, [property]: e.target.value }));
  };

  return (
    <div
      className="flex h-screen w-screen flex-col
    bg-gray-800 "
    >
      <div className="m-auto w-full justify-center rounded-lg border border-solid border-black bg-gray-700 p-6 sm:max-w-[400px] ">
        <Form method="POST" className="mx-0 flex  flex-col">
          <input
            className="my-2 rounded-lg px-3 py-3"
            {...register("name")}
            placeholder="Nombre"
            type="text"
          />
          {dataFromAction && (
            <div className="text-red-500">{errorsZod.name}</div>
          )}
          <input
            className="my-2 rounded-lg px-3 py-3"
            {...register("surname")}
            placeholder="Apellidos"
            type="text"
          />
          {errorsZod && <div className="text-red-500">{errorsZod.surname}</div>}
          <input
            className="my-2 rounded-lg px-3 py-3"
            placeholder="Teléfono"
            {...register("phone")}
            type="text"
          />
          {errorsZod && <div className="text-red-500">{errorsZod.phone}</div>}
          <select
            className="my-2 rounded-lg px-3 py-3"
            name="genere"
            onChange={(e) => setForm({ ...form, genere: e.target.value })}
          >
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="NS/NC">Prefiero no decirlo</option>
          </select>
          {errorsZod && <div className="text-red-500">{errorsZod.genere}</div>}
          <input
            className="my-2 rounded-lg px-3 py-3"
            {...register("email")}
            placeholder="Email"
            type="email"
          />
          {errorsZod && <div className="text-red-500">{errorsZod.email}</div>}
          {errorEmail && <div className="text-red-500">{errorEmail}</div>}
          <div className="relative w-full">
            <input
              className="my-2 w-full rounded-lg px-3 py-3"
              type={watchPass ? "text" : "password"}
              {
                ...register("password")
                /*eg. a fetch before this, and another button which change a formState would not take this last change bc of async fetch*/
              } /* We pass a function with last value associated to reactState, always within  async func or consecutive setForm */
              placeholder="Password"
            />
            <EyeIcon
              onClick={() => setWatchPass(false)}
              width={25}
              height={25}
              className={
                watchPass
                  ? "absolute right-4 top-5 block text-gray-300"
                  : "hidden"
              }
            />
            <EyeSlashIcon
              onClick={() => setWatchPass(true)}
              width={25}
              height={25}
              className={
                watchPass
                  ? "hidden"
                  : "absolute right-4 top-5 block text-gray-300"
              }
            />
          </div>
          {errorsZod && (
            <div className="text-red-500">{errorsZod.password}</div>
          )}
          <div className="relative w-full">
            <input
              className="my-2 w-full rounded-lg px-3 py-3"
              type={watchPass ? "text" : "password"}
              onChange={(e) => handleChange(e, "confirm")}
              placeholder="Confirmar Password"
              name="confirm"
            />
            <EyeIcon
              onClick={() => setWatchPass(false)}
              width={25}
              height={25}
              className={
                watchPass
                  ? "absolute right-4 top-5 block text-gray-300"
                  : "hidden"
              }
            />
            <EyeSlashIcon
              onClick={() => setWatchPass(true)}
              width={25}
              height={25}
              className={
                watchPass
                  ? "hidden"
                  : "absolute right-4 top-5 block text-gray-300"
              }
            />
          </div>
          {errorsZod && <div className="text-red-500">{errorsZod.confirm}</div>}

          <button
            type="submit"
            className="group relative mt-6 inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-gray-800 px-6 font-medium text-neutral-50"
          >
            <span className="absolute h-0 w-0 rounded-md bg-gray-700 transition-all duration-300 group-hover:h-56 group-hover:w-full"></span>
            <span className="relative">Registrarme</span>
          </button>
        </Form>
      </div>
    </div>
  );
}

export { Register };
// bg-neutral-950 //black
