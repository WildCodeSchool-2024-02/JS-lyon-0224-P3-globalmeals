const express = require("express");
const { handleFormSubmission } = require("../../../controllers/adminAction");

const router = express.Router();

router.use(express.json());

router.post("/submit-form", handleFormSubmission);

module.exports = router;
