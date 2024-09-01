// Importation des hooks et outils nécessaires de React, React Router et Toastify.
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../contexts/UserContext"; // Importation du contexte utilisateur.
import "./NavbarToggle.css"; // Importation du fichier CSS pour styliser la barre de navigation.

export default function NavbarToggle() {
  // État local pour contrôler l'ouverture/fermeture du menu déroulant.
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Récupération du contexte utilisateur pour accéder à l'utilisateur actuel et à la fonction de mise à jour de l'utilisateur.
  const { user, setUser } = useUserContext();

  // Hook pour naviguer vers une autre page après certaines actions.
  const navigate = useNavigate();

  // Fonction pour afficher une notification d'erreur si l'utilisateur essaie d'accéder à une page protégée sans être connecté.
  const notifyFail = () =>
    toast.error("Accès non autorisé, veuillez vous connecter");

  // Récupération de la fonction de déconnexion depuis le contexte utilisateur.
  const { logout } = useUserContext();

  // Fonction pour basculer l'état d'ouverture du menu déroulant.
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Fonction pour fermer le menu déroulant.
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Fonction pour gérer la déconnexion de l'utilisateur.
  const handleLogout = () => {
    setUser(""); // Réinitialise l'utilisateur dans le contexte.
    logout(false); // Déconnecte l'utilisateur via la fonction du contexte.
    navigate("/"); // Redirige vers la page d'accueil après la déconnexion.
  };

  // Fonction pour gérer la navigation au clavier (Entrée ou Espace) pour ouvrir/fermer le menu déroulant.
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleDropdown();
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {/* Lien vers la page d'accueil */}
        <li className="nav-item">
          <Link className="nav-link active" to="/" onClick={closeDropdown}>
            Accueil
          </Link>
        </li>

        {/* Menu déroulant pour les différentes pages de menus */}
        <li className="nav-item dropdown">
          <div
            className="dropdown-toggle nav-link"
            id="navbar-dropdown"
            role="button"
            onClick={toggleDropdown}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            Menus
          </div>
          <ul
            className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
            aria-labelledby="navbar-dropdown"
          >
            <li>
              <Link
                className="nav-dropdown"
                to="/menuPage/europe"
                onClick={closeDropdown}
              >
                Europe
              </Link>
            </li>
            <li>
              <Link
                className={`nav-dropdown ${!user ? "disabled" : ""}`}
                to={user ? "/menuPage/afrique" : "#"}
                onClick={closeDropdown}
              >
                Afrique
              </Link>
            </li>
            <li>
              <Link
                className={`nav-dropdown ${!user ? "disabled" : ""}`}
                to={user ? "/menuPage/amerique" : "#"}
                onClick={closeDropdown}
              >
                Amérique
              </Link>
            </li>
            <li>
              <Link
                className={`nav-dropdown ${!user ? "disabled" : ""}`}
                to={user ? "/menuPage/asie" : "#"}
                onClick={closeDropdown}
              >
                Asie
              </Link>
            </li>
            <li>
              <Link
                className={`nav-dropdown ${!user ? "disabled" : ""}`}
                to={user ? "/menuPage/oceanie" : "#"}
                onClick={closeDropdown}
              >
                Océanie
              </Link>
            </li>
          </ul>
        </li>

        {/* Lien vers la page d'administration pour les utilisateurs admin */}
        <li className="nav-item">
          {user && user.role === "admin" ? (
            <Link
              to="/admin"
              className="nav-link active"
              onClick={closeDropdown}
            >
              Modifier
            </Link>
          ) : (
            <Link
              to={user ? "/favoris" : "#"}
              className={`nav-link active ${!user ? "disabled" : ""}`}
              onClick={(e) => {
                if (!user) {
                  e.preventDefault(); // Empêche la navigation si l'utilisateur n'est pas connecté.
                  notifyFail(); // Affiche une notification d'erreur.
                }
                closeDropdown(); // Ferme le menu déroulant.
              }}
            >
              Favoris
            </Link>
          )}
        </li>

        {/* Gestion de l'affichage du lien de connexion/déconnexion */}
        <li className="nav-item">
          {user ? (
            <span
              className="nav-link active"
              onClick={handleLogout}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleLogout();
              }}
              role="button"
              tabIndex={0}
            >
              Déconnexion
            </span>
          ) : (
            <Link
              to="/connexion"
              className="nav-link active"
              onClick={closeDropdown}
            >
              Connexion
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
