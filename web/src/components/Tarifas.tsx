import { tarifas } from "@/data/dataTarifa";
import { Ttarifa } from "@/types/types";
// import { useNavigate } from "react-router-dom";

function TarifasCard() {
  // const navigate = useNavigate();
  // const createStripe = async (price: number) => {
  //   const result = await fetch("/create-session", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ price }),
  //   });
  //   const { url } = await result.json();
  //   console.log(url);
  //   window.location.href = url;
  //   // navigate(session.url);
  // };

  return (
    <>
      {tarifas.map((tarifa: Ttarifa) => (
        <div
          className="min-y-[30px] flex w-[300px] flex-col p-4 lg:mx-4"
          key={tarifa.titulo}
        >
          <div className="my-6">
            <h3 className="text-center text-4xl">{tarifa.titulo}</h3>
            <p className="text-center">{tarifa.detalles}</p>
          </div>
          <div className="my-3 flex justify-center text-center text-5xl">
            ${tarifa.precio}{" "}
            <span className="mt-auto text-xl">/{tarifa.time}</span>
          </div>
          <ul className=" mx-auto my-6 text-left">
            {tarifa.features.map((feat, index) => (
              <li className="my-2 flex max-w-60" key={index}>
                <div className="my-auto">
                  <svg
                    width="21px"
                    height="17px"
                    viewBox="0 0 21 17"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        id="ui-icons"
                        transform="translate(-109.000000, -67.000000)"
                        fill="#22BC66"
                      >
                        <polygon
                          id="check"
                          points="108.994099 76.4000626 115.987848 83.419577 129.407253 69.9978283 126.587674 67.1592372 115.987848 77.7490936 111.827057 73.5894775"
                        ></polygon>
                      </g>
                    </g>
                  </svg>
                </div>
                <div className=" ml-2">{feat}</div>
              </li>
            ))}
          </ul>
          <button
            className={
              tarifa.precio === 20
                ? "mx-auto  flex w-full items-center justify-center rounded-md border bg-white p-1 text-lg font-bold text-gray-800"
                : "mx-auto w-full rounded-md border  bg-gray-800 p-1 text-lg font-bold text-white hover:bg-gray-700"
            }
          >
            <button onClick={() => window.open(tarifa.url)}>
              <p className="mr-2">{tarifa.action}</p>
              {tarifa.precio === 0 ? (
                <svg
                  width="1em"
                  viewBox="0 0 15 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.6 7H1a1 1 0 1 1 0-2h8.6L7 2.4A1 1 0 0 1 8.4 1l4.3 4.2c.2.3.3.5.3.8 0 .3-.1.5-.3.7L8.4 11A1 1 0 1 1 7 9.5L9.6 7z"
                    fill="currentColor"
                  ></path>
                </svg>
              ) : null}
            </button>
          </button>
        </div>
      ))}
    </>
  );
}
export { TarifasCard };
