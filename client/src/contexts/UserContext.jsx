// Importation des modules nécessaires de React, React Router, PropTypes, et d'un hook personnalisé pour gérer le stockage local.
import PropTypes from "prop-types";
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

// Création d'un contexte utilisateur pour gérer l'état de l'utilisateur dans l'application.
const UserContext = createContext();

// Composant UserProvider qui encapsule l'application pour fournir le contexte utilisateur.
export default function UserProvider({ children }) {
  // Récupération de l'URL de l'API depuis les variables d'environnement.
  const ApiUrl = import.meta.env.VITE_API_URL;

  // Hook pour naviguer entre les pages de l'application.
  const navigate = useNavigate();

  // Utilisation du hook personnalisé useLocalStorage pour gérer l'état utilisateur et le stocker localement.
  const [user, setUser] = useLocalStorage("user", "");

  // Fonction pour connecter l'utilisateur en mettant à jour l'état avec les données de l'utilisateur.
  const login = (userData) => {
    setUser(userData);
  };

  // Fonction pour déconnecter l'utilisateur. Elle peut gérer un cas spécial où la session a expiré.
  const logout = async (sessionExpired) => {
    try {
      // Appel à l'API pour déconnecter l'utilisateur.
      const response = await fetch(`${ApiUrl}/auth/logout`, {
        credentials: "include", // Inclut les cookies dans la requête pour gérer les sessions.
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Si la déconnexion est réussie, réinitialise l'état de l'utilisateur et redirige vers la page appropriée.
      if (response.status === 200) {
        setUser("");
        navigate(sessionExpired === true ? "/connexion" : "/");
      }
    } catch (err) {
      // Log des erreurs éventuelles survenues lors de la déconnexion.
      console.error(err);
    }
  };

  // Utilisation du hook useMemo pour optimiser la performance en mémorisant les valeurs du contexte utilisateur.
  const memo = useMemo(
    () => ({ user, setUser, login, logout }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  // Fournit le contexte utilisateur à tous les enfants du composant UserProvider.
  return <UserContext.Provider value={memo}>{children}</UserContext.Provider>;
}

// Validation des props avec PropTypes pour s'assurer que le composant UserProvider reçoit bien des enfants.
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personnalisé pour accéder facilement au contexte utilisateur dans d'autres composants.
export const useUserContext = () => useContext(UserContext);
