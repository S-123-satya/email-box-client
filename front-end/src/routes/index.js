import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Compose, Home, Inbox, Login, Message } from "../components";

const elementRoute = createRoutesFromElements(
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home />}>
      <Route path="" element={<Inbox />} />
      <Route path="compose" element={<Compose />} />
      <Route path="message" element={<Message />} />
    </Route>
  </>
);
const router = createBrowserRouter(elementRoute);
export default router;