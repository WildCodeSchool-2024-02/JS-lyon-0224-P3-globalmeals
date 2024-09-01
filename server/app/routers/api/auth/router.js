// Importation du module Express.
const express = require("express");

// Création d'une instance de routeur Express.
const router = express.Router();

/* ************************************************************************* */
// Définition des routes API ici
/* ************************************************************************* */

// Importation des actions liées à l'authentification.
const { connexion, logout } = require("../../../controllers/authActions");
const { add, read } = require("../../../controllers/userActions");

// Importation des middlewares pour hacher les mots de passe et vérifier les tokens JWT.
const {
  hashPassword, // Middleware pour hacher les mots de passe avant de les enregistrer.
  verifyToken, // Middleware pour vérifier la validité du token JWT.
} = require("../../../services/middlewares/auth");

// Route pour connecter un utilisateur.
router.post("/connexion", connexion);

// Route pour enregistrer un nouvel utilisateur avec hachage de mot de passe.
router.post("/register", hashPassword, add);

// Route pour déconnecter l'utilisateur.
router.get("/logout", logout);

// Route pour récupérer le profil utilisateur en fonction de l'ID, avec vérification du token JWT.
router.get("/:id", verifyToken, read);

/* ************************************************************************* */

// Exportation du routeur pour qu'il puisse être utilisé dans d'autres parties de l'application.
module.exports = router;
