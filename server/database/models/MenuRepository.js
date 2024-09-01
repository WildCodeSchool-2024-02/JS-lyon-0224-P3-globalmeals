const AbstractRepository = require("./AbstractRepository");

class MenuRepository extends AbstractRepository {
  constructor() {
    // Appeler le constructeur de la classe parente (AbstractRepository)
    // et passer le nom de la table "menu" en configuration
    super({ table: "menu" });
  }

  // La création (Create) - opération CRUD
  async create(menu) {
    // Insérer un nouveau menu dans la table "menu"
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (continent, country) VALUES (?, ?)`,
      [menu.continent, menu.country] // Passer les valeurs du menu (continent et pays)
    );

    return result.insertId; // Retourner l'ID du menu inséré
  }

  // La mise à jour (Update) - opération CRUD
  async update(menu) {
    const id = parseInt(menu.id, 10); // Convertir l'ID en entier pour éviter les erreurs
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET country = ? WHERE id = ?`,
      [menu.country, id] // Mettre à jour le pays pour le menu spécifié par son ID
    );

    return result; // Retourner le résultat de la mise à jour
  }

  // Lire tous les enregistrements (Read All)
  async readAll() {
    // Exécuter une requête SQL SELECT pour récupérer tous les enregistrements de la table "menu"
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows; // Retourner les lignes récupérées
  }

  async readByContinent(continent) {
    // Exécuter une requête SQL SELECT pour récupérer les menus par continent
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE continent = ?`,
      [continent] // Passer le nom du continent comme paramètre
    );

    // Retourner le tableau de menus correspondant au continent spécifié
    return rows;
  }
}

module.exports = MenuRepository; // Exporter la classe MenuRepository pour l'utiliser dans d'autres parties de l'application
