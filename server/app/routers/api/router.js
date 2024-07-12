const express = require("express");

const router = express.Router();



/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const menuRouter = require("./menu/router");
const recipeRouter = require("./recipe/router");
const adminRouter = require("./admin/router");
const authRouter = require("./auth/router");


router.use("/menu", menuRouter);
router.use("/recipe", recipeRouter);
router.use("/admin", adminRouter);
router.use("/auth", authRouter);



/* ************************************************************************* */

module.exports = router;
