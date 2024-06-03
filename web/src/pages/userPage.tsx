import { Logout } from "@/components/header";
import { useAuth } from "@/context/AuthProvider";
import { NavLink, Outlet } from "react-router-dom";

function UserPage() {
  const { user } = useAuth();

  return (
    <div className="h-screen bg-gray-800">
      <Logout />
      <div className="flex h-screen">
        <aside className="bg-blue-100 ">
          <ul>
            <li className="">
              <NavLink
                to="dashboard"
                className="block px-8 py-8 hover:bg-gray-600 hover:text-white"
              >
                Dashboard
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="perfil"
                className="block px-8 py-8 hover:bg-gray-600 hover:text-white"
              >
                Perfil
              </NavLink>
            </li>
            <li className=" ">
              <NavLink
                to="settings"
                className="block px-8 py-8 hover:bg-gray-600 hover:text-white"
              >
                Configuración
              </NavLink>
            </li>
            <li className="  ">
              <NavLink
                to="facturas"
                className="block px-8 py-8 hover:bg-gray-600 hover:text-white"
              >
                Facturación
              </NavLink>
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
