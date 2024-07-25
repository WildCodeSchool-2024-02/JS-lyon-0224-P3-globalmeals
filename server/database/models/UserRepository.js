const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "Recipe" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {

    const adminEmail = process.env.ADMIN_EMAIL; 
    const role = user.mail === adminEmail ? "admin" : "user";

    // Execute the SQL INSERT query to add a new Recipe to the "rows" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (username, mail, password, role) VALUES (?, ?, ?, ?)`,
      [user.username, user.mail, user.hashedPassword, role]
    );

    // Return the ID of the newly inserted Recipe
    return result.insertId;
  }

  // The Read method - R from CRUD (all users)
  async readAll() {
    // Execute the SQL SELECT query to retrieve all the rows in the "user" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    //  Return the table of rows
    return rows;
  }

  // Read method - CRUD R (user by ID)
  async readByEmailWithPassword(email) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE mail = ?`,
      [email]
    );

    // Return the first line if found, otherwise null
    return rows.length > 0 ? rows[0] : null;
  }
}

module.exports = UserRepository;
