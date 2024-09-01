// Importation de l'accès aux tables de la base de données.
const tables = require("../../database/tables");

// Opération BREAD : Browse (Read All) - Lecture de toutes les recettes.
const browse = async (req, res, next) => {
  try {
    // Récupération de toutes les recettes de la table `recipe`.
    const recipe = await tables.recipe.readAll();

    // Réponse avec les recettes sous forme de JSON.
    res.json(recipe);
  } catch (err) {
    // En cas d'erreur, transmet l'erreur au middleware de gestion des erreurs.
    next(err);
  }
};

// Opération pour récupérer les recettes par continent.
const recipesByContinent = async (req, res, next) => {
  try {
    // Récupération de toutes les recettes pour un continent spécifique.
    const recipe = await tables.recipe.readByContinent(req.query.continent);

    // Réponse avec les recettes sous forme de JSON.
    res.json(recipe);
  } catch (err) {
    // En cas d'erreur, transmet l'erreur au middleware de gestion des erreurs.
    next(err);
  }
};

// Opération BREAD : Edit (Update) - Mise à jour d'une recette.
const edit = async (req, res, next) => {
  // Extraction des données de la recette à mettre à jour depuis le corps de la requête.
  const recipe = req.body;

  try {
    // Mise à jour de la recette dans la table `recipe`.
    const updatedRecipe = await tables.recipe.update(recipe);

    // Réponse avec le statut HTTP 200 (OK) et les données mises à jour.
    res.status(200).json({ updatedRecipe });
  } catch (err) {
    // En cas d'erreur, transmet l'erreur au middleware de gestion des erreurs.
    next(err);
  }
};

// Opération pour ajouter une nouvelle recette.
const add = async (req, res, next) => {
  // Extraction des données de la recette depuis le corps de la requête.
  const formData = req.body;

  try {
    // Insertion de la nouvelle recette dans la table `recipe`.
    const insertId = await tables.recipe.create(formData);

    // Réponse avec le statut HTTP 201 (Créé) et l'ID de l'élément inséré.
    res.status(201).json({ insertId });
  } catch (err) {
    // En cas d'erreur, transmet l'erreur au middleware de gestion des erreurs.
    next(err);
  }
};

// Exportation des fonctions du contrôleur pour les utiliser ailleurs dans l'application.
module.exports = {
  browse, // Lecture de toutes les recettes
  add, // Ajout d'une nouvelle recette
  edit, // Mise à jour d'une recette existante
  recipesByContinent, // Lecture des recettes par continent
};
