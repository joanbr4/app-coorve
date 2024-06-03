import { Link, NavLink } from "react-router-dom";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Dialog,
  // Disclosure,
  // Popover,
  // PopoverGroup,
  Transition,
  // PopoverPanel,
  // PopoverButton,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  // ChevronDownIcon,
  PlayCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  //  Fragment,
  useState,
} from "react";

type TitemMenu = {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
};

const menuItems: TitemMenu[] = [
  // {
  //   name: "Market Place",
  //   href: "/marketplace",
  //   icon: PlayCircleIcon,
  // },
  {
    name: "Planes",
    href: "#pricing",
    icon: PlayCircleIcon,
  },
  {
    name: "Sobre Nosotros",
    href: "/aboutUs",
    icon: PlayCircleIcon,
  },
];
function Login() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const open = () => {
    setMobileMenuOpen(true);
    console.log("func", mobileMenuOpen);
  };
  console.log("global", mobileMenuOpen);

  return (
    <nav className="flex h-2 items-center  bg-gray-800 py-6 text-white">
      <div className="mx-auto mt-6 flex w-[800px] justify-between px-2">
        <div className="my-auto px-5 sm:items-center sm:pt-2">
          <Link to="/">
            <img
              src="src/assets/logo-de-coorve-transparante-1024x269.webp"
              alt="Logo"
              width="150"
            />
          </Link>
        </div>
        <div className="ml-auto hidden items-center sm:flex">
          <ul className=" -ml-14 flex ">
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
        <button className="text-whie my-2 mr-2 hidden rounded-lg border border-white  p-2 hover:border-2 sm:block">
          <Link to="/signup">Login</Link>
        </button>
        <div className="ml-auto mr-2 flex sm:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5"
            onClick={open}
          >
            <span className="sr-only">Open main menus</span>
            <Bars3Icon className="h-9 w-9" aria-hidden="true" />
          </button>
        </div>

        <Transition appear show={mobileMenuOpen}>
          <Dialog
            as="div"
            className="block sm:hidden"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          >
            <div className="fixed inset-0 z-10" />
            <TransitionChild
              // as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <DialogPanel>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {mobileMenuOpen && "hola"}

                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <div className="mt-6 flow-root">
                    {menuItems.map((item: TitemMenu) => (
                      <NavLink
                        to={item.href}
                        className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-800/75"
                        key={item.name}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                    <NavLink to="/login">Log In</NavLink>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </Dialog>
        </Transition>
      </div>
    </nav>
  );
}
function Logout() {
  return (
    <nav>
      <div className="my-auto bg-blue-500 px-5 sm:items-center sm:pt-2">
        <Link to="/">
          <img
            src="src/assets/logo-de-coorve-transparante-1024x269.webp"
            alt="Logo"
            width="150"
          />
        </Link>
        <button className="ml-auto flex text-white">
          <NavLink to="/content">Salir</NavLink>
        </button>
      </div>
    </nav>
  );
}
export { Login, Logout };
