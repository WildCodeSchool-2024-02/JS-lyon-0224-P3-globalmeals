const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const menuRouter = require("./menu/router");
const recipeRouter = require("./recipe/router");

router.use("/menu", menuRouter);
router.use("/recipe", recipeRouter);

const adminRouter = require("./admin/router");

router.use("/admin", adminRouter);

/* ************************************************************************* */

module.exports = router;
