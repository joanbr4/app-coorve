import { resetSchema } from "@/schemas/resetSchema";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
type emailReset = {
  email: string;
  password: string;
  confirm: string;
};
const initialState = {
  email: "",
  password: "",
  confirm: "",
};
type InitialStateKeys = keyof typeof initialState;

function UpdatePass() {
  const [sendEmail, setSendEmail] = useState<boolean>(false);
  const [form, setForm] = useState<emailReset>(initialState);
  const [errorEmail, setErrorEmail] = useState<emailReset>(initialState);
  const [watchPass, setWatchPass] = useState<boolean>(false);
  const link = useParams();

  //Props Getter
  const register = (propertyName: InitialStateKeys) => {
    return {
      name: propertyName,
      type:
        propertyName === "email" ? "email" : watchPass ? "text" : "password",
      value: form[propertyName],
      placeholder:
        propertyName == "confirm" ? "confirm password" : propertyName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [propertyName]: e.target.value });
      },
    };
  };

  const sendReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateZod = resetSchema.safeParse({
      email: form.email,
    });
    if (validateZod.success == false) {
      console.log(validateZod);
      const errorZod = validateZod.error.issues.reduce((acc, item) => {
        return { ...acc, [item.path[0]]: item.message };
      }, {}) as emailReset;
      console.log(errorZod);
      setErrorEmail(errorZod);
    } else {
      const payload = {
        link: link.linkId,
        password: form.password,
      };
      console.log("w323", payload);
      fetch("/resetPass/" + form.email, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      setSendEmail(true);
    }
  };
  return (
    <div className="flex h-screen  w-screen bg-gray-800">
      <div className="m-auto max-w-[400px] rounded-lg border bg-white">
        <div className="m-8 flex flex-col align-baseline">
          <h2 className="my-2 text-xl font-bold">Resetear la contraseña</h2>
          {!sendEmail && (
            <p className="mb-2 text-sm">
              Para resetear su contraseña, por favor rellene los siguientes
              campos, asegurandote que rellenas cada campo manualmente
            </p>
          )}
          <div className={sendEmail ? "hidden" : "block"}>
            <form
              className="my-2 flex flex-col "
              onSubmit={sendReset}
              action="/resetPass"
            >
              <input
                className="my-2 w-full rounded-lg border p-2"
                {...register("email")}
              />
              <div className="relative">
                <input
                  className="my-2 w-full rounded-lg border p-2"
                  {...register("password")}
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
              <div className="relative">
                <input
                  className="my-2 w-full rounded-lg border p-2"
                  {...register("confirm")}
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

              {errorEmail && (
                <span className="text-red-500">{errorEmail.email}</span>
              )}
              <div className="mx-auto my-2">
                <button className="m-2 rounded-md border p-3 text-sm text-gray-800">
                  <NavLink to="/signup">Volver a Login</NavLink>
                </button>
                <button
                  className="rounded-md border bg-gray-800 p-3 text-sm text-white"
                  type="submit"
                >
                  Resetear Constraseña
                </button>
              </div>
            </form>
          </div>

          <div className={sendEmail ? "mt-4 block" : "hidden"}>
            <label htmlFor="" className="text-lg">
              Email
            </label>
            <div className="flex rounded-md bg-green-200 p-2 text-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM12.03 4.97C11.9586 4.89882 11.8735 4.84277 11.7799 4.80522C11.6863 4.76766 11.5861 4.74936 11.4853 4.75141C11.3845 4.75347 11.2851 4.77583 11.1932 4.81717C11.1012 4.85851 11.0185 4.91797 10.95 4.992L7.477 9.417L5.384 7.323C5.24183 7.19052 5.05378 7.1184 4.85948 7.12183C4.66518 7.12525 4.47979 7.20397 4.34238 7.34138C4.20497 7.47879 4.12625 7.66418 4.12283 7.85848C4.1194 8.05278 4.19152 8.24083 4.324 8.383L6.97 11.03C7.04128 11.1012 7.12616 11.1572 7.21958 11.1949C7.313 11.2325 7.41305 11.2509 7.51375 11.2491C7.61444 11.2472 7.71374 11.2251 7.8057 11.184C7.89766 11.1429 7.9804 11.0837 8.049 11.01L12.041 6.02C12.1771 5.8785 12.2523 5.68928 12.2504 5.49296C12.2485 5.29664 12.1698 5.10888 12.031 4.97H12.03Z"
                  fill="#04AA6D"
                ></path>
              </svg>
              <p className="ml-2">
                Hemos resetado su contraseña correctamente, por favor, vuelva al
                login.
              </p>
            </div>
            <button className="my-2 w-full rounded-md border bg-gray-800 p-2 text-sm text-white">
              <NavLink to="/signup">Volver a Login</NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export { UpdatePass };
