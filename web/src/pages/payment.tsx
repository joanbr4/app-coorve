import { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { url_be } from "./login";
// import fetch from "cross-fetch";;

const PaymentSuccess = () => {
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");
    console.log(sessionId);
    if (sessionId) {
      fetch(url_be + `/retrieve-session/${sessionId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Customer data:", data);
        })
        .catch((error) => {
          console.error("Error retrieving session:", error);
        });
    }
  }, [location]);

  return (
    <>
      <div>Payment Success</div>;
      <NavLink to="/content">Volver a la pagina</NavLink>
    </>
  );
};

export default PaymentSuccess;
