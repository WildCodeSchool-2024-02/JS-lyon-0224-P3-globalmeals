// Importation des hooks useState et des outils de navigation et de gestion de contextes.
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../contexts/UserContext";
import "./connexion.css"; // Importation du fichier CSS pour styliser le composant Login.

function Login() {
  // Récupère l'URL de l'API depuis les variables d'environnement.
  const ApiUrl = import.meta.env.VITE_API_URL;

  // Fonction pour afficher une notification de succès avec le nom d'utilisateur.
  const notifySuccess = (username) => toast.success(`Bienvenue, ${username} !`);

  // Fonction pour afficher une notification d'échec.
  const notifyFail = () => toast.error("Une erreur s'est produite");

  // Hook pour naviguer entre les pages.
  const navigate = useNavigate();

  // Récupération de la fonction login depuis le contexte utilisateur.
  const { login } = useUserContext();

  // État local pour stocker les informations de connexion (email et mot de passe).
  const [loginInfos, setLoginInfos] = useState({
    mail: "",
    password: "",
  });

  // Gestionnaire pour mettre à jour les informations de connexion à chaque changement dans les champs du formulaire.
  const handleLoginInfos = (e) => {
    setLoginInfos({ ...loginInfos, [e.target.name]: e.target.value });
  };

  // Gestionnaire pour traiter la soumission du formulaire de connexion.
  const handleLogin = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page à la soumission du formulaire.

    // Validation basique pour s'assurer que les champs ne sont pas vides.
    if (loginInfos.mail.trim() === "" || loginInfos.password.trim() === "") {
      console.error("Mail and password must be non-empty strings");
      return;
    }

    try {
      // Appel à l'API pour demander une connexion.
      const response = await fetch(`${ApiUrl}/auth/connexion`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Envoie et reçoit les cookies à chaque requête pour gérer les sessions.
        body: JSON.stringify(loginInfos), // Envoie les informations de connexion en tant que JSON.
      });

      // Si la réponse de l'API est un succès (status 200), on continue le traitement.
      if (response.status === 200) {
        const responseData = await response.json();
        console.info("API response:", responseData);

        // Vérifie si l'objet utilisateur est présent dans la réponse.
        if (responseData.user) {
          const { username } = responseData.user;

          // Stocke l'utilisateur dans le contexte global de l'application.
          login(responseData.user);

          // Redirige l'utilisateur vers la page admin s'il est administrateur, sinon vers la page d'accueil.
          if (loginInfos.pseudo === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }

          // Affiche une notification de succès avec le nom de l'utilisateur.
          notifySuccess(username);
        } else {
          console.error("User object is missing in the response");
        }
      } else {
        // Si le login échoue, affiche une notification d'échec.
        console.info("Login failed with status:", response.status);
        notifyFail();
      }
    } catch (error) {
      // Capture et affiche les erreurs éventuelles survenues durant le processus de connexion.
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        {/* Champ pour entrer l'adresse mail */}
        <div className="form-group1">
          <label htmlFor="mail">Adresse mail</label>
          <input
            type="mail"
            name="mail"
            value={loginInfos.mail}
            onChange={handleLoginInfos}
          />
        </div>

        {/* Champ pour entrer le mot de passe */}
        <div className="form-group2">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={loginInfos.password}
            onChange={handleLoginInfos}
          />
        </div>

        {/* Bouton de soumission pour se connecter */}
        <div className="back-home">
          <button type="submit" className="validate">
            Se connecter
          </button>
        </div>
      </form>

      {/* Lien pour rediriger vers la page de création de compte */}
      <Link to="/inscription" className="create">
        <p>Créez un compte</p>
      </Link>
    </div>
  );
}

export default Login;
