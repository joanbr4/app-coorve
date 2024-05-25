import { useState } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { UserRegister, userRegisterSchemas } from "@/schemas";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const dataObject = Object.fromEntries(formData);
  const validateFormZod = userRegisterSchemas.safeParse({
    name: dataObject.name,
    surname: dataObject.surname,
    phone: dataObject.phone,
    genere: dataObject.genere,
    email: dataObject.email,
    password: dataObject.password,
    confirm: dataObject.confirm,
  });

  // console.log(validateFormZod);
  if (validateFormZod.data) return redirect("/home");
  const errorsFormated = validateFormZod.error?.issues.reduce((acc, item) => {
    return { ...acc, [item.path[0] as string]: item.message };
  }, {});
  // console.log(validateFormZod, errorsFormated);
  return errorsFormated;
};

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

function Register() {
  const [form, setForm] = useState<typeof initialState>(initialState);
  const [watchPass, setWatchPass] = useState<boolean>(false);

  const errorLoader = useActionData() as UserRegister;
  console.log(errorLoader);

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

  // const handlingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const dataForm = new FormData(e.currentTarget);
  //   const dataValidatedZod = userRegisterSchemas.safeParse(dataForm);
  //   console.log("12", dataValidatedZod);
  //   if (!dataValidatedZod) {
  //     setErrorsZod(dataValidatedZod);
  //   }
  //   // const user = await fetch("/login");
  //   // if (!user) throw new Error("Error en el registro");
  //   // redirect("/home");
  //   // console.table(form);
  // };

  return (
    <div
      className="flex h-screen w-screen flex-col
    bg-neutral-100 "
    >
      <div className="m-auto justify-center rounded-lg border border-solid border-black p-6 ">
        <Form method="POST" className="flex flex-col">
          <input
            className="my-2 rounded-lg px-3 py-3"
            {...register("name")}
            placeholder="Nombre"
            type="text"
          />
          {errorLoader && (
            <div className="text-red-500">{errorLoader.name}</div>
          )}
          <input
            className="my-2 rounded-lg px-3 py-3"
            {...register("surname")}
            placeholder="Apellidos"
            type="text"
          />
          {errorLoader && (
            <div className="text-red-500">{errorLoader.surname}</div>
          )}

          <input
            className="my-2 rounded-lg px-3 py-3"
            placeholder="Telephone"
            {...register("phone")}
            type="text"
            // {...register("phone", { type: "text" })}
          />
          {errorLoader && (
            <div className="text-red-500">{errorLoader.phone}</div>
          )}
          <input
            className="my-2 rounded-lg px-3 py-3"
            placeholder="Genere"
            {...register("genere")}
            type="text"
            // {...register("phone", { type: "text" })}
          />
          {errorLoader && (
            <div className="text-red-500">{errorLoader.genere}</div>
          )}

          <input
            className="my-2 rounded-lg px-3 py-3"
            {...register("email")}
            placeholder="Email"
            type="email"
          />
          {errorLoader && (
            <div className="text-red-500">{errorLoader.email}</div>
          )}

          <div>
            <input
              className="my-2 rounded-lg px-3 py-3"
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
            <button onClick={() => setWatchPass(!watchPass)}>ver </button>
          </div>

          {errorLoader && (
            <div className="text-red-500">{errorLoader.password}</div>
          )}
          <div>
            <input
              className="my-2 rounded-lg px-3 py-3"
              type={watchPass ? "text" : "password"}
              onChange={(e) => handleChange(e, "confirm")}
              placeholder="Confirm Password"
              name="confirm"
            />
            <button onClick={() => setWatchPass(!watchPass)}>ver </button>
          </div>

          {errorLoader && (
            <div className="text-red-500">{errorLoader.confirm}</div>
          )}

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

export default Register;
