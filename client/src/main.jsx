import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Menu from "./pages/menu";
import FormulaireP from "./pages/formulairePage"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        loader: async () => fetch(`http://localhost:3310/api/menu`),
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/formulaireP",
        element: < FormulaireP />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
