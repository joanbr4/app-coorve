import { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  console.log("hola");
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");
    console.log(sessionId);
    if (sessionId) {
      // fetch(`/retrieve-session/${sessionId}`, { method: "POST" })
      fetch(`/retrieve-session/${sessionId}`)
        // fetch(`/retrieve-session?session_id=${sessionId}`)
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
