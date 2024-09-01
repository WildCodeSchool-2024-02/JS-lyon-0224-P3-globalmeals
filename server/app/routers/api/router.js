// Importation du module Express.
const express = require("express");

// Création d'une instance de routeur Express.
const router = express.Router();

/* ************************************************************************* */
// Importation et utilisation des sous-routeurs ici
/* ************************************************************************* */

// Importation des routeurs spécifiques pour les menus, les recettes, l'administration et l'authentification.
const menuRouter = require("./menu/router");
const recipeRouter = require("./recipe/router");
const adminRouter = require("./admin/router");
const authRouter = require("./auth/router");

// Utilisation du routeur pour les routes liées aux menus.
// Les requêtes à l'URL "/menu" seront dirigées vers le routeur `menuRouter`.
router.use("/menu", menuRouter);

// Utilisation du routeur pour les routes liées aux recettes.
// Les requêtes à l'URL "/recipe" seront dirigées vers le routeur `recipeRouter`.
router.use("/recipe", recipeRouter);

// Utilisation du routeur pour les routes liées à l'administration.
// Les requêtes à l'URL "/admin" seront dirigées vers le routeur `adminRouter`.
router.use("/admin", adminRouter);

// Utilisation du routeur pour les routes liées à l'authentification.
// Les requêtes à l'URL "/auth" seront dirigées vers le routeur `authRouter`.
router.use("/auth", authRouter);

/* ************************************************************************* */

// Exportation du routeur principal pour qu'il puisse être utilisé dans l'application principale.
module.exports = router;
