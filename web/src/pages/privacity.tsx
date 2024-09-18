import { useNavigate } from "react-router-dom";
import logo from "/logo-de-coorve-transparante-1024x269.webp";

const Privacity = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-slate-800">
      <div
        className="align-center absolute ml-[40px] mt-3 w-[100px] cursor-pointer md:ml-[50px] lg:w-[250px]"
        onClick={() => navigate(-1)}
      >
        <img src={logo} alt="logo" />
      </div>
      <div className="mx-auto max-w-[800px] px-2 pt-6 text-lg text-white">
        <h1 className="text-center text-5xl font-bold">AVISO DE PRIVACIDAD</h1>
        <h4 className="mt-6 font-bold ">
          Responsable del Tratamiento de los Datos
        </h4>
        <p className="pb-4">
          COORVE INTL S.L.
          <br />
          CIF: B42808105
          <br />
          Dirección: Carrer Roc Boronat n48 3-3
          <br /> Correo de contacto: guillermo@coorve.com
          <br /> Sitio web: www.coorve.com
        </p>
        <h4 className="my-2 font-bold">
          Finalidad del Tratamiento de los Datos
        </h4>
        <p className="pb-4">
          En COORVE INTL S.L., tratamos la información que nos facilitan las
          personas interesadas con el fin de gestionar la relación comercial,
          prestar los servicios solicitados, y enviar comunicaciones
          comerciales, en su caso, sobre nuestros productos y servicios.
        </p>
        <h4 className="my-2 font-bold">Plazo de Conservación de los Datos</h4>
        <p className="pb-4">
          Los datos personales proporcionados se conservarán mientras se
          mantenga la relación comercial o hasta que se solicite la supresión
          por el interesado. En cualquier caso, los datos se conservarán durante
          el tiempo necesario para cumplir con las obligaciones legales
          pertinentes.
        </p>
        <h4 className="my-2 font-bold">
          Legitimación para el Tratamiento de los Datos
        </h4>
        <p className="pb-4">
          La base legal para el tratamiento de los datos es el consentimiento de
          la persona interesada, la ejecución de un contrato y el cumplimiento
          de obligaciones legales que nos corresponden como responsables.
        </p>
        <h4 className="my-2 font-bold">Destinatarios de los Datos</h4>
        <p className="pb-4">
          Los datos no se cederán a terceros, salvo obligación legal.
        </p>
        <h4>Derechos de los Interesados</h4>
        <p>
          Cualquier persona tiene derecho a obtenerconfirmación sobre si en
          COORVE INTL S.L. estamos tratando sus datos personales. Las personas
          interesadas tienen derecho a:
        </p>

        <li className="mt-2"> Solicitar el acceso a sus datos personales.</li>
        <li>Solicitar su rectificación o supresión.</li>
        <li>Solicitar la limitación de su tratamiento.</li>
        <li>Oponerse al tratamiento.</li>
        <li className="mb-2">Solicitar la portabilidad de los datos.</li>

        <p>
          Para ejercer estos derechos, puede enviar una solicitud escrita junto
          con una copia de su DNI o documento equivalente al correo electrónico
          guillermo@coorve.com.
        </p>

        <h4 className="my-2 font-bold">Seguridad de los Datos</h4>
        <p className="pb-4">
          En COORVE INTL S.L. adoptamos todas las medidas técnicas y
          organizativas necesarias para garantizar la seguridad e integridad de
          los datos personales, así como para evitar su pérdida, alteración y/o
          acceso por parte de terceros no autorizados.
        </p>
        <h4 className="my-2 font-bold">
          Modificaciones en el Aviso de Privacidad
        </h4>
        <p className="pb-4">
          COORVE INTL S.L. se reserva el derecho a modificar el presente aviso
          de privacidad para adaptarlo a novedades legislativas o
          jurisprudenciales, así como a prácticas del sector. En dichos
          supuestos, se anunciarán en esta página los cambios con razonable
          antelación a su implementación.
        </p>
      </div>
    </div>
  );
};

export { Privacity };
