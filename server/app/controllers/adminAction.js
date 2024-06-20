const tables = require("../../database/tables");

const handleFormSubmission = async (req, res, next) => {
  // Extract the item data from the request body
  const formData = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.admin.create(formData);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  handleFormSubmission,
};
