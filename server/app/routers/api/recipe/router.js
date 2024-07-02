const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import recipe-related actions

const { browse, add, recipesByContinent } = require(`../../../controllers/recipeAction`);
// Route to get a list of recipes
router.get("/", browse);

router.get("/recipesByContinent", recipesByContinent);

router.post("/", add);

/* ************************************************************************* */

module.exports = router;
