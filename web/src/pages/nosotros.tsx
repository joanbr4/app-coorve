import Footer from "@/components/footer";
import { facts } from "@/dataFacts";
import { history } from "@/dataHistory";
import { stuffs } from "@/dataStuff";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, A11y } from "swiper/modules";
import SwiperCore from "swiper";
import { Swiper as SwiperType } from "swiper/types";

SwiperCore.use([Navigation, Pagination]);

const stuff = {
  seabroth: false,
  jose: false,
  barrios: false,
};

type InitialStateStuff = keyof typeof stuff;

const Nosotros = () => {
  // const swiper = useSwiper();
  const swiperRef = useRef<SwiperType | null>(null);
  const [showMore, setShowMore] = useState<typeof stuff>(stuff);
  return (
    <div className="h-full bg-gray-800">
      <div className="mx-auto flex  flex-col pt-8">
        <h1 className="mx-auto font-['Open_Sans'] text-6xl font-bold text-white">
          Un poco de nuestro
          <span className="ml-2 underline decoration-[#39ba93] decoration-4 underline-offset-4">
            recorrido
          </span>
        </h1>
        {/* <p className="mx-auto mt-4 font-['Open_Sans'] text-white">
          Un camino lleno de aprendizajes y pasión: nuestra historia en Coorve
        </p> */}
        <div className="mx-auto my-8 flex flex-col text-white">
          <h2 className="my-4 text-3xl">Sobre nosotros</h2>
          <p className="max-w-[700px]">
            Coorve es una empresa que nace en el 2019, fundada por 2 personas
            que les unía un objetivo, revolucionar el mercado inmobiliario,
            mediante el uso de las nuevas tecnologías y una clara comuniación y
            transparencia, gracias a ello, Coorve ha podido tener éxito en un
            mercado tan competitivo como es el inmobiliario. Con los años ha ido
            creciendo tanto en plantilla como en la calidad de servicio, pero
            siempre manteniendo la misma filosofía de origen.
          </p>
        </div>
        <div className="mx-auto my-8">
          <h4 className="my-4 font-['Open_Sans'] text-3xl  text-white">
            Datos básicos
          </h4>
          <div className="grid grid-cols-4 ">
            {facts.map((fact) => (
              <div className="pr-15 m-2 rounded-lg border bg-gray-700 py-8 pl-10 text-white">
                <h1 className="text-6xl font-bold">{fact.number}</h1>
                <div className="mr-4 justify-between font-['Open_Sans']">
                  <p className="my-4">{fact.description}</p>
                  <p className="mt-20 text-white/50">{fact.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto my-10 text-white">
          <h4 className="my-4 font-['Open_Sans'] text-3xl text-white">
            Nuestro equipo
          </h4>
          <div className="flex">
            {stuffs.map((person) => (
              <div className="mr-5 flex max-w-[500px] flex-col  hover:rounded-t-lg">
                <div className=" group flex max-w-[500px] flex-col ">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      alt={person.name}
                      src={person.url}
                      className="transform overflow-visible object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                  <h2 className=" mt-4 text-2xl  group-hover:underline">
                    {person.name}
                  </h2>
                </div>
                <div className="flex justify-between">
                  <p className=" mt-2">{person.title}</p>
                  {!showMore[person.nameState as InitialStateStuff] ? (
                    <button
                      onClick={() =>
                        setShowMore((showMore) => ({
                          ...showMore,
                          [person.nameState]: true,
                        }))
                      }
                    >
                      <svg
                        fill="#fff"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 45.402 45.402"
                      >
                        <g>
                          <path
                            d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
                     c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
                     c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
                     c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
                          />
                        </g>
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setShowMore((showMore) => ({
                          ...showMore,
                          [person.nameState]: false,
                        }))
                      }
                    >
                      <svg
                        width="30px"
                        height="30px"
                        viewBox="0 0 24 24"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 12L18 12"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {showMore[person.nameState as InitialStateStuff] && (
                  <p className="mt-4 pb-4 ">{person.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto my-10 text-white">
          <h4 className="my-4 font-['Open_Sans'] text-3xl">
            La historia de Coorve
          </h4>
          <div className="relative max-w-[1400px]">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded bg-gray-500 p-2 text-white"
            >
              -
            </button>

            <Swiper
              modules={[Navigation, Pagination, A11y]}
              navigation={false}
              // pagination={{ clickable: true }}
              spaceBetween={30}
              slidesPerView={3}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                // 1204: {
                //   slidesPerView: 4,
                //   spaceBetween: 50,
                // },
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {history.map((feat, index) => (
                <SwiperSlide key={index}>
                  <div className="mx-0 flex w-[350px] flex-col rounded-lg border bg-gray-700 p-8 font-['Open_Sans']">
                    <img src={feat.url} alt="" />
                    <p className="font-bold">{feat.date}</p>
                    <p>{feat.feat}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded bg-gray-500 p-2 text-white"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { Nosotros };
