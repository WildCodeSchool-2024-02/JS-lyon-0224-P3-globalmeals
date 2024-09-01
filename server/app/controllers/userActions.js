// Importation de l'accès aux tables de la base de données.
const tables = require("../../database/tables");

// Opération BREAD : Browse (Read All) - Lecture de tous les utilisateurs.
const browse = async (req, res, next) => {
  try {
    // Récupération de tous les utilisateurs de la table `user`.
    const users = await tables.user.readAll();

    // Réponse avec les utilisateurs sous forme de JSON.
    res.json(users);
  } catch (err) {
    // En cas d'erreur, transmet l'erreur au middleware de gestion des erreurs.
    next(err);
  }
};

// Opération BREAD : Read - Lecture d'un utilisateur spécifique en fonction de l'ID.
const read = async (req, res, next) => {
  try {
    // Récupération d'un utilisateur spécifique de la table `user` en fonction de l'ID fourni.
    const user = await tables.user.read(req.params.id);

    // Si l'utilisateur n'est pas trouvé, renvoie un statut HTTP 404 (Not Found).
    // Sinon, renvoie l'utilisateur sous forme de JSON.
    if (user === null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // En cas d'erreur, transmet l'erreur au middleware de gestion des erreurs.
    next(err);
  }
};

// Opération BREAD : Add (Create) - Ajout d'un nouvel utilisateur.
const add = async (req, res, next) => {
  // Extraction des données de l'utilisateur depuis le corps de la requête.
  const user = req.body;

  try {
    // Insertion de l'utilisateur dans la table `user`.
    const insertId = await tables.user.create(user);

    // Réponse avec le statut HTTP 201 (Créé) et l'ID de l'utilisateur inséré.
    res.status(201).json({ insertId });
  } catch (err) {
    // En cas d'erreur, transmet l'erreur au middleware de gestion des erreurs.
    next(err);
  }
};

// Exportation des fonctions du contrôleur pour les utiliser ailleurs dans l'application.
module.exports = {
  browse, // Lecture de tous les utilisateurs
  read, // Lecture d'un utilisateur spécifique
  add, // Ajout d'un nouvel utilisateur
};
