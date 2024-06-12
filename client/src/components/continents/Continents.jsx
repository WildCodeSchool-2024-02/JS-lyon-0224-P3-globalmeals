import "./Continents.css";
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
            <a href="d">Europe</a>
          </h2>
        </div>
        <div className="image-container">
          <img className="afrique" src={afriqueImage} alt="bonava" />
          <h2>
            <a href="d">Afrique</a>
          </h2>
        </div>
        <div className="image-container">
          <img className="amerique" src={ameriqueImage} alt="burger" />
          <h2>
            <a href="d">Amerique</a>
          </h2>
        </div>
      </div>
      <div className="continents2">
        <div className="image-container">
          <img className="asie" src={asieImage} alt="sushi" />
          <h2>
            <a href="d">Asie</a>
          </h2>
        </div>
        <div className="image-container">
          <img className="oceanie" src={oceanieImage} alt="kangaroo" />
          <h2>
            <a href="d">Oceanie</a>
          </h2>
        </div>
      </div>
    </main>
  );
}

export default Continents;
