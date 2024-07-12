import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./inscription.css";

function Inscription() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ApiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${ApiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        navigate("/connexion"); // Rediriger vers la page connexion
      } else {
        // Vous pouvez gérer la réponse en cas d'erreur si nécessaire
      }
    } catch (error) {
      // Vous pouvez gérer l'erreur si nécessaire
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Entrez votre pseudo"
          />
        </div>
        <div className="form-group1">
          <label className="mail" htmlFor="mail">E-mail</label>
          <input
            id="mail2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre mail"
            required
          />
        </div>
        <div className="form-group2">
          <label className="confirm-mail" htmlFor="confirm-email">Confirmez votre e-mail</label>
          <input
            id="confirm-mail2"
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="Confirmez votre e-mail"
            required
          />
        </div>
        <div className="form-group3">
          <label className="mot-de-passe" htmlFor="mot-de-passe">Mot de passe</label>
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
        </div>
        <div className="form-group4">
          <label className="confirm-mot-de-passe" htmlFor="confirm-mot-de-passe">Confirmez votre mot de passe</label>
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
        </div>
        <button className="validate" type="submit">
          Suivant
        </button>
        {isSubmitted && <p>Inscription soumise avec succès !</p>}
      </form>
    </div>
  );
}

export default Inscription;
