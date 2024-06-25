const AbstractRepository = require("./AbstractRepository");

class RecipeRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "Recipe" as configuration
    super({ table: "Recipe" });
  }

  // The C of CRUD - Create operation

  async create(recipe) {
    // Execute the SQL INSERT query to add a new Recipe to the "rows" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, ingredient, step, step_time, type, image) VALUES (?, ?, ?, ?, ?, ?)`,
      [recipe.name, recipe.ingredient, recipe.step, recipe.step_time, recipe.type, recipe.image]
    );

    // Return the ID of the newly inserted Recipe
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async readAll() {
    // Execute the SQL SELECT query to retrieve all rows from the "rows" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Return the array of rows
    return rows;
  }
}

module.exports = RecipeRepository;
