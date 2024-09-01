/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Importer la bibliothèque Faker pour générer des données factices
const { faker } = require("@faker-js/faker");

// Importer le client de la base de données
const database = require("../client");

// Déclarer un objet pour stocker les objets créés en fonction de leurs noms de référence
const refs = {};

// Classe abstraite AbstractSeeder pour gérer les seeders de manière générique
class AbstractSeeder {
  constructor({ table, truncate = true, dependencies = [] }) {
    // Empêcher l'instanciation directe de la classe AbstractSeeder
    // thx https://www.codeheroes.fr/2017/11/08/js-classes-abstraites-et-interfaces/
    if (this.constructor === AbstractSeeder) {
      throw new TypeError(
        "Abstract class 'AbstractSeed' cannot be instantiated directly"
      );
    }

    // Initialiser les propriétés de la classe
    this.table = table; // Le nom de la table dans laquelle les données seront insérées

    this.truncate = truncate; // Option pour tronquer (vider) la table avant d'insérer les données

    this.dependencies = dependencies; // Dépendances vers d'autres seeders

    this.promises = []; // Liste des promesses pour suivre les insertions asynchrones

    this.faker = faker; // Fournir un accès à Faker pour générer des données factices
    this.refs = refs; // Références vers les objets insérés pour les utiliser dans d'autres seeders
  }

  // Méthode privée pour insérer des données dans la table
  async #doInsert(data) {
    // Extraire le nom de référence (s'il existe) et les autres valeurs
    const { refName, ...values } = data;

    // Préparer la requête SQL : "insert into <table>(<fields>) values (<placeholders>)"
    const fields = Object.keys(values).join(",");
    const placeholders = new Array(Object.keys(values).length)
      .fill("?")
      .join(",");

    const sql = `insert into ${this.table}(${fields}) values (${placeholders})`;

    // Exécuter la requête et, si applicable, stocker l'ID inséré en fonction du nom de référence
    const [result] = await database.query(sql, Object.values(values));

    if (refName != null) {
      const { insertId } = result;

      // Stocker l'ID inséré dans l'objet refs sous le nom de référence
      refs[refName] = { ...values, insertId };
    }
  }

  // Méthode pour ajouter une insertion à la liste des promesses
  insert(data) {
    this.promises.push(this.#doInsert(data));
  }

  // Méthode abstraite run() à implémenter dans les classes dérivées
  // eslint-disable-next-line class-methods-use-this
  run() {
    throw new Error("You must implement this function");
  }

  // Méthode pour récupérer une référence à un objet inséré
  // eslint-disable-next-line class-methods-use-this
  getRef(name) {
    return refs[name];
  }
}

// Exporter la classe AbstractSeeder pour qu'elle puisse être utilisée par d'autres seeders
module.exports = AbstractSeeder;
