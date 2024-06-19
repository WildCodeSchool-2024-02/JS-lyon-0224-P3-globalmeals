const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const menuRouter = require("./menu/router");
const recipeRouter = require("./recipe/router");

router.use("/menu", menuRouter);
router.use("/recipe", recipeRouter);

/* ************************************************************************* */

module.exports = router;
