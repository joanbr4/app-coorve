import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Register, action as registerAction } from "../pages/register";
import Login from "../pages/login";
import Content from "../pages/content";
import Faqs from "@/pages/faq";
import { UserPage } from "@/pages/userPage";
import { ResetPass } from "@/pages/resetPass";
import { UpdatePass } from "@/pages/updatePass";
import CircularChart from "@/pages/dashboard";
import { Perfil } from "@/pages/perfil";
import { Configuration } from "@/pages/configuracion";
import { Facturación } from "@/pages/facturación";
import { PrivateRoute } from "./FilteredRoutes";
// import { ErrorBoundary } from "@/pages/errors/ErrorBoundary";
import { NotFoundPage } from "@/pages/errors/NotFounPage";
import PaymentSuccess from "@/pages/payment";
import { Nosotros } from "@/pages/nosotros";
import { inject } from "@vercel/analytics";
import { PolicyCookies } from "@/pages/policyCookies";
import { TermsUse } from "@/pages/termsUse";
import { Privacity } from "@/pages/privacity";

inject();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Content />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/signin" action={registerAction} element={<Register />} />
      <Route path="/signup" element={<Login />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/politica-de-cookies" element={<PolicyCookies />} />
      <Route path="/terminos-de-uso" element={<TermsUse />} />
      <Route path="/privacidad" element={<Privacity />} />
      <Route path="/user" element={<PrivateRoute element={<UserPage />} />}>
        <Route path="dashboard" element={<CircularChart />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="settings" element={<Configuration />} />
        <Route path="facturas" element={<Facturación />} />
      </Route>

      <Route path="/reset-password" element={<ResetPass />} />
      <Route path="/password/reset/:linkId" element={<UpdatePass />} />

      {/* other */}
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export default router;
