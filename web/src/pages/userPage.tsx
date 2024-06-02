import { Logout } from "@/components/header";
import { useAuth } from "@/context/AuthProvider";
import { Outlet } from "react-router-dom";

function UserPage() {
  const { user } = useAuth();

  return (
    <div className="h-screen bg-gray-800">
      <Logout />
      <div className="flex h-screen">
        <aside className="bg-blue-100 ">
          <ul>
            <li className=" px-8 py-4 hover:bg-gray-600 hover:text-white">
              Dashboard
            </li>
            <li className=" px-8 py-4 hover:bg-gray-600 hover:text-white">
              Perfil
            </li>
            <li className=" px-8 py-4 hover:bg-gray-600 hover:text-white">
              Configuración
            </li>
            <li className=" px-8 py-4 hover:bg-gray-600 hover:text-white">
              Facturación
            </li>
          </ul>
        </aside>
        <center className="w-full">
          <Outlet />
        </center>
      </div>
    </div>
  );
}

export { UserPage };
