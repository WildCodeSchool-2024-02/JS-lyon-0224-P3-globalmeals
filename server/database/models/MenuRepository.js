const AbstractRepository = require("./AbstractRepository");

class MenuRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "menu" as configuration
    super({ table: "menu" });
  }

  // The C of CRUD - Create operation

  async create(menu) {
    // Execute the SQL INSERT query to add a new menu to the "rows" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [menu.title, menu.user_id]
    );

    // Return the ID of the newly inserted menu
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async readAll() {
    // Execute the SQL SELECT query to retrieve all rows from the "rows" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of rows
    return rows;
  }
}

module.exports = MenuRepository;
