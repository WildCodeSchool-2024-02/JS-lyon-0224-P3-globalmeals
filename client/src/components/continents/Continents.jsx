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
        <div>
          <img className="europe" src={europeImage} alt="spaguetti" />
        </div>
        <div>
          <img className="afrique" src={afriqueImage} alt="bonava" />
        </div>
        <div>
          <img className="amerique" src={ameriqueImage} alt="burger" />
        </div>
      </div>
      <div className="continents2">
        <div>
          <img className="asie" src={asieImage} alt="sushi" />
        </div>
        <div>
          <img className="oceanie" src={oceanieImage} alt="kangaroo" />
        </div>
      </div>
    </main>
  );
}

export default Continents;
