import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "../pages/landing";
import Register from "../pages/register";
import Login from "../pages/login";
import Content from "../pages/content";
// import Chatgpt from "@/pages/chatgpt";
import Faqs from "@/pages/faq";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/content" element={<Content />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/chatgpt" element={<Chatgpt />} /> */}
      <Route path="/faqs" element={<Faqs />} />
    </>
  )
);

export default router;
