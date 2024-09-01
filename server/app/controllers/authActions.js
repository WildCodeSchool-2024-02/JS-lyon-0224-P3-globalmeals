// Importation des modules nécessaires pour la sécurité et la gestion des tokens JWT.
const argon2 = require("argon2"); // Pour hacher et vérifier les mots de passe.
const jwt = require("jsonwebtoken"); // Pour créer et vérifier les tokens JWT.

// Importation de l'accès aux tables de la base de données.
const tables = require("../../database/tables");

// Fonction de connexion (authentification).
const connexion = async (req, res, next) => {
  try {
    // Recherche d'un utilisateur spécifique dans la base de données en fonction de l'email fourni.
    const user = await tables.user.readByEmailWithPassword(req.body.mail);

    // Si l'utilisateur n'existe pas, renvoie un code d'état 422 (Unprocessable Entity).
    if (user === null) {
      res.sendStatus(422);
      return;
    }

    // Vérifie si le mot de passe fourni correspond au mot de passe haché stocké dans la base de données.
    const verified = await argon2.verify(user.password, req.body.password);

    if (verified === true) {
      // Si la vérification est réussie, on prépare la réponse.

      // Supprime le mot de passe haché de l'objet utilisateur avant de l'envoyer au client.
      delete user.hashed_password;

      // Création d'un token JWT signé avec l'ID utilisateur et son rôle.
      const token = await jwt.sign(
        { sub: user.id, role: user.role },
        process.env.APP_SECRET, // Clé secrète pour signer le token.
        {
          expiresIn: "1h", // Durée de vie du token (1 heure).
        }
      );

      // Supprime les informations sensibles de l'objet utilisateur avant de l'envoyer au client.
      delete user.id;
      delete user.password;

      // Envoie le token en tant que cookie HTTP-only et les informations utilisateur en JSON.
      res
        .cookie("access_token", token, {
          httpOnly: true, // Empêche l'accès aux cookies côté client (par exemple, via JavaScript).
          sameSite: "Lax", // Envoie le cookie uniquement pour les requêtes provenant du même site.
          secure: process.env.NODE_ENV === "production", // Envoie le cookie uniquement via HTTPS si en production.
          maxAge: 3600000, // Durée de vie du cookie (1 heure, en millisecondes).
        })
        .json({ user }); // Envoie les informations utilisateur au client.
    } else {
      // Si la vérification du mot de passe échoue, renvoie un code d'état 422.
      res.sendStatus(422);
    }
  } catch (err) {
    // En cas d'erreur, transmet l'erreur au middleware de gestion des erreurs.
    next(err);
  }
};

// Fonction de déconnexion.
const logout = (req, res) => {
  // Supprime le cookie contenant le token JWT et renvoie un code d'état 200 (OK).
  res.clearCookie("access_token").sendStatus(200);
};

// Exportation des fonctions pour qu'elles puissent être utilisées ailleurs dans l'application.
module.exports = {
  connexion,
  logout,
};
