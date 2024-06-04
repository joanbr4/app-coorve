import { TUser } from "@/types/types";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Perfil() {
  const [edit, setEdit] = useState<boolean>(false);
  const user = useOutletContext<TUser>();
  return (
    // <div className="-pt-[30px] m-auto flex justify-between bg-gray-100">
    //   <div className="grid max-w-[1000px] grid-cols-1  border md:grid-cols-2">
    //     <img alt="foto_perfil" />
    //     <div className="flex w-full max-w-[400px] flex-col">
    //       <div className="mr-auto">Sobre mi</div>
    //       <textarea className="px-2" placeholder="Un poco sobre mí" />
    //     </div>
    //     <div className="my-2 flex w-full max-w-[400px] flex-col">
    //       <label className="mr-auto">Nombre</label>
    //       <input className="rounded-md border px-2" value={user?.name} />
    //     </div>
    //     <div className="my-2 flex w-full max-w-[400px] flex-col">
    //       <label className="mr-auto">Apellidos</label>
    //       <input className="rounded-md border px-2" value={user?.apellidos} />
    //     </div>
    //     <div className="my-2 flex w-full max-w-[400px] flex-col">
    //       <label className="mr-auto">Email</label>
    //       <input className="rounded-md border px-2" value={user?.email} />
    //     </div>
    //     <div className="my-2 flex w-full max-w-[400px] flex-col">
    //       <label className="mr-auto">Password</label>
    //       <input className="rounded-md border px-2" value="******" />
    //     </div>
    //     <div className="my-2 flex w-full max-w-[400px] flex-col">
    //       <label className="mr-auto">Telefono</label>
    //       <input
    //         className="rounded-md border px-2"
    //         value={user?.telephone ? user.telephone : "vacío"}
    //       />
    //     </div>
    //     <div className="my-2 flex w-full max-w-[400px] flex-col">
    //       <label className="mr-auto">Residencia</label>
    //       <input
    //         type="string"
    //         className="rounded-md border px-2"
    //         value={user?.residency == "" ? user.residency : "vacío"}
    //       />
    //     </div>
    //     <div className="my-2 flex w-full max-w-[400px] flex-col">
    //       <label className="mr-auto">Género</label>
    //       <input className="rounded-md border px-2" value={user?.genere} />
    //     </div>
    //     <div>
    //       {!edit ? (
    //         <button className="my-2 border p-2" onClick={() => setEdit(true)}>
    //           Editar
    //         </button>
    //       ) : (
    //         <button className="my-2 border p-2" onClick={() => setEdit(false)}>
    //           Guardar
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <>Hola</>
  );
}
export { Perfil };
