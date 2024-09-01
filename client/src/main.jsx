// Importation des modules de base de React, ReactDOM et React Router.
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importation des composants principaux de l'application.
import App from "./App";
import Menu from "./pages/menuPage";
import Connexion from "./components/connexion/connexion";
import Inscription from "./components/inscription/inscription";
import Continents from "./components/accueil/Accueil";
import Favoris from "./components/favoris/fav";
import Admin from "./components/admin/Admin";

// Création des routes avec React Router.
const router = createBrowserRouter([
  {
    element: <App />, // Le composant `App` est l'élément de base pour toutes les routes.

    // Définition des routes enfants qui seront rendues à l'intérieur du composant `App`.
    children: [
      {
        path: "/", // Chemin pour la page d'accueil.
        element: <Continents />, // Rend le composant `Continents` pour la page d'accueil.
      },
      {
        path: "/menuPage/:continent", // Chemin pour la page de menu d'un continent spécifique.
        element: <Menu />, // Rend le composant `Menu` pour cette route.
      },
      {
        path: "/connexion", // Chemin pour la page de connexion.
        element: <Connexion />, // Rend le composant `Connexion` pour cette route.
      },
      {
        path: "/inscription", // Chemin pour la page d'inscription.
        element: <Inscription />, // Rend le composant `Inscription` pour cette route.
      },
      {
        path: "/favoris", // Chemin pour la page des favoris.
        element: <Favoris />, // Rend le composant `Favoris` pour cette route.
      },
      {
        path: "/Admin", // Chemin pour la page d'administration.
        element: <Admin />, // Rend le composant `Admin` pour cette route.
      },
    ],
  },
]);

// Création de la racine de l'application à l'intérieur de l'élément DOM avec l'id "root".
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendu de l'application React à l'intérieur de `React.StrictMode`.
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />{" "}
    {/* Fournit le routeur à l'ensemble de l'application */}
  </React.StrictMode>
);
