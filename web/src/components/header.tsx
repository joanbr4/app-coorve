import { Link, NavLink, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import logo from "/logo-de-coorve-transparante-1024x269.webp";

type TitemMenu = {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
};

const menuItems: TitemMenu[] = [
  {
    name: "Planes",
    href: "#pricing",
    icon: PlayCircleIcon,
  },
  {
    name: "Sobre Nosotros",
    href: "/nosotros",
    icon: PlayCircleIcon,
  },
];
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const open = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed flex w-full items-center  bg-gray-800 py-4 text-white sm:relative">
      <div className="mx-auto  flex w-[800px] justify-between px-2">
        <div className="my-auto w-[200px] px-5 sm:w-[250px] sm:items-center sm:pt-2">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="ml-auto hidden items-center sm:flex">
          <ul className=" -ml-14 flex text-xl">
            {menuItems.map((item: TitemMenu) => (
              <li
                className="hover:text-slay-800/25 px-6 py-2 hover:underline"
                key={item.name}
              >
                {item.name == "Planes" ? (
                  <a href={item.href}>{item.name}</a>
                ) : (
                  <NavLink to={item.href}>{item.name}</NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
        <button className="my-2 mr-2 hidden rounded-lg border border-white p-2 text-xl text-white transition duration-300  ease-in-out hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.7)] hover:shadow-white sm:block">
          {user ? (
            <NavLink to="/user/dashboard">User</NavLink>
          ) : (
            <NavLink to="/signup">Login</NavLink>
          )}
        </button>
        <div className="ml-auto mr-2 flex sm:hidden">
          <button
            className={
              !mobileMenuOpen
                ? "hamburger hamburger--squeeze inline-flex items-center justify-center rounded-md p-2.5 "
                : "hamburger hamburger--squeeze is-active inline-flex items-center justify-center rounded-md p-2.5"
            }
            type="button"
            onClick={open}
          >
            <span className="hamburger-box ">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>

        <Transition appear show={mobileMenuOpen}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          >
            <div className="fixed inset-0 bg-gray-700 bg-opacity-50 sm:hidden" />
            <div className="fixed inset-0 overflow-y-auto sm:hidden">
              <div className="flex justify-center p-4 text-center">
                <Dialog.Panel className="mt-20 w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle text-white shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <img src={logo} alt="Logo" width="150" />
                    <button
                      className={
                        !mobileMenuOpen
                          ? "hamburger hamburger--squeeze inline-flex items-center justify-center rounded-md p-2.5 "
                          : "hamburger hamburger--squeeze is-active inline-flex items-center justify-center rounded-md p-2.5"
                      }
                      type="button"
                      onClick={open}
                    >
                      <span className="hamburger-box ">
                        <span className="hamburger-inner"></span>
                      </span>
                    </button>
                  </div>
                  <div className="mt-10 flow-root text-white">
                    {menuItems.map((item, index) => (
                      <li className="list-none" key={index}>
                        {item.name == "Planes" ? (
                          <a
                            className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-700/75 hover:text-white"
                            href={item.href}
                            onClick={open}
                          >
                            {item.name}
                          </a>
                        ) : (
                          <NavLink
                            to={item.href}
                            className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-700/75 hover:text-white"
                            key={item.name}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </NavLink>
                        )}
                      </li>
                    ))}
                    {user ? (
                      <NavLink
                        to="/user/dashboard"
                        className="mt-10 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-700/75 hover:text-white"
                        onClick={() => navigate("/user/dashboard")}
                      >
                        User
                      </NavLink>
                    ) : (
                      <NavLink
                        to="/signup"
                        className=" mt-10 rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-700/75 hover:text-white"
                        onClick={() => navigate("/signup")}
                      >
                        Log In
                      </NavLink>
                    )}
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </nav>
  );
}

export { Header };
