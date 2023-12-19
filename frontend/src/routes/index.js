import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Compose, Home, Inbox, Login, Message } from "../components";

const elementRoute = createRoutesFromElements(
  <>
    <Route path="/" element={<Home />}>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/compose" element={<Compose />} />
      <Route path="/message" element={<Message />} />
    </Route>
  </>
);
const router = createBrowserRouter(elementRoute);
export default router;
