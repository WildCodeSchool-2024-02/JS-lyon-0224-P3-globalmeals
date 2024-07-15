import "./Accueil.css";
import { Link } from "react-router-dom";
import europeImage from "../../assets/images/i136012-spaghettis-bolognaise.jpeg";
import afriqueImage from "../../assets/images/bonava.jpg";
import ameriqueImage from "../../assets/images/burger.jpeg";
import asieImage from "../../assets/images/assiette-de-sushi.jpeg";
import oceanieImage from "../../assets/images/KANGAROO_STEAK.jpeg";
import welcomeImage from "../../assets/images/friends-happiness.png";
import { useUserContext } from "../../contexts/UserContext";

function Continents() {
  const { user } = useUserContext();

  return (
    <main className="continents">
      <div className="welcome-container">
        <img className="welcome" src={welcomeImage} alt="welcome" />
        <h2 className="welcome-text">
          {user !== null
            ? "Bienvenue et bonne dégustation !"
            : "Connectez-vous pour découvrir l'ensemble de nos menus !"}
        </h2>
      </div>
      <h2 className="new-menus">
        Chaque mois, un tour du monde culinaire avec nos menus complets !
      </h2>
      <div className="cercles">
        <div className="continents1">
          <div className="image-container">
            <img className="europe" src={europeImage} alt="europe" />
            <h2>
              <Link to="/menuPage/europe">Europe</Link>
            </h2>
          </div>
          <div className={`image-container ${user === null ? "disabled" : ""}`}>
            <img className="afrique" src={afriqueImage} alt="afrique" />
            <h2>
              <Link to={user !== null ? "/menuPage/afrique" : "#"}>Afrique</Link>
            </h2>
          </div>
          <div className={`image-container ${user === null ? "disabled" : ""}`}>
            <img className="amerique" src={ameriqueImage} alt="amérique" />
            <h2>
              <Link to={user !== null ? "/menuPage/amerique" : "#"}>Amérique</Link>
            </h2>
          </div>
        </div>
        <div className="continents2">
          <div className={`image-container ${user === null ? "disabled" : ""}`}>
            <img className="asie" src={asieImage} alt="asie" />
            <h2>
              <Link to={user !== null ? "/menuPage/asie" : "#"}>Asie</Link>
            </h2>
          </div>
          <div className={`image-container ${user === null ? "disabled" : ""}`}>
            <img className="oceanie" src={oceanieImage} alt="océanie" />
            <h2>
              <Link to={user !== null ? "/menuPage/oceanie" : "#"}>Océanie</Link>
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Continents;
