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
}

module.exports = MenuRepository;
