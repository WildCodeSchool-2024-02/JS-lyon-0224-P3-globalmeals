const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "Recipe" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new Recipe to the "rows" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (username, mail, password) VALUES (?, ?, ?)`,
      [user.username, user.mail, user.hashedPassword]
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

  // The update method - CRUD U
  async update(id, updatedFields) {
    // Build the update SQL query
    const fields = Object.keys(updatedFields)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = Object.values(updatedFields);
    values.push(id);

    await this.database.query(
      `UPDATE ${this.table} SET ${fields} WHERE id = ?`,
      values
    );

    return this.readById(id); // Return the updated user
  }

  // The Delete method - CRUD D
  async delete(id) {
    await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);

    return true; // Return true to indicate that the user has been deleted
  }
}

module.exports = UserRepository;
