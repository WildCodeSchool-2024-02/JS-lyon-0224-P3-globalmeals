import { useState } from "react";
import { Link } from "react-router-dom";

import "./connexion.css";

function Connexion() {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group1">
          <label className="pseudo" htmlFor="pseudo">
            Pseudo
          </label>
          <input
            id="pseu2"
            type="text"
            placeholder="Entrez votre pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />

          {pseudo.length <= 4 && (
            <p className="error1">
              Le pseudo doit contenir au moins 5 caractères*
            </p>
          )}
        </div>

        <div className="form-group2">
          <label className="mot-de-passe" htmlFor="mot-de-passo">
            {" "}
            Mot de passe
          </label>
          <div className="password-input">
            <input
              id="mot2"
              type={showPassword === true ? "text" : "password"}
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword === true ? "🙈" : "👁️"}
            </button>
          </div>
          {password.length < 6 && (
            <p className="error2">
              Le mot de passe doit contenir au moins 7 caractères*
            </p>
          )}
        </div>

        <Link className="back-home" to="/">
          <button
            className="validate"
            type="submit"
            disabled={pseudo.length <= 4 || password.length <= 6}
          >
            Suivant
          </button>
        </Link>
        {isSubmitted && <p>Connexion soumise avec succès !</p>}
      </form>
      <Link to="/inscription" className="create">
        <p>Créez un compte</p>
      </Link>
    </div>
  );
}

export default Connexion;