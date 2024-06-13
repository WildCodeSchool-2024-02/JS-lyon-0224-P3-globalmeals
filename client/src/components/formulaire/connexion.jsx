import "./connexion.css";

function Connexion() {
  return (
    <div>
      <form className="form">
        <h1>Connexion</h1>

        <label className="inscritoi" htmlFor="pseudo">Pseudo
          <input id="pseudo" placeholder="Pseudo" type="text" />
        </label>

        <label className="adresse" htmlFor="mail">Adresse mail
          <input id="mail" placeholder="Adresse mail" type="text" />
        </label>

        <label className="mot" htmlFor="passe">Mot de passe
          <input id="passe" placeholder="Mot de passe" type="text" />
        </label>

        <button type="button" className="validate">
          <p className="suivant">Suivant</p>
        </button>
      </form>
    </div>
  );
}

export default Connexion;
