const express = require("express");

const router = express.Router();

// Define a route to fetch menus with their recipes
const { browse, add, edit, read } = require(`../../../controllers/menuAction`);
// Route to get a list of items
router.get("/", browse);
router.get("/read", read);

// router.get("/menus-recipes", getMenusWithRecipes);

router.post("/", add);

// Route to add a new item
router.patch("/", edit);

module.exports = router;
