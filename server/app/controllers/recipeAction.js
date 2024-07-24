// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all recipes from the database
    const recipe = await tables.recipe.readAll();

    // Respond with the recipes in JSON format
    res.json(recipe);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const recipesByContinent = async (req, res, next) => {
  try {
    // Fetch all recipes from the database
    const recipe = await tables.recipe.readByContinent(req.query.continent);

    // Respond with the recipes in JSON format
    res.json(recipe);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit = async (req, res, next) => {
  const recipe = req.body;

  try {
    const updatedRecipe = await tables.recipe.update(recipe);
    res.status(200).json({ updatedRecipe });
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  // Extract the item data from the request body
  const formData = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.recipe.create(formData);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
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
  recipesByContinent,
};
