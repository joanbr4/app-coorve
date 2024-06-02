import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "../pages/landing";
import { Register, action as registerAction } from "../pages/register";
import Login from "../pages/login";
import Content from "../pages/content";
// import Chatgpt from "@/pages/chatgpt";
import Faqs from "@/pages/faq";
import { UserPage } from "@/pages/userPage";
import { ResetPass } from "@/pages/resetPass";
import { UpdatePass } from "@/pages/updatePass";
import { Dashboard } from "@/pages/dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/content" element={<Content />} />
      <Route path="/signin" action={registerAction} element={<Register />} />
      <Route path="/signup" element={<Login />} />
      {/* <Route path="/chatgpt" element={<Chatgpt />} /> */}
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/user" element={<UserPage />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="perfil" element={<Faqs />} />
        <Route path="configarucion" element={<Faqs />} />
        <Route path="facturas" element={<Faqs />} />
      </Route>

      <Route path="/reset-password" element={<ResetPass />} />
      <Route path="/password/reset/:linkId" element={<UpdatePass />} />
    </>
  )
);

export default router;
