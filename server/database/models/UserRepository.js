const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Appeler le constructeur de la classe parente (AbstractRepository)
    // et passer le nom de la table "user" en configuration
    super({ table: "user" });
  }

  // La création (Create) - opération CRUD
  async create(user) {
    const adminEmail = process.env.ADMIN_EMAIL; // Récupérer l'adresse e-mail de l'administrateur depuis les variables d'environnement
    const role = user.mail === adminEmail ? "admin" : "user"; // Déterminer le rôle (admin ou user) en fonction de l'e-mail

    // Exécuter la requête SQL INSERT pour ajouter un nouvel utilisateur dans la table "user"
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (username, mail, password, role) VALUES (?, ?, ?, ?)`,
      [user.username, user.mail, user.hashedPassword, role] // Passer les valeurs (nom d'utilisateur, e-mail, mot de passe haché, rôle)
    );

    // Retourner l'ID du nouvel utilisateur inséré
    return result.insertId;
  }

  // Lecture de tous les enregistrements (Read All) - opération CRUD
  async readAll() {
    // Exécuter une requête SQL SELECT pour récupérer tous les utilisateurs de la table "user"
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Retourner le tableau des utilisateurs
    return rows;
  }

  // Lecture d'un utilisateur par e-mail avec le mot de passe (Read By Email) - opération CRUD
  async readByEmailWithPassword(email) {
    // Exécuter une requête SQL SELECT pour récupérer un utilisateur par e-mail
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE mail = ?`,
      [email] // Passer l'e-mail comme paramètre
    );

    // Retourner la première ligne si trouvée, sinon retourner null
    return rows.length > 0 ? rows[0] : null;
  }
}

module.exports = UserRepository; // Exporter la classe UserRepository pour l'utiliser dans d'autres parties de l'application
