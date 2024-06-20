const express = require("express");
const { handleFormSubmission } = require("../../../controllers/adminAction");

const router = express.Router();

router.post("/menu", handleFormSubmission);

module.exports = router;
