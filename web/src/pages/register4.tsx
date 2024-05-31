// import { useEffect, useState } from "react";
// import { redirect } from "react-router-dom";
// import { UserRegister, registerSchema } from "../schemas/registerSchema";
// import { ErrorfromServer } from "@/types/types";

// const initialState = {
//   name: "",
//   surname: "",
//   phone: "",
//   genere: "",
//   email: "",
//   password: "",
//   confirm: "",
// };
// type InitialStateKeys = keyof typeof initialState;

// function Register() {
//   const [form, setForm] = useState<typeof initialState>(initialState);
//   const [errorsZod, setErrorsZod] = useState<typeof initialState>(initialState);
//   const [watchPass, setWatchPass] = useState<boolean>(false);
//   const [toFetch, setToFetch] = useState<boolean>(false);
//   const [payload, setPayload] = useState<object | null>(null);
//   const [errorEmail, setErrorEmail] = useState<string>("");

//   //Props Getter, patrón de Diseño React
//   const register = (
//     propertyName: InitialStateKeys,
//     inputProps: Omit<React.ComponentProps<"input">, "name" | "value"> = {}
//   ) => {
//     const { type = "text" } = inputProps;
//     return {
//       ...inputProps,
//       name: propertyName,
//       value: form[propertyName],
//       onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
//         inputProps.onChange?.(e);
//         setForm((form) => ({
//           ...form,
//           [propertyName]:
//             type === "text"
//               ? e.target.value
//               : type === "tel"
//                 ? e.target.valueAsNumber
//                 : new Error(),
//         }));
//       },
//     };
//   };

//   //Patron Clasico
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     property: string
//   ) => {
//     setForm((form) => ({ ...form, [property]: e.target.value }));
//   };

//   const handlingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const dataValidatedZod = registerSchema.safeParse({
//       name: form.name,
//       surname: form.surname,
//       phone: form.phone,
//       genere: form.genere,
//       email: form.email,
//       password: form.password,
//       confirm: form.confirm,
//     });
//     if (dataValidatedZod.success == false) {
//       const errorsFormated = dataValidatedZod.error?.issues.reduce(
//         (acc, item) => {
//           return { ...acc, [item.path[0] as string]: item.message };
//         },
//         {}
//       ) as UserRegister;
//       console.log(errorsFormated);
//       setErrorsZod(errorsFormated);
//     } else {
//       const payload = {
//         name: form.name,
//         surname: form.surname,
//         phone: form.phone,
//         genere: form.genere,
//         email: form.email,
//         password: form.password,
//         created_at: new Date(),
//       };
//       setPayload(payload);
//       setToFetch(true);
//     }
//   };
//   useEffect(() => {
//     fetch("/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     }).then(async (response) => {
//       if (response.status !== 200) {
//         const text: ErrorfromServer = await response.json();
//         console.log(text);
//         setErrorEmail(text.message);
//       } else {
//         console.log("dad");
//         setPayload(null);
//         setToFetch(false);
//         redirect("/signup");
//       }
//     });
//   }, [toFetch, payload]);

//   return (
//     <div
//       className="flex h-screen w-screen flex-col
//     bg-neutral-100 "
//     >
//       <div className="m-auto justify-center rounded-lg border border-solid border-black p-6 ">
//         <form method="POST" className="flex flex-col" onSubmit={handlingSubmit}>
//           <input
//             className="my-2 rounded-lg px-3 py-3"
//             {...register("name")}
//             placeholder="Nombre"
//             type="text"
//           />
//           {errorsZod && <div className="text-red-500">{errorsZod.name}</div>}
//           <input
//             className="my-2 rounded-lg px-3 py-3"
//             {...register("surname")}
//             placeholder="Apellidos"
//             type="text"
//           />
//           {errorsZod && <div className="text-red-500">{errorsZod.surname}</div>}

//           <input
//             className="my-2 rounded-lg px-3 py-3"
//             placeholder="Telephone"
//             {...register("phone")}
//             type="text"
//             // {...register("phone", { type: "text" })}
//           />
//           {errorsZod && <div className="text-red-500">{errorsZod.phone}</div>}
//           <input
//             className="my-2 rounded-lg px-3 py-3"
//             placeholder="Genere"
//             {...register("genere")}
//             type="text"
//             // {...register("phone", { type: "text" })}
//           />
//           {errorsZod && <div className="text-red-500">{errorsZod.genere}</div>}

//           <input
//             className="my-2 rounded-lg px-3 py-3"
//             {...register("email")}
//             placeholder="Email"
//             type="email"
//           />
//           {errorsZod && <div className="text-red-500">{errorsZod.email}</div>}
//           {errorEmail && <div className="text-red-500">{errorEmail}</div>}

//           <div>
//             <input
//               className="my-2 rounded-lg px-3 py-3"
//               type={watchPass ? "text" : "password"}
//               {
//                 ...register("password")
//                 // onChange=((e) => {
//                 //   setForm((form) => ({ ...form, password: e.target.value }));
//                 // })
//                 /*eg. a fetch before this, and another button which change a formState would not take this last change bc of async fetch*/
//               } /* We pass a function with last value associated to reactState, always within  async func or consecutive setForm */
//               placeholder="Password"
//             />
//             <button onClick={() => setWatchPass(!watchPass)}>ver </button>
//           </div>

//           {errorsZod && (
//             <div className="text-red-500">{errorsZod.password}</div>
//           )}
//           <div>
//             <input
//               className="my-2 rounded-lg px-3 py-3"
//               type={watchPass ? "text" : "password"}
//               onChange={(e) => handleChange(e, "confirm")}
//               placeholder="Confirm Password"
//               name="confirm"
//             />
//             <button onClick={() => setWatchPass(!watchPass)}>ver </button>
//           </div>

//           {errorsZod && <div className="text-red-500">{errorsZod.confirm}</div>}

//           <button
//             type="submit"
//             className="mx-auto w-1/2 rounded-xl border bg-blue-100 p-2 text-black/50
//           "
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;
