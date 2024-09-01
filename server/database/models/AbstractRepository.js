// Importation du client de base de données
const database = require("../client");

// Classe abstraite AbstractRepository pour fournir un accès à la base de données
class AbstractRepository {
  constructor({ table }) {
    // Empêcher l'instanciation directe de la classe AbstractRepository
    // thx https://www.codeheroes.fr/2017/11/08/js-classes-abstraites-et-interfaces/
    if (this.constructor === AbstractRepository) {
      throw new TypeError(
        "Abstract class 'AbstractRepository' cannot be instantiated directly"
      );
    }

    // Stocker le nom de la table
    this.table = table;

    // Fournir un accès au client de base de données
    this.database = database;
  }
}

// Prêt à être exporté
module.exports = AbstractRepository;
