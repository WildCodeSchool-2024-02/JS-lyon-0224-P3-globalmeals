import { useState } from "react";
import "./connexion.css";

function Connexion() {
  const [connexion, setConnexion] = useState(false)

  const handlClick = () => {
    setConnexion(!connexion)
  }
  return (
    <div>
      <form className="form">
        <h1>Connexion</h1>

        <label className="inscritoi" htmlFor="pseudo"><p>Pseudo</p>
          <input id="pseudo" placeholder="Pseudo" type="text" />
        </label>

        <label className="adresse" htmlFor="mail"><p>Adresse mail</p>
          <input id="mail" placeholder="Adresse mail" type="text" />
        </label>

        <label className="mot" htmlFor="passe"><p>Mot de passe</p>
          <input id="passe" placeholder="Mot de passe" type="text" />
        </label>

        <button type="button"  className="validate" onClick={handlClick}>
         Suivant
        </button>
      </form>
    </div>
  );
}

export default Connexion;
