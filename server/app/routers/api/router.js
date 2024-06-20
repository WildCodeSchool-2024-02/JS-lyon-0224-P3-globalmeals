const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const menuRouter = require("./menu/router");

router.use("/menu", menuRouter);

const adminRouter = require("./admin/router");

router.use("/admin", adminRouter);

/* ************************************************************************* */

module.exports = router;
