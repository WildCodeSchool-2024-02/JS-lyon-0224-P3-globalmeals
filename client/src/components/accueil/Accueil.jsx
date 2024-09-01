// Importation du fichier CSS pour le composant Accueil afin d'appliquer les styles.
import "./Accueil.css";

// Importation du composant Link de react-router-dom pour la navigation entre les pages.
import { Link } from "react-router-dom";

// Importation des images des différents continents à partir du dossier assets.
import europeImage from "../../assets/images/i136012-spaghettis-bolognaise.jpeg";
import afriqueImage from "../../assets/images/bonava.jpg";
import ameriqueImage from "../../assets/images/burger.jpeg";
import asieImage from "../../assets/images/assiette-de-sushi.jpeg";
import oceanieImage from "../../assets/images/KANGAROO_STEAK.jpeg";
import welcomeImage from "../../assets/images/friends-happiness.png";

// Importation du contexte utilisateur pour accéder aux informations sur l'utilisateur connecté.
import { useUserContext } from "../../contexts/UserContext";

// Définition du composant Continents qui représente la page d'accueil des menus par continent.
function Continents() {
  // Récupération des informations sur l'utilisateur depuis le contexte UserContext.
  const { user } = useUserContext();

  return (
    <main className="continents">
      {/* Section de bienvenue */}
      <div className="welcome-container">
        {/* Affichage de l'image de bienvenue */}
        <img className="welcome" src={welcomeImage} alt="welcome" />
        {/* Message de bienvenue personnalisé en fonction de l'état de connexion de l'utilisateur */}
        <h2 className="welcome-text">
          {
            user !== ""
              ? "Bienvenue et bonne dégustation !" // Si l'utilisateur est connecté, on affiche un message de bienvenue.
              : "Connectez-vous pour découvrir l'ensemble de nos menus !" // Sinon, on invite à se connecter.
          }
        </h2>
      </div>

      {/* Titre de la section des nouveaux menus */}
      <h2 className="new-menus">
        Chaque mois, un tour du monde culinaire avec nos menus complets !
      </h2>

      {/* Conteneur principal pour les images et les liens vers les menus des continents */}
      <div className="cercles">
        {/* Première rangée des images de continents */}
        <div className="continents1">
          {/* Conteneur pour l'image et le lien vers le menu européen */}
          <div className="image-container">
            <img className="europe" src={europeImage} alt="europe" />
            <h2>
              <Link to="/menuPage/europe">Europe</Link>
            </h2>
          </div>

          {/* Conteneur pour l'image et le lien vers le menu africain */}
          {/* La classe 'disabled' est ajoutée si l'utilisateur n'est pas connecté, désactivant ainsi le lien */}
          <div className={`image-container ${user === "" ? "disabled" : ""}`}>
            <img className="afrique" src={afriqueImage} alt="afrique" />
            <h2>
              {/* Si l'utilisateur est connecté, le lien est actif, sinon il reste inactif */}
              <Link to={user !== null ? "/menuPage/afrique" : "#"}>
                Afrique
              </Link>
            </h2>
          </div>

          {/* Conteneur pour l'image et le lien vers le menu américain */}
          <div className={`image-container ${user === "" ? "disabled" : ""}`}>
            <img className="amerique" src={ameriqueImage} alt="amérique" />
            <h2>
              <Link to={user !== null ? "/menuPage/amerique" : "#"}>
                Amérique
              </Link>
            </h2>
          </div>
        </div>

        {/* Deuxième rangée des images de continents */}
        <div className="continents2">
          {/* Conteneur pour l'image et le lien vers le menu asiatique */}
          <div className={`image-container ${user === "" ? "disabled" : ""}`}>
            <img className="asie" src={asieImage} alt="asie" />
            <h2>
              <Link to={user !== null ? "/menuPage/asie" : "#"}>Asie</Link>
            </h2>
          </div>

          {/* Conteneur pour l'image et le lien vers le menu océanien */}
          <div className={`image-container ${user === "" ? "disabled" : ""}`}>
            <img className="oceanie" src={oceanieImage} alt="océanie" />
            <h2>
              <Link to={user !== null ? "/menuPage/oceanie" : "#"}>
                Océanie
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}

// Exportation du composant Continents pour l'utiliser dans d'autres parties de l'application.
export default Continents;
