import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./connexion.css";

function Connexion() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ApiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${ApiUrl}/auth/connexion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        navigate("/"); // Rediriger vers la page d'accueil
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

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group1">
          <label className="email" htmlFor="email">E-mail</label>
          <input
            id="mail2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Entrez votre mail"
          />
        </div>

        <div className="form-group2">
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

        <button className="validate" type="submit">
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
