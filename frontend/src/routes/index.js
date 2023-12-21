import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Compose, Home, Inbox, Login, MessageDetail, SentMessage } from "../components";

const elementRoute = createRoutesFromElements(
  <>
    <Route path="/" element={<Home />}>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/compose" element={<Compose />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/sent" element={<SentMessage />} />
      <Route path="/message/:id" element={<MessageDetail />} />
    </Route>
  </>
);
const router = createBrowserRouter(elementRoute);
export default router;
