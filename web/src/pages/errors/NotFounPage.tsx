import { NavLink, useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="my-auto flex flex-col items-center" id="error-page">
      <h1>You'r out of this project!!</h1>
      <p>Here are some helpful links:</p>
      <div className="boxButtonsNFP">
        <button className="m-2 rounded-md bg-gray-800 p-2 font-bold text-white">
          <NavLink to="/">Landing</NavLink>
        </button>
        <button className="m-2 rounded-md bg-gray-800 p-2 font-bold text-white">
          <NavLink to="/signup">Login</NavLink>
        </button>
        <button
          className="m-2 rounded-md bg-gray-800 p-2 font-bold text-white"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
    </div>
  );
};
