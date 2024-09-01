// Importation de l'accès aux tables de la base de données.
const tables = require("../../database/tables");

// Opération BREAD : Browse (Read All) - Lecture de tous les éléments.
const browse = async (req, res, next) => {
  try {
    // Récupération de tous les éléments de la table `menu`.
    const menu = await tables.menu.readAll();

    // Réponse avec les éléments sous forme de JSON.
    res.json(menu);
  } catch (err) {
    // En cas d'erreur, transmet l'erreur au middleware de gestion des erreurs.
    next(err);
  }
};

// Opération pour ajouter un nouvel élément.
const add = async (req, res, next) => {
  // Extraction des données du formulaire depuis le corps de la requête.
  const formData = req.body;

  try {
    // Insertion des données dans la table `menu`.
    const insertId = await tables.menu.create(formData);

    // Réponse avec le statut HTTP 201 (Créé) et l'ID de l'élément inséré.
    res.status(201).json({ insertId });
  } catch (err) {
    // En cas d'erreur, transmet l'erreur au middleware de gestion des erreurs.
    next(err);
  }
};

// Opération BREAD : Edit (Update) - Mise à jour d'un élément.
const edit = async (req, res, next) => {
  // Extraction des données de l'élément à mettre à jour depuis le corps de la requête.
  const menu = req.body;

  try {
    // Mise à jour des données dans la table `menu`.
    const updatedMenu = await tables.menu.update(menu);

    // Réponse avec le statut HTTP 200 (OK) et les données mises à jour.
    res.status(200).json({ updatedMenu });
  } catch (err) {
    // En cas d'erreur, transmet l'erreur au middleware de gestion des erreurs.
    next(err);
  }
};

// Opération BREAD : Read - Lecture d'un élément spécifique en fonction du continent.
const read = async (req, res, next) => {
  try {
    // Récupération d'un élément spécifique de la table `menu` en fonction du continent.
    const item = await tables.menu.readByContinent(req.query.continent);

    // Si l'élément n'est pas trouvé, renvoie un statut HTTP 404 (Not Found).
    if (item == null) {
      res.sendStatus(404);
    } else {
      // Sinon, renvoie l'élément en format JSON.
      res.json(item);
    }
  } catch (err) {
    // En cas d'erreur, transmet l'erreur au middleware de gestion des erreurs.
    next(err);
  }
};

// Exportation des fonctions du contrôleur pour les utiliser ailleurs dans l'application.
module.exports = {
  browse, // Lecture de tous les éléments
  add, // Ajout d'un nouvel élément
  edit, // Mise à jour d'un élément existant
  read, // Lecture d'un élément spécifique en fonction du continent
};
