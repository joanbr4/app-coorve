import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./setup/App.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
