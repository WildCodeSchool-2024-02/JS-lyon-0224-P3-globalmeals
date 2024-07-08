import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./inscription.css";

function Inscription() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (pseudo.length <= 4) validationErrors.pseudo = "Le pseudo est requis*";
    if (email.length <= 4) validationErrors.email = "L'e-mail est requis*";
    if (confirmEmail.length <= 4) validationErrors.confirmEmail = "L'e-mail est requis*";
    if (password.length < 6) validationErrors.password = "Le mot de passe doit contenir au moins 7 caractères*";
    if (confirmPassword.length < 6) validationErrors.confirmPassword = "Le mot de passe doit contenir au moins 7 caractères*";
    if (email !== confirmEmail) validationErrors.confirmEmail = "Les mails ne correspondent pas*";
    if (password !== confirmPassword) validationErrors.confirmPassword = "Les mots de passe ne correspondent pas*";

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
      navigate("/connexion", { state: { email, password } });
    } else {
      setErrors(validationErrors);
    }
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
          <label className="pseudo" htmlFor="pseudo">Pseudo</label>
          <input
            id="pseudo2"
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Entrez votre pseudo"
          />
          {errors.pseudo && <p className="error1">{errors.pseudo}</p>}
        </div>
        <div className="form-group1">
          <label className="mail" htmlFor="mail">Mail</label>
          <input
            id="mail2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}"
            placeholder="Entrez votre mail"
            required
          />
          {errors.email && <p className="error1">{errors.email}</p>}
        </div>
        <div className="form-group2">
          <label className="confirm-mail" htmlFor="confirm-email">Confirmez votre mail</label>
          <input
            id="confirm-mail2"
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}"
            placeholder="Confirmez votre e-mail"
            required
          />
          {errors.confirmEmail && <p className="error1">{errors.confirmEmail}</p>}
        </div>
        <div className="form-group3">
          <label className="mot-de-passe" htmlFor="mot-de-passo">Mot de passe</label>
          <div className="password-input">
            <input
              id="mot2"
              type={showPassword ? "text" : "password"}
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
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && <p className="error2">{errors.password}</p>}
        </div>
        <div className="form-group4">
          <label className="confirm-mot-de-pas" htmlFor="confirm-mot-de-passa">Confirmez votre mot de passe</label>
          <div className="password-input2">
            <input
              id="confirm-mot2"
              type={showPassword2 ? "text" : "password"}
              placeholder="Confirmez votre mot de passe"
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
              {showPassword2 ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.confirmPassword && <p className="error2">{errors.confirmPassword}</p>}
        </div>
        <button
          className="validate"
          type="submit"
        >
          Suivant
        </button>
        {isSubmitted && <p>Inscription soumise avec succès !</p>}
      </form>
    </div>
  );
}

export default Inscription;
