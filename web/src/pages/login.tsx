import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useAuth } from "@/context/AuthProvider";
import { UserLogin, loginSchema } from "@/schemas/loginSchema";
import { ErrorfromServer } from "@/types/types";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

type InitialStateKeys = keyof typeof initialState;

function Login() {
  const [form, setForm] = useState<typeof initialState>(initialState);
  const [errorZod, setErrorZod] = useState<UserLogin>(initialState);
  const [errorLogin, setErrorLogin] = useState<string>("");
  const [watchPass, setWatchPass] = useState<boolean>(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();
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
  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   property: string
  // ) => {
  //   setForm((form) => ({ ...form, [property]: e.target.value }));
  // };
  const handlingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateZod = loginSchema.safeParse({
      email: form.email,
      password: form.password,
    });

    if (validateZod.success == false) {
      const errorsValidate = validateZod.error.issues.reduce((acc, item) => {
        return { ...acc, [item.path[0]]: item.message };
      }, {}) as UserLogin;
      setErrorZod(errorsValidate);
    } else {
      const payload = {
        email: form.email,
        password: form.password,
      };
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.status !== 200) {
        const errorMessage: ErrorfromServer = await response.json();
        setErrorLogin(errorMessage.message);
      } else {
        const data = await response.json();
        setUser(data);
        navigate("/user");
      }
    }
  };

  //tttt.bordonaba@gmail.com
  //K5ABKjkpu4@

  return (
    <div
      className="flex h-screen w-screen flex-col
    bg-gray-800/80 "
    >
      <div className="m-auto flex max-w-[300px] ">
        <BackgroundGradient className="max-w-sm rounded-[22px] bg-white p-4 dark:bg-zinc-900 sm:p-10 md:p-6">
          <div>
            {/* <div className="m-auto justify-center rounded-lg border border-solid border-white bg-slate-400 p-4 "> */}
            <form className="flex flex-col" onSubmit={handlingSubmit}>
              <input
                className="my-2 rounded-lg border px-3 py-3"
                {...register("email")}
                placeholder="Email"
                type="email"
              />
              {errorZod && <p className="text-red-500">{errorZod.email}</p>}
              <div
                className="relative flex h-12 w-full 
          "
              >
                <input
                  className=" w-full rounded-lg border px-3 py-5"
                  type={watchPass ? "text" : "password"}
                  {...register("password")}
                  placeholder="Contraseña"
                />
                <EyeIcon
                  onClick={() => setWatchPass(false)}
                  width={25}
                  height={25}
                  className={
                    watchPass
                      ? "absolute right-4 top-3 block text-gray-300"
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
                      : "absolute right-4 top-3 block text-gray-300"
                  }
                />
              </div>

              {errorZod && <p className="text-red-500">{errorZod.password}</p>}
              {errorLogin && <p className="text-red-500">{errorLogin}</p>}

              <button
                type="submit"
                className="relative my-4 overflow-hidden rounded-md bg-gray-800 px-5 py-2.5 text-white duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90"
              >
                Entrar
              </button>
              <div className="mt-8 rounded-md  px-2 py-1 text-xs text-gray-800">
                Resetear contraseña?
                <NavLink
                  className="mx-1 px-0 font-bold text-green-400"
                  to="/reset-password"
                >
                  Click
                </NavLink>
              </div>
              <div className=" rounded-md  px-2 py-1 text-xs text-gray-800">
                No tienes cuenta?
                <NavLink
                  className="mx-1 px-0 font-bold text-green-400"
                  to="/signin"
                >
                  Click
                </NavLink>
              </div>
            </form>
          </div>
        </BackgroundGradient>
      </div>
    </div>
  );
}

export default Login;
