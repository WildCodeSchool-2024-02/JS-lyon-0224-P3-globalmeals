// Importation du module Express.
const express = require("express");

// Création d'une instance de routeur Express.
const router = express.Router();

// Importation des actions liées aux menus depuis le contrôleur `menuAction`.
const { browse, add, edit, read } = require("../../../controllers/menuAction");

// Définition des routes pour l'API des menus.

// Route pour récupérer la liste complète des menus.
router.get("/", browse);

// Route pour lire un menu spécifique en fonction d'un critère, comme le continent.
router.get("/read", read);

// (Commenté) Route prévue pour récupérer les menus avec leurs recettes associées.
// Peut être activée en décommentant la ligne ci-dessous et en implémentant la fonction correspondante dans le contrôleur.
// router.get("/menus-recipes", getMenusWithRecipes);

// Route pour ajouter un nouveau menu.
router.post("/", add);

// Route pour modifier un menu existant.
router.patch("/", edit);

// Exportation du routeur pour qu'il puisse être utilisé dans d'autres parties de l'application.
module.exports = router;
