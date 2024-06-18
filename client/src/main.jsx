import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Menu from "./pages/menu_europe";
import Formulaire from "./pages/formulairePage";
import Continents from "./components/accueil/Accueil";

const router = createBrowserRouter([
  {
    element: <App />,

    children: [
      {
        path: "/",
        element: <Continents />,
      },
      {
        loader: async () =>
          fetch(`http://localhost:3310/api/menu/menus-recipes`),
        path: "/menu_europe",
        element: <Menu />,
      },
      {
        path: "/formulaire",
        element: <Formulaire />,
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
