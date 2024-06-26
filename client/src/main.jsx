import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Menu from "./pages/menuPage";
import Connexion from "./components/connexion/connexion";
import Continents from "./components/accueil/Accueil";
import Favoris from "./components/favoris/fav";
import Admin from "./components/admin/Admin";

const router = createBrowserRouter([
  {
    element: <App />,

    children: [
      {
        path: "/",
        element: <Continents />,
      },
      {
        path: "/menuPage/:continent",
        element: <Menu />,
      },
      {
        path: "/connexion",
        element: <Connexion />,
      },
      {
        path: "/favoris",
        element: <Favoris />,
      },
      {
        path: "/Admin",
        element: <Admin />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
