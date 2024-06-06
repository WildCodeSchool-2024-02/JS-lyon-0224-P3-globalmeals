const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const menuRouter = require("./menu/router");

router.use("/menu", menuRouter);

/* ************************************************************************* */

module.exports = router;
