import { TUser } from "@/types/types";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Perfil() {
  const [edit, setEdit] = useState<boolean>(false);
  const user = useOutletContext<TUser>();
  return (
    <div className="-pt-[30px]  flex h-full w-full justify-center bg-blue-900">
      <div className="mx-10 my-10 grid w-full max-w-[1000px] grid-cols-1 items-center justify-between rounded-lg border bg-blue-400 p-2 lg:grid-cols-2">
        {/* <img alt="foto_perfil" className="mx-auto mt-8" />
        <div className="mx-auto mt-8 flex w-full max-w-[400px] flex-col">
          <div className="mr-auto py-2  font-bold text-blue-900">Sobre mi</div>
          <textarea className="h-[100px] p-2" placeholder="Un poco sobre mí" />
        </div> */}
        <div className="mx-auto my-4 flex w-full max-w-[400px] flex-col">
          <label className="mr-auto py-2  font-bold text-blue-900">
            Nombre
          </label>
          {edit ? (
            <input
              className="rounded-md border px-2 py-1"
              defaultValue={user?.name}
            />
          ) : (
            <div className="rounded-md border bg-white px-2 py-1">
              {user?.name}
            </div>
          )}
        </div>
        <div className="mx-auto my-4 flex w-full max-w-[400px] flex-col">
          <label className="mr-auto py-2  font-bold text-blue-900">
            Apellidos
          </label>
          {edit ? (
            <input
              className="rounded-md border px-2 py-1"
              defaultValue={user?.apellidos}
            />
          ) : (
            <div className="rounded-md border bg-white px-2 py-1">
              {user?.apellidos}
            </div>
          )}
        </div>
        <div className="mx-auto my-4 flex w-full max-w-[400px] flex-col">
          <label className="mr-auto py-2  font-bold text-blue-900">Email</label>
          {edit ? (
            <input
              className="rounded-md border px-2 py-1"
              defaultValue={user?.email}
              readOnly
            />
          ) : (
            <div className="rounded-md border bg-white px-2 py-1">
              {user?.email}
            </div>
          )}
        </div>
        <div className="mx-auto my-4 flex w-full max-w-[400px] flex-col">
          <label className="mr-auto py-2  font-bold text-blue-900">
            Password
          </label>
          {edit ? (
            <input className="rounded-md border px-2" />
          ) : (
            <div className="rounded-md border bg-white px-2 py-1">*****</div>
          )}
        </div>
        <div className="mx-auto my-4 flex w-full max-w-[400px] flex-col">
          <label className="mr-auto py-2  font-bold text-blue-900">
            Telefono
          </label>
          {edit ? (
            <input
              className="rounded-md border px-2 py-1"
              defaultValue={user?.telephone}
            />
          ) : (
            <div className="rounded-md border bg-white px-2 py-1">
              {user?.telephone ? user?.telephone : "."}
            </div>
          )}
        </div>
        <div className="mx-auto my-2 flex w-full max-w-[400px] flex-col">
          <label className="mr-auto py-2  font-bold text-blue-900">
            Residencia
          </label>
          {edit ? (
            <input
              className="rounded-md border px-2 py-1"
              defaultValue={user?.residency}
            />
          ) : (
            <div className=" rounded-md border bg-white px-2 py-1">
              {user?.residency ? user?.residency : "."}
            </div>
          )}
        </div>
        <div className="mx-auto my-2 flex w-full max-w-[400px] flex-col">
          <label className="mr-auto py-2  font-bold text-blue-900">
            Género
          </label>
          {edit ? (
            <input
              className="rounded-md border px-2 py-1"
              defaultValue={user?.name}
            />
          ) : (
            <div className="rounded-md border bg-white px-2 py-1">
              {user?.genere}
            </div>
          )}
        </div>
        <div>
          {!edit ? (
            <button
              className="my-2 flex rounded-md border bg-gray-800 p-6 text-white"
              onClick={() => setEdit(true)}
            >
              <PencilSquareIcon width={30} height={30} fill="ffff" />
              <span className="mx-2 text-lg">Editar</span>
            </button>
          ) : (
            <button
              className="my-2 flex rounded-md border bg-gray-800 p-6 text-white"
              onClick={() => setEdit(false)}
            >
              <svg width="30px" height="30px" viewBox="0 0 32 32" version="1.1">
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="ffff"
                  fill-rule="evenodd"
                >
                  <g
                    id="Icon-Set"
                    transform="translate(-152.000000, -515.000000)"
                    fill="#ffff"
                  >
                    <path
                      d="M171,525 C171.552,525 172,524.553 172,524 L172,520 C172,519.447 171.552,519 171,519 C170.448,519 170,519.447 170,520 L170,524 C170,524.553 170.448,525 171,525 L171,525 Z M182,543 C182,544.104 181.104,545 180,545 L156,545 C154.896,545 154,544.104 154,543 L154,519 C154,517.896 154.896,517 156,517 L158,517 L158,527 C158,528.104 158.896,529 160,529 L176,529 C177.104,529 178,528.104 178,527 L178,517 L180,517 C181.104,517 182,517.896 182,519 L182,543 L182,543 Z M160,517 L176,517 L176,526 C176,526.553 175.552,527 175,527 L161,527 C160.448,527 160,526.553 160,526 L160,517 L160,517 Z M180,515 L156,515 C153.791,515 152,516.791 152,519 L152,543 C152,545.209 153.791,547 156,547 L180,547 C182.209,547 184,545.209 184,543 L184,519 C184,516.791 182.209,515 180,515 L180,515 Z"
                      id="save-floppy"
                    ></path>
                  </g>
                </g>
              </svg>
              <span className="mx-2 text-lg">Guardar</span>
            </button>
          )}
        </div>
      </div>
    </div>
    // <>Hola</>
  );
}
export { Perfil };
