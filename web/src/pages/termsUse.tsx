import { useNavigate } from "react-router-dom";
import logo from "/logo-de-coorve-transparante-1024x269.webp";

const TermsUse = () => {
  const navigate = useNavigate();

  return (
    <div className=" bg-slate-800">
      <div
        className="align-center absolute ml-[40px] mt-3 w-[100px] cursor-pointer md:ml-[50px] lg:w-[250px]"
        onClick={() => navigate(-1)}
      >
        <img src={logo} alt="logo" />
      </div>
      <div className="mx-auto max-w-[800px] px-2 pt-6 text-lg text-white">
        <h1 className="text-center text-5xl font-bold">TÉRMINOS DE USO</h1>
        <h4 className="mt-6 font-bold ">Introducción</h4>
        <p className="pb-4">
          El presente documento establece los términos y condiciones de uso (en
          adelante, "Términos de Uso") de la página web www.coorve.com,
          propiedad de COORVE INTL S.L., con CIF B42808105 y domicilio en Carrer
          Roc Boronat n48 3-3 (en adelante, "COORVE" o "nosotros"). Al acceder y
          utilizar nuestro sitio web, aceptas los presentes Términos de Uso en
          su totalidad.
        </p>
        <h4 className="my-2 font-bold">Objeto</h4>
        <p className="pb-4">
          El objeto de estos Términos de Uso es regular el acceso, navegación y
          uso del sitio web www.coorve.com (en adelante, "Sitio Web"), así como
          las responsabilidades derivadas del uso de sus contenidos, como
          textos, gráficos, diseños, códigos, software, fotografías, música,
          vídeos o cualquier otro material disponible a través del mismo.
        </p>
        <h4 className="my-2 font-bold">Uso del Sitio Web</h4>
        <p className="pb-4">
          El acceso y uso del Sitio Web es gratuito para los usuarios. No
          obstante, COORVE se reserva el derecho de establecer determinados
          servicios de pago en el futuro, informando previamente a los usuarios.
          El usuario se compromete a utilizar el Sitio Web de manera legal y
          conforme a la moral y el orden público, evitando cualquier uso que
          pudiera dañar la imagen, los intereses o los derechos de COORVE o de
          terceros.
        </p>
        <h4 className="my-2 font-bold">Contenido del Sitio Web</h4>
        <p className="pb-4">
          Todos los contenidos incluidos en el Sitio Web están protegidos por
          derechos de propiedad intelectual e industrial, y pertenecen a COORVE
          o a terceros que han autorizado su uso. Está prohibida la
          reproducción, distribución o modificación no autorizada de los mismos.
        </p>
        <h4 className="my-2 font-bold">Exclusión de Responsabilidad</h4>
        <p className="pb-4">
          COORVE no garantiza la disponibilidad continua y permanente del Sitio
          Web ni de sus servicios. En ningún caso será responsable por daños y
          perjuicios de cualquier naturaleza que puedan derivarse de:
          <li className="mt-2">La falta de disponibilidad del Sitio Web. </li>
          <li>Errores u omisiones en los contenidos. </li>
          <li className="mb-2">
            Daños causados por virus o elementos dañinos que afecten
          </li>
          los sistemas del usuario.
        </p>
        <h4>Enlaces Externos</h4>
        <p>
          El Sitio Web puede incluir enlaces a otros sitios web gestionados por
          terceros. COORVE no se hace responsable del contenido ni de la
          exactitud de la información contenida en dichos sitios.
        </p>

        <h4 className="my-2 font-bold">
          Modificaciones de los Términos de Uso
        </h4>
        <p className="pb-4">
          COORVE se reserva el derecho de modificar los presentes Términos de
          Uso en cualquier momento. Los cambios entrarán en vigor desde el
          momento en que se publiquen en el Sitio Web. El uso continuado del
          Sitio Web después de la publicación de las modificaciones implica la
          aceptación de los nuevos términos.
        </p>
        <h4 className="my-2 font-bold">Política de Privacidad</h4>
        <p className="pb-4">
          El uso de los datos personales facilitados por el usuario está
          regulado en nuestra Política de Privacidad, que se encuentra
          disponible en el Sitio Web.
        </p>
        <h4 className="my-2 font-bold">Legislación Aplicable y Jurisdicción</h4>
        <p className="pb-4">
          Estos Términos de Uso se rigen por la legislación española. Para
          cualquier controversia derivada del acceso o uso del Sitio Web, las
          partes se someterán a los juzgados y tribunales de la ciudad de
          Barcelona, con renuncia expresa a cualquier otro fuero que pudiera
          corresponderles.
        </p>
      </div>
    </div>
  );
};

export { TermsUse };
