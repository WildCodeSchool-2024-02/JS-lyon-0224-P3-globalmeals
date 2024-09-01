// Importation des hooks useState et useNavigate, ainsi que de la bibliothèque toast pour les notifications.
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./inscription.css"; // Importation du fichier CSS pour styliser le formulaire d'inscription.

function Register() {
  // Récupération de l'URL de l'API depuis les variables d'environnement.
  const ApiUrl = import.meta.env.VITE_API_URL;

  // Fonction pour afficher une notification de succès.
  const notifySuccess = (text) => toast.success(text);

  // Fonction pour afficher une notification d'échec.
  const notifyFail = (text) => toast.error(text);

  // État local pour stocker les informations du formulaire d'inscription.
  const [registerForm, setRegisterForm] = useState({
    username: "",
    mail: "",
    password: "",
    confirmPassword: "",
  });

  // Hook pour naviguer vers une autre page après l'inscription réussie.
  const navigate = useNavigate();

  // Gestionnaire pour mettre à jour les informations du formulaire à chaque changement dans les champs.
  const handleRegisterForm = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  // Gestionnaire pour soumettre le formulaire d'inscription.
  const handleSubmitForm = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page à la soumission du formulaire.

    try {
      // Appel à l'API pour créer un nouvel utilisateur avec les informations du formulaire.
      const response = await fetch(`${ApiUrl}/auth/register`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm), // Envoi des informations sous forme de JSON.
      });

      // Si la réponse de l'API indique une création réussie (status 201), on continue.
      if (response.status === 201) {
        notifySuccess(
          "Votre profil a bien été créé. Vous pouvez vous connecter"
        ); // Notification de succès à l'utilisateur.

        // Redirige vers la page de connexion après 2 secondes pour donner le temps de lire le message.
        setTimeout(() => {
          navigate("/connexion");
        }, 2000);
      } else {
        // Si la création échoue, affiche une notification d'échec.
        console.info(response);
        notifyFail("Une erreur s'est produite");
      }
    } catch (err) {
      // Capture et log les erreurs éventuelles survenues durant le processus d'inscription.
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className="form-container">
      {/* Champ pour entrer le pseudo */}
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

      {/* Champ pour entrer l'adresse mail */}
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

      {/* Champ pour entrer le mot de passe */}
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

      {/* Champ pour confirmer le mot de passe */}
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

      {/* Bouton pour soumettre le formulaire */}
      <button type="submit" className="validate2">
        S'enregistrer
      </button>
    </form>
  );
}

export default Register;
