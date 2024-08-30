import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Homescreen from "../../components/pages/Homescreen";
import PlaylistScreen from "../../components/pages/PlaylistScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homescreen />,
      },
      {
        path: "/playlist/:id",
        element: <PlaylistScreen />,
      },
    ],
  },
]);
