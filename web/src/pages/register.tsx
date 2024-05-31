import { useEffect, useState } from "react";
import { redirect, Form, useActionData } from "react-router-dom";
import { UserRegister, registerSchema } from "../schemas/registerSchema";
import { ErrorfromServer } from "@/types/types";
import { isErrorFromServer, isUserRegister } from "@/utils/guardFunction";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

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
  const dataValidatedZod = registerSchema.safeParse({
    name: dataObject.name,
    surname: dataObject.surname,
    phone: dataObject.phone,
    genere: dataObject.genere,
    email: dataObject.email,
    password: dataObject.password,
    confirm: dataObject.confirm,
  });
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
    bg-gray-500 "
    >
      <div className="m-auto justify-center rounded-lg border border-solid border-black bg-blue-500 p-6 ">
        <Form method="POST" className="flex flex-col">
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
            // {...register("phone", { type: "text" })}
          />
          {errorsZod && <div className="text-red-500">{errorsZod.phone}</div>}
          <input
            className="my-2 rounded-lg px-3 py-3"
            placeholder="Género"
            {...register("genere")}
            type="text"
            // {...register("phone", { type: "text" })}
          />
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
                // onChange=((e) => {
                //   setForm((form) => ({ ...form, password: e.target.value }));
                // })
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
            className="mx-auto w-1/2 rounded-xl border bg-blue-100 p-2 text-black/50
          "
          >
            Send
          </button>
        </Form>
      </div>
    </div>
  );
}

export { Register };
