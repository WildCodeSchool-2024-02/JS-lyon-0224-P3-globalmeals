import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./connexion.css";

function Connexion() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state) {
      setMail(location.state.mail || "");
      setPassword(location.state.password || "");
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (mail.length <= 4) validationErrors.mail = "Le mail est requis*";
    if (password.length < 6) validationErrors.password = "Le mot de passe doit contenir au moins 7 caractères*";

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
      navigate("/"); // Rediriger vers la page d'accueil
    } else {
      setErrors(validationErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group1">
          <label className="mail" htmlFor="mail">Mail</label>
          <input
            id="mail2"
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}"
            required
            placeholder="Entrez votre mail"
          />
          {errors.mail && <p className="error1">{errors.mail}</p>}
        </div>

        <div className="form-group2">
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

        <button
          className="validate"
          type="submit"
          disabled={mail.length <= 4 || password.length <= 6}
        >
          Suivant
        </button>
        {isSubmitted && <p>Connexion soumise avec succès !</p>}
      </form>
      <Link to="/inscription" className="create">
        <p>Créez un compte</p>
      </Link>
    </div>
  );
}

export default Connexion;
