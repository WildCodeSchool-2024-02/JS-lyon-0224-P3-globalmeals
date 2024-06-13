/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import "./connexion.css";

function Connexion() {
  return (
    <div>
      <form className="form">
        <h1>Connexion</h1>

        <label className="inscritoi">
          <input id="pseudo" placeholder="Pseudo" type="text" />
        </label>

        <label className="adresse">
          <input id="mail" placeholder="Adresse mail" type="text" />
        </label>

        <label className="mot">
          <input id="passe" placeholder="Mot de passe" type="text" />
        </label>

        <button className="validate">
          <p className="suivant">Suivant</p>
        </button>
      </form>
    </div>
  );
}

export default Connexion;
