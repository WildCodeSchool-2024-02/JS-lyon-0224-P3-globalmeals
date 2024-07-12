const AbstractRepository = require("./AbstractRepository");

class MenuRepository extends AbstractRepository {
  constructor() {
    // Appeler le constructeur de la classe parente (AbstractRepository)
    // et passer le nom de la table "menu" en configuration
    super({ table: "menu" });
  }

  // La création (Create) - opération CRUD
  async create(menu) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (continent, country) VALUES (?, ?)`,
      [menu.continent, menu.country]
    );

    return result.insertId;
  }

  // La mise à jour (Update) - opération CRUD
  async update(menu) {
    const id = parseInt(menu.id, 10);
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET country = ? WHERE id = ?`,
      [menu.country, id]
    );

    return result;
  }

  // Lire tous les enregistrements (Read All)
  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async readByContinent(continent) {
    // Execute the SQL SELECT query to retrieve all rows from the "rows" table
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE continent = ?`,
      [continent]
    );

    // Return the array of rows
    return rows;
  }
}

module.exports = MenuRepository;
