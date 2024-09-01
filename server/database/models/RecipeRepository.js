const AbstractRepository = require("./AbstractRepository");

class RecipeRepository extends AbstractRepository {
  constructor() {
    // Appeler le constructeur de la classe parente (AbstractRepository)
    // et passer le nom de la table "Recipe" en configuration
    super({ table: "Recipe" });
  }

  // La création (Create) - opération CRUD
  async create(recipe) {
    // Insérer une nouvelle recette dans la table "Recipe"
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, ingredient, step, step_time, type, image, menu_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        recipe.name, // Nom de la recette
        recipe.ingredient, // Ingrédients de la recette
        recipe.step, // Étapes de préparation de la recette
        recipe.step_time, // Temps nécessaire pour chaque étape
        recipe.type, // Type de recette (entrée, plat, dessert, etc.)
        recipe.image, // Image de la recette
        recipe.menu_id, // ID du menu associé à la recette
      ]
    );

    // Retourner l'ID de la nouvelle recette insérée
    return result.insertId;
  }

  // La mise à jour (Update) - opération CRUD
  async update(recipe) {
    // Mettre à jour une recette existante dans la table "Recipe"
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, ingredient = ?, step = ?, step_time = ?, type = ?, image = ?, menu_id = ? WHERE type = ? AND menu_id = ?`,
      [
        recipe.name, // Mettre à jour le nom de la recette
        recipe.ingredient, // Mettre à jour les ingrédients
        recipe.step, // Mettre à jour les étapes de préparation
        recipe.step_time, // Mettre à jour le temps de préparation
        recipe.type, // Mettre à jour le type de recette
        recipe.image, // Mettre à jour l'image de la recette
        recipe.menu_id, // Mettre à jour l'ID du menu associé
        recipe.type, // Filtrer par type de recette
        recipe.menu_id, // Filtrer par ID de menu
      ]
    );

    return result; // Retourner le résultat de la mise à jour
  }

  // Lecture de tous les enregistrements (Read All)
  async readAll() {
    // Exécuter une requête SQL SELECT pour récupérer toutes les recettes de la table "Recipe"
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Retourner le tableau des recettes
    return rows;
  }

  // Lecture des recettes par continent
  async readByContinent(continent) {
    // Exécuter une requête SQL SELECT pour récupérer toutes les recettes d'un continent spécifique
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} INNER JOIN menu ON recipe.menu_id = menu.id WHERE continent = ?`,
      [continent] // Passer le nom du continent comme paramètre
    );

    // Retourner le tableau des recettes correspondant au continent spécifié
    return rows;
  }
}

module.exports = RecipeRepository; // Exporter la classe RecipeRepository pour l'utiliser dans d'autres parties de l'application
