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

const getMenusWithRecipes = async (req, res) => {
  try {
    const menusWithRecipes = await tables.menu.readAllWithRecipes();
    res.json(menusWithRecipes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menus with recipes" });
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  getMenusWithRecipes
};
