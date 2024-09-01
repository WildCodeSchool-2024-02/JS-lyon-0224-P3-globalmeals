// Importation du module Express.
const express = require("express");

// Création d'une instance de routeur Express.
const router = express.Router();

/* ************************************************************************* */
// Définition des routes API pour la gestion des recettes
/* ************************************************************************* */

// Importation des actions liées aux recettes depuis le contrôleur `recipeAction`.
const { browse, add, recipesByContinent, edit } = require(
  `../../../controllers/recipeAction`
);

// Route pour récupérer la liste complète des recettes.
router.get("/", browse);

// Route pour récupérer les recettes en fonction d'un continent spécifique.
router.get("/recipesByContinent", recipesByContinent);

// Route pour ajouter une nouvelle recette.
router.post("/", add);

// Route pour modifier une recette existante.
router.patch("/", edit);

/* ************************************************************************* */

// Exportation du routeur pour qu'il puisse être utilisé dans d'autres parties de l'application.
module.exports = router;
