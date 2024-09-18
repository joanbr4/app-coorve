import Footer from "@/components/footer";
import { facts } from "@/data/dataFacts";
import { history } from "@/data/dataHistory";
import { stuffs } from "@/data/dataStuff";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, A11y } from "swiper/modules";
import SwiperCore from "swiper";
import { Swiper as SwiperType } from "swiper/types";
import { useNavigate } from "react-router-dom";
import logo from "/logo-de-coorve-transparante-1024x269.webp";

SwiperCore.use([Navigation, Pagination]);

const stuff = {
  seabroth: false,
  jose: false,
  barrios: false,
  joan: false,
};

type InitialStateStuff = keyof typeof stuff;

const Nosotros = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [showMore, setShowMore] = useState<typeof stuff>(stuff);
  const navigate = useNavigate();
  return (
    <div className="h-full bg-gray-800 font-['Open_Sans']">
      <div className=" mx-auto flex  flex-col pt-8">
        <div className="flex md:relative">
          <div
            className="align-center absolute ml-[50px] w-[250px] cursor-pointer sm:ml-[100px]"
            onClick={() => navigate(-1)}
          >
            <img src={logo} alt="logo" />
          </div>
          <h1 className="mt-[70px] text-center font-['Open_Sans'] text-6xl font-bold text-white sm:mx-auto 2xl:mt-0">
            Un poco de nuestro
            <span className="ml-2 block underline decoration-[#39ba93] decoration-4 underline-offset-4 md:inline">
              recorrido
            </span>
          </h1>
        </div>
        {/* <p className="mx-auto mt-4 font-['Open_Sans'] text-white">
          Un camino lleno de aprendizajes y pasión: nuestra historia en Coorve
        </p> */}
        <div className="mx-auto my-8 flex flex-col text-white">
          <h2 className="mx-4 my-4 text-3xl">Sobre nosotros</h2>
          <p className="mx-4 max-w-[700px]">
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
          <h4 className="mx-4 my-4 font-['Open_Sans'] text-3xl text-white  md:mx-0">
            Datos básicos
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 ">
            {facts.map((fact) => (
              <div className="sm:pr-15 relative m-2 h-[270px] rounded-lg border bg-gray-700 py-8 text-white sm:pl-10">
                <h1 className="mx-2 text-6xl font-bold">{fact.number}</h1>
                <div className="mr-4 justify-between px-4 font-['Open_Sans'] sm:px-0">
                  <p className="my-4">{fact.description}</p>
                  <p className="absolute bottom-2 mt-20 text-white/50">
                    {fact.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto my-10 text-white">
          <h4 className="mx-4 my-4 font-['Open_Sans'] text-3xl text-white">
            Nuestro equipo
          </h4>
          <div className="mx-4 md:flex">
            {stuffs.map((person) => (
              <div
                key={person.name}
                className="relative mb-16 flex max-w-[500px] flex-col last:mr-0 hover:rounded-t-lg sm:mr-5 2k:mb-10"
              >
                <div className=" group flex max-w-[500px] flex-col ">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      alt={person.name}
                      src={person.url}
                      className="transform overflow-visible object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                  <h2 className="mt-4 text-2xl group-hover:underline">
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
                  <p className="top-full mt-4 pb-4 md:absolute ">
                    {person.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto my-14  text-white lg:block">
          <h4 className="mx-4 my-4 font-['Open_Sans'] text-3xl md:mx-0">
            La historia de Coorve
          </h4>
          <div className="mx-2 max-w-[500px] md:relative md:max-w-[736px] xl:max-w-[1170px] 2xl:max-w-[1560px]">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute -left-8 top-1/2 z-50 mx-2 -translate-y-1/2 transform rounded-[300px] bg-gray-500  p-2 text-white hover:border hover:bg-gray-800"
            >
              <svg
                fill="#ffff"
                width="20px"
                height="20px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 26 6 L 6 15.21875 L 6 16.78125 L 26 26 L 26 23.84375 L 9.46875 16 L 26 8.15625 Z" />
              </svg>
            </button>

            <Swiper
              modules={[Navigation, Pagination, A11y]}
              navigation={false}
              // pagination={{ clickable: true }}
              spaceBetween={30}
              slidesPerView={4}
              breakpoints={{
                400: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },
                758: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                1210: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                1350: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className=""
            >
              {history.map((feat, index) => (
                <SwiperSlide key={index}>
                  <div className="mx-0 flex h-[150px] w-[350px] flex-col rounded-lg border bg-gray-700 p-8 font-['Open_Sans']">
                    <img src={feat.url} alt="" />
                    <p className="font-bold">{feat.date}</p>
                    <p>{feat.feat}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute -right-8 top-1/2 z-50 mx-2 -translate-y-1/2 transform rounded-[300px] bg-gray-500 p-2 text-white hover:border hover:bg-gray-800"
            >
              <svg
                fill="#ffff"
                width="20px"
                height="20px"
                viewBox="0 0 56 56"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 13.8320 43.5625 C 14.4883 43.5625 14.9336 43.3516 15.4258 43.1172 L 41.7695 31.2813 C 43.1055 30.6484 44.1602 29.6172 44.1602 28.1172 C 44.1602 26.6406 43.1289 25.5625 41.7461 24.9532 L 15.4258 12.8359 C 14.9570 12.6016 14.5351 12.4375 13.9258 12.4375 C 12.7070 12.4375 11.8398 13.2813 11.8398 14.5235 C 11.8398 15.6016 12.4023 16.2110 13.3867 16.6797 L 38.6055 27.8125 L 38.6055 28.0703 L 13.3867 39.2969 C 12.4023 39.7656 11.8398 40.3750 11.8398 41.4531 C 11.8398 42.7422 12.6836 43.5625 13.8320 43.5625 Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { Nosotros };
