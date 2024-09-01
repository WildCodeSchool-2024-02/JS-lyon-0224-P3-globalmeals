// Importation des modules nécessaires d'Express et du contrôleur `adminAction`.
const express = require("express");
const { handleFormSubmission } = require("../../../controllers/adminAction");

// Création d'un routeur Express.
const router = express.Router();

// Route pour gérer la soumission de formulaires pour les menus.
router.post("/menu", handleFormSubmission);

// Route pour gérer la soumission de formulaires pour les recettes.
router.post("/recipe", handleFormSubmission);

// Exportation du routeur pour qu'il puisse être utilisé dans d'autres parties de l'application.
module.exports = router;
