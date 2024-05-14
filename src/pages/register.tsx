import { useState } from "react";
// type Form = {
//   email: string;
//   password: string;
//   confirm: string;
//   age: number;
// };

const initialState = {
  email: "",
  password: "",
  confirm: "",
  age: 0,
};
type InitialStateKeys = keyof typeof initialState;

function Register() {
  const [form, setForm] = useState<typeof initialState>(initialState);
  console.log(form);

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
              : type === "number"
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
  const handlingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.table(form);
  };

  return (
    <div
      className="flex h-screen w-screen flex-col
    bg-neutral-100 "
    >
      <div className="m-auto justify-center rounded-lg border border-solid border-black p-6 ">
        <form className="flex flex-col">
          <input
            className="my-2 rounded-lg px-3 py-3"
            {...register("email")}
            placeholder="Email"
            type="email"
          />
          <input
            className="my-2 rounded-lg px-3 py-3"
            // type="number", lo pasamos como atributo
            placeholder="Age"
            {...register("age", { type: "number" })}
          />
          <input
            className="my-2 rounded-lg px-3 py-3"
            type="password"
            {
              ...register("password")
              // onChange=((e) => {
              //   setForm((form) => ({ ...form, password: e.target.value }));
              // })
              /*eg. a fetch before this, and another button which change a formState would not take this last change bc of async fetch*/
            } /* We pass a function with last value associated to reactState, always within  async func or consecutive setForm */
            placeholder="Password"
          />
          <input
            className="my-2 rounded-lg px-3 py-3"
            type="password"
            onChange={(e) => handleChange(e, "confirm")}
            placeholder="Confirm Password"
          />
          <button
            className="mx-auto w-1/2 rounded-xl border bg-blue-100 p-2 text-black/50
          "
            onClick={handlingSubmit}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
