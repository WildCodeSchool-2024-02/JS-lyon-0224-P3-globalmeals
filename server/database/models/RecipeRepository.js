const AbstractRepository = require("./AbstractRepository");

class RecipeRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "Recipe" as configuration
    super({ table: "Recipe" });
  }

  // The C of CRUD - Create operation

  async create(recipe) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, ingredient, step, type, image, menu_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [recipe.name, recipe.ingredient, recipe.step, recipe.type, recipe.image, recipe.menu_id]
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

  async readByContinent(continent) {
    // Execute the SQL SELECT query to retrieve all rows from the "rows" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table} INNER JOIN menu ON recipe.menu_id = menu.id WHERE continent = ?`,[continent]);

    // Return the array of rows
    return rows;
  }


}

module.exports = RecipeRepository;
