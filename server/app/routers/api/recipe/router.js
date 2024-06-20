const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import recipe-related actions

const { browse } = require(`../../../controllers/recipeAction`);
// Route to get a list of recipes
router.get("/", browse);


/* ************************************************************************* */

module.exports = router;
