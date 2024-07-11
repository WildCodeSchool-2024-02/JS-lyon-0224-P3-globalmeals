// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const menu = await tables.menu.readAll();

    // Respond with the items in JSON format
    res.json(menu);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add = async (req, res, next) => {
  // Extract the item data from the request body
  const formData = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.menu.create(formData);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the item data from the request body
  const menu = req.body;

  try {
    // Update the item into the database
    const updatedMenu = await tables.menu.update(menu);

    // Respond with HTTP 201 (OK) and the response data
    res.status(200).json({ updatedMenu });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  add,
  edit,
};
