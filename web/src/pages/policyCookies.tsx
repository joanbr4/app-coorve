import { useNavigate } from "react-router-dom";
import logo from "/logo-de-coorve-transparante-1024x269.webp";

const PolicyCookies = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-slate-800">
      <div
        className="align-center absolute ml-[40px] mt-3 w-[100px] cursor-pointer md:ml-[50px] lg:w-[250px]"
        onClick={() => navigate(-1)}
      >
        <img src={logo} alt="logo" />
      </div>
      <div className="mx-auto max-w-[900px] px-2 py-4 pt-6 text-lg text-white">
        <h1 className="text-center text-5xl font-bold">POLÍTICA DE COOKIES</h1>
        <p className="mt-6">
          En www.coorve.com (en adelante, "el Sitio Web"), utilizamos cookies y
          tecnologías similares para mejorar la experiencia del usuario,
          personalizar contenidos y analizar el tráfico del sitio. La presente
          Política de Cookies explica qué son las cookies, cómo las usamos y
          cómo puedes gestionarlas.
        </p>
        <h4 className="mt-6 font-bold ">¿Qué son las cookies?</h4>
        <p className="pb-4">
          Las cookies son pequeños archivos de texto que se almacenan en tu
          dispositivo (ordenador, tablet, smartphone, etc.) cuando visitas una
          página web. Las cookies permiten que el sitio web recuerde tus
          acciones y preferencias (como idioma, tamaño de fuente u otras
          preferencias) durante un tiempo determinado, lo que mejora tu
          experiencia de navegación.
        </p>
        <h4 className="my-2 font-bold">Tipos de cookies que utilizamos</h4>
        <p className="pb-4">
          En el Sitio Web utilizamos las siguientes categorías de cookies:
          <li>
            <span className="font-bold">Cookies técnicas o necesarias:</span>{" "}
            Son esenciales para el funcionamiento del sitio web y te permiten
            navegar por el sitio y utilizar sus funciones. Sin estas cookies,
            algunos servicios no estarían disponibles.
          </li>
          <li>
            <span className="font-bold">Cookies de personalización:</span>{" "}
            Permiten recordar tus preferencias para mejorar tu experiencia en
            futuras visitas, como el idioma o la región.
          </li>
          <li>
            <span className="font-bold">Cookies analíticas: </span>Recogen
            información sobre cómo los usuarios interactúan con el sitio web,
            como las páginas que visitan, el tiempo de permanencia o los errores
            que puedan surgir. Esta información nos ayuda a mejorar el
            funcionamiento del Sitio Web.
          </li>
          <li>
            <span className="font-bold">Cookies de publicidad:</span> Son
            utilizadas para mostrarte anuncios más relevantes según tus
            intereses, limitando el número de veces que ves un anuncio y
            ayudando a medir la efectividad de nuestras campañas publicitarias.
          </li>
        </p>
        <h4 className="my-2 font-bold">Cookies de terceros</h4>
        <p className="pb-4">
          Los datos personales proporcionados se conservarán mientras se
          mantenga la relación comercial o hasta que se solicite la supresión
          por el interesado. En cualquier caso, los datos se conservarán durante
          el tiempo necesario para cumplir con las obligaciones legales
          pertinentes.
        </p>
        <h4 className="my-2 font-bold">¿Cómo puedes gestionar las cookies?</h4>
        <p className="pb-4">
          Tienes la opción de permitir, bloquear o eliminar las cookies
          instaladas en tu dispositivo a través de la configuración de tu
          navegador. Ten en cuenta que si bloqueas o eliminas las cookies, es
          posible que algunos servicios o funciones del sitio web no estén
          disponibles.
        </p>

        <h4 className="my-2 font-bold">
          Actualizaciones de la Política de Cookies
        </h4>
        <p className="pb-4">
          COORVE INTL S.L. se reserva el derecho a modificar la presente
          Política de Cookies para adaptarla a cambios normativos o técnicos.
          Cualquier modificación será publicada en el Sitio Web, y te
          informaremos de cualquier cambio significativo.
        </p>
        <h4 className="my-2 font-bold">Contacto</h4>
        <p>
          Si tienes alguna duda o consulta sobre esta Política de Cookies,
          puedes contactarnos a través de nuestro correo electrónico:
          guillermo@coorve.com.
        </p>
      </div>
    </div>
  );
};

export { PolicyCookies };
