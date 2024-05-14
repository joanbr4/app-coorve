import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="flex h-2 flex-row items-center border  border-black bg-gray-500 py-6 text-white">
      <div className="hidden sm:flex">
        <div className="mr-auto ">{/* <img src="" alt="Photo" /> */}</div>
        <ul className="mx-auto -ml-14 flex ">
          <li className="px-2 py-2">
            <a href="#">Market Place</a>
          </li>
          <li className="px-2 py-2">
            <a href="#">Sobre Nosotros</a>
          </li>
          <li className="px-2 py-2">
            <a href="#">Agendar llamada</a>
          </li>
          <li className="px-2 py-2">
            <a href="#">Noticias</a>
          </li>
        </ul>
        <button className="text-whie rounded-lg border border-black bg-slate-100/50 p-1">
          <Link to="register">Register</Link>
        </button>
        <button className="text-whie rounded-lg border border-black bg-slate-100/50 p-1">
          <Link to="login">Login</Link>
        </button>
      </div>
    </nav>
  );
}

export default Header;
