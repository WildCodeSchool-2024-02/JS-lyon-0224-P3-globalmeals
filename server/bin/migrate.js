// Charger les variables d'environnement depuis le fichier .env
require("dotenv").config();

const fs = require("node:fs"); // Importation du module fs pour manipuler les fichiers.
const path = require("node:path"); // Importation du module path pour manipuler les chemins de fichiers.

// Construire le chemin vers le fichier SQL de schéma
const schema = path.join(__dirname, "..", "database", "schema.sql");

// Obtenir les détails de la connexion à la base de données depuis les variables d'environnement
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Importation du module mysql2/promise pour gérer les connexions à la base de données MySQL avec des promesses.
const mysql = require("mysql2/promise");

const migrate = async () => {
  try {
    // Lire les instructions SQL à partir du fichier de schéma
    const sql = fs.readFileSync(schema, "utf8");

    // Créer une connexion spécifique à la base de données
    const database = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true, // Autoriser plusieurs instructions SQL dans une seule requête
    });

    // Supprimer la base de données existante si elle existe
    await database.query(`drop database if exists ${DB_NAME}`);

    // Créer une nouvelle base de données avec le nom spécifié
    await database.query(`create database ${DB_NAME}`);

    // Basculer vers la base de données nouvellement créée
    await database.query(`use ${DB_NAME}`);

    // Exécuter les instructions SQL pour mettre à jour le schéma de la base de données
    await database.query(sql);

    // Fermer la connexion à la base de données
    database.end();

    console.info(`${DB_NAME} updated from '${path.normalize(schema)}' 🆙`);
  } catch (err) {
    // En cas d'erreur, afficher un message d'erreur détaillé
    console.error("Error updating the database:", err.message, err.stack);
  }
};

// Exécuter la fonction de migration
migrate();
