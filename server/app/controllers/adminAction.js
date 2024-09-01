// Importation des modules nécessaires depuis la base de données.
const tables = require("../../database/tables");

// Fonction pour gérer la soumission d'un formulaire.
const handleFormSubmission = async (req, res, next) => {
  // Extraction des données du formulaire depuis le corps de la requête.
  const formData = req.body;

  try {
    // Insertion des données dans la base de données, dans la table `admin`.
    const insertId = await tables.admin.create(formData);

    // Réponse avec le statut HTTP 201 (Créé) et l'ID de l'élément inséré.
    res.status(201).json({ insertId });
  } catch (err) {
    // En cas d'erreur, celle-ci est transmise au middleware de gestion des erreurs.
    next(err);
  }
};

// Exportation de la fonction pour qu'elle puisse être utilisée dans d'autres parties de l'application.
module.exports = {
  handleFormSubmission,
};
