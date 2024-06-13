import "./Accueil.css";
import { Link } from "react-router-dom";
import europeImage from "../../assets/images/i136012-spaghettis-bolognaise.jpeg";
import afriqueImage from "../../assets/images/bonava.jpg";
import ameriqueImage from "../../assets/images/burger.jpeg";
import asieImage from "../../assets/images/assiette-de-sushi.jpeg";
import oceanieImage from "../../assets/images/KANGAROO_STEAK.jpeg";

function Continents() {
  return (
    <main className="continents">
      <div className="continents1">
        <div className="image-container">
          <img className="europe" src={europeImage} alt="spaguetti" />
          <h2>
            <Link to="/europe">Europe</Link>
          </h2>
        </div>
        <div className="image-container">
          <img className="afrique" src={afriqueImage} alt="bonava" />
          <h2>
            <Link to="/afrique">Afrique</Link>
          </h2>
        </div>
        <div className="image-container">
          <img className="amerique" src={ameriqueImage} alt="burger" />
          <h2>
            <Link to="/amerique">Amerique</Link>
          </h2>
        </div>
      </div>
      <div className="continents2">
        <div className="image-container">
          <img className="asie" src={asieImage} alt="sushi" />
          <h2>
            <Link to="/asie">Asie</Link>
          </h2>
        </div>
        <div className="image-container">
          <img className="oceanie" src={oceanieImage} alt="kangaroo" />
          <h2>
            <Link to="/oceanie">Oceanie</Link>
          </h2>
        </div>
      </div>
    </main>
  );
}

export default Continents;
