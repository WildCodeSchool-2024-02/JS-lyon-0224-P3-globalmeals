// Importation des fichiers CSS et des composants nécessaires de React et React Router.
import "./App.css";
import { Outlet } from "react-router-dom"; // Outlet pour rendre les sous-composants en fonction de la route.
import { ToastContainer } from "react-toastify"; // Importation du conteneur Toast pour afficher les notifications.
import UserProvider from "./contexts/UserContext"; // Contexte utilisateur pour gérer l'état global de l'utilisateur.
import Header from "./components/header/Header"; // Composant pour l'en-tête de l'application.
import NavbarToggle from "./components/navbar/NavbarToggle"; // Composant pour la barre de navigation.
import Footer from "./components/Footer/Footer"; // Composant pour le pied de page.
import "react-toastify/dist/ReactToastify.css"; // Importation des styles pour les notifications Toast.

function App() {
  return (
    // Le contexte utilisateur encapsule toute l'application pour rendre l'état utilisateur disponible partout.
    <UserProvider>
      <div className="app">
        {/* Composant pour l'en-tête */}
        <Header />

        {/* Conteneur principal pour le contenu de la page */}
        <main className="container">
          {/* Composant pour la barre de navigation avec bascule */}
          <NavbarToggle />

          {/* Outlet rend le composant correspondant à la route actuelle */}
          <Outlet />
        </main>

        {/* Composant ToastContainer pour afficher les notifications dans l'application */}
        <ToastContainer
          position="bottom-right" // Position des notifications
          autoClose={4000} // Délai avant fermeture automatique (en millisecondes)
          hideProgressBar={false} // Affiche la barre de progression
          newestOnTop // Affiche les notifications les plus récentes en haut
          closeOnClick // Permet de fermer les notifications en cliquant dessus
          rtl={false} // Désactive le texte de droite à gauche
          pauseOnFocusLoss // Met en pause le timer de fermeture automatique lorsqu'on change de fenêtre
          draggable // Permet de faire glisser les notifications pour les déplacer
          pauseOnHover // Met en pause le timer de fermeture automatique lorsqu'on passe la souris dessus
          theme="colored" // Thème coloré pour les notifications
        />

        {/* Composant pour le pied de page */}
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
