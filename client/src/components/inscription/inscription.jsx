import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./inscription.css";

function Register() {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const notifySuccess = (text) => toast.success(text);
  const notifyFail = (text) => toast.error(text);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    mail: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleRegisterForm = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    try {
      // Appel à l'API pour créer un nouvel utilisateur
      const response = await fetch(`${ApiUrl}/auth/register`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 201) {
        notifySuccess(
          "Votre profil a bien été créé. Vous pouvez vous connecter"
        );
        setTimeout(() => {
          navigate("/connexion");
        }, 2000); // Attendre 2 secondes avant de rediriger
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
        notifyFail("Une erreur s'est produite");
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className="form-container">
      <div className="form-group1">
        <label htmlFor="username">Pseudo</label>
        <input
          type="text"
          name="username"
          className="nes-input"
          value={registerForm.username}
          onChange={handleRegisterForm}
        />
      </div>
      <div className="form-group2">
        <label htmlFor="mail">Adresse mail</label>
        <input
          type="mail"
          name="mail"
          className="nes-input"
          value={registerForm.mail}
          onChange={handleRegisterForm}
        />
      </div>

      <div className="form-group3">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          className="nes-input"
          value={registerForm.password}
          onChange={handleRegisterForm}
        />
      </div>
      <div className="form-group4">
        <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
        <input
          type="password"
          name="confirmPassword"
          className="nes-input"
          value={registerForm.confirmPassword}
          onChange={handleRegisterForm}
        />
      </div>
      <button type="submit" className="validate2">
        S'enregistrer
      </button>
    </form>
  );
}

export default Register;
