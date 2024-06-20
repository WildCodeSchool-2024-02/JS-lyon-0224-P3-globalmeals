const AbstractRepository = require("./AbstractRepository");

class MenuRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "menu" as configuration
    super({ table: "menu" });
  }

  // The C of CRUD - Create operation

  async create(menu) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (continent, country) VALUES (?, ?)`,
      [menu.continent, menu.country]
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async readAllWithRecipes() {
    const query = `
      SELECT m.id AS menu_id, m.continent, m.country, r.id AS recipe_id, r.name, r.ingredient, r.step, r.step_time, r.type
      FROM ${this.table} as m
      INNER JOIN menu_recipe mr ON m.id = mr.menu_id
      INNER JOIN recipe r ON mr.recipe_id = r.id;
    `;

    const [rows] = await this.database.query(query);

    return rows;
  }
}

module.exports = MenuRepository;
