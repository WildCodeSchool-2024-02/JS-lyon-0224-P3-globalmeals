import { useState } from "react";
import { Link } from "react-router-dom";

import "./inscription.css";

function Connexion() {
  const [pseudo, setPseudo] = useState("");
  const [mail, setMail] = useState("");
  const [confirmMail, setConfirmMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group0">
          <label className="pseudo" htmlFor="pseudo">
            Pseudo
          </label>
          <input
            id="pseudo2"
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Entrez votre pseudo"
          />

          {pseudo.length <= 4 && (
            <p className="error1">Le pseudo est requis*</p>
          )}
        </div>

        <div className="form-group1">
          <label className="mail" htmlFor="mail">
            Mail
          </label>
          <input
            id="mail2"
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}"
            required
            placeholder="Entrez votre mail"
          />

          {mail.length <= 4 && <p className="error1">Le mail est requis*</p>}
        </div>

        <div className="form-group2">
          <label className="confirm-mail" htmlFor="confirm-mail">
            Confirmez votre mail
          </label>
          <input
            id="confirm-mail2"
            type="email"
            value={confirmMail}
            onChange={(e) => setConfirmMail(e.target.value)}
            pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}"
            required
            placeholder="Confirmez votre mail"
          />

          {confirmMail.length <= 4 && (
            <p className="error1">Le mail est requis*</p>
          )}
        </div>

        <div className="form-group3">
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

        <div className="form-group4">
          <label className="confirm-mot-de-pas" htmlFor="confirm-mot-de-passa">
            {" "}
            Confirmez votre mot de passe
          </label>
          <div className="password-input2">
            <input
              id="confirm-mot2"
              type={showPassword2 === true ? "text" : "password"}
              placeholder="Confrimez votre mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility2}
            >
              {showPassword2 === true ? "🙈" : "👁️"}
            </button>
          </div>
          {confirmPassword.length < 6 && (
            <p className="error2">
              Le mot de passe doit contenir au moins 7 caractères*
            </p>
          )}
        </div>

        <Link className="back-home2" to="/connexion">
          <button
            className="validate2"
            type="submit"
            disabled={
              mail.length <= 4 ||
              password.length <= 6 ||
              confirmMail.length <= 4 ||
              confirmPassword.length <= 6
            }
          >
            Suivant
          </button>
        </Link>
        {isSubmitted === true && <p>Inscription soumise avec succès !</p>}
      </form>
    </div>
  );
}

export default Connexion;
