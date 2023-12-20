import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Compose, Home, Inbox, Login, SentMessage } from "../components";

const elementRoute = createRoutesFromElements(
  <>
    <Route path="/" element={<Home />}>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/compose" element={<Compose />} />
      <Route path="/sent" element={<SentMessage />} />
    </Route>
  </>
);
const router = createBrowserRouter(elementRoute);
export default router;
