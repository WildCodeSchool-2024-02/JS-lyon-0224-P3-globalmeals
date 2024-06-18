const express = require("express");

const router = express.Router();

// Define a route to fetch menus with their recipes
const { browse, getMenusWithRecipes } = require(`../../../controllers/menuAction`);
// Route to get a list of items
router.get("/", browse);

router.get("/menus-recipes", getMenusWithRecipes)

module.exports = router;
