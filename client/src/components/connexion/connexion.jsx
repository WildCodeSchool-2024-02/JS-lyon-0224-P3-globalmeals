import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../contexts/UserContext";
import "./connexion.css";

function Login() {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const notifySuccess = (text) => toast.success(text);
  const notifyFail = (text) => toast.error(text);
  const navigate = useNavigate();

  const { login } = useUserContext();

  const [loginInfos, setLoginInfos] = useState({
    mail: "",
    password: "",
  });

  const handleLoginInfos = (e) => {
    setLoginInfos({ ...loginInfos, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginInfos.mail.trim() === "" || loginInfos.password.trim() === "") {
      console.error("Mail and password must be non-empty strings");
      return;
    }

    try {
      // Appel à l'API pour demander une connexion
      const response = await fetch(`${ApiUrl}/auth/connexion`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // envoyer / recevoir le cookie à chaque requête
        body: JSON.stringify(loginInfos),
      });
    
      if (response.status === 200) {
        const responseData = await response.json();
        console.info("API response:", responseData);
        if (responseData.user) {
          login(responseData.user);
          if (loginInfos.pseudo === "admin") {
            navigate("/admin");
            notifySuccess(`Bienvenue`);
          } else {
            navigate("/");
            notifySuccess(`Bienvenue`);
          }
        } else {
          console.error("User object is missing in the response");
        }
      } else {
        console.info("Login failed with status:", response.status);
        notifyFail("Une erreur s'est produite");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <div className="form-group1">
          <label htmlFor="mail">Adresse mail</label>
          <input
            type="mail"
            name="mail"
            value={loginInfos.mail}
            onChange={handleLoginInfos}
          />
        </div>
        <div className="form-group2">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={loginInfos.password}
            onChange={handleLoginInfos}
          />
        </div>
        <div className="back-home">
          <button type="submit" className="validate" onClick={handleLogin}>
            Se connecter
          </button>
        </div>
      </form>
      <Link to="/inscription" className="create">
        <p>Créez un compte</p>{" "}
      </Link>
    </div>
  );
}

export default Login;
