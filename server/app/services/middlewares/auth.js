// Importation des modules nécessaires pour le hachage de mots de passe et la gestion des tokens JWT.
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Options de hachage pour Argon2 (basées sur les recommandations OWASP).
// Voir la documentation pour plus de détails : https://github.com/ranisalt/node-argon2/wiki/Options
const hashingOptions = {
  type: argon2.argon2id, // Utilisation de l'algorithme Argon2id, recommandé pour le stockage des mots de passe.
  memoryCost: 19 * 2 ** 10, // Quantité de mémoire utilisée par le hachage (19 Mio en Kio).
  timeCost: 2, // Nombre d'itérations de hachage.
  parallelism: 1, // Nombre de threads parallèles utilisés.
};

// Middleware pour hacher un mot de passe avant de le stocker dans la base de données.
const hashPassword = async (req, res, next) => {
  try {
    // Extraction du mot de passe de la requête.
    const { password } = req.body;

    // Hachage du mot de passe avec les options spécifiées.
    const hashedPassword = await argon2.hash(password, hashingOptions);

    // Remplacement du mot de passe non haché par le mot de passe haché dans la requête.
    req.body.hashedPassword = hashedPassword;

    // Suppression du mot de passe non haché de la requête par mesure de sécurité.
    delete req.body.password;

    next(); // Poursuite de la chaîne de middlewares.
  } catch (err) {
    next(err); // En cas d'erreur, transmet l'erreur au middleware de gestion des erreurs.
  }
};

// Middleware pour vérifier un token JWT dans l'en-tête "Authorization".
const verifyToken = (req, res, next) => {
  try {
    // Vérifier la présence de l'en-tête "Authorization" dans la requête.
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader === null) {
      throw new Error("Authorization header is missing"); // L'en-tête est manquant.
    }

    // Vérifier que l'en-tête a la forme "Bearer <token>".
    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type"); // Le type d'en-tête n'est pas "Bearer".
    }

    // Vérifier la validité du token (son authenticité et sa date d'expiration).
    // En cas de succès, le payload est extrait et décodé.
    req.auth = jwt.verify(token, process.env.APP_SECRET);

    next(); // Poursuite de la chaîne de middlewares.
  } catch (err) {
    console.error(err);

    res.sendStatus(401); // En cas d'erreur, renvoie un statut HTTP 401 (Unauthorized).
  }
};

// Middleware pour vérifier un token JWT stocké dans un cookie.
const verifyCookie = (req, res, next) => {
  try {
    // Extraction du token depuis le cookie nommé "access_token".
    const token = req.cookies.access_token;

    if (!token) {
      return res.sendStatus(401); // Si aucun token n'est présent, renvoie un statut HTTP 401 (Unauthorized).
    }

    // Vérification du token JWT avec la clé secrète.
    req.auth = jwt.verify(token, process.env.APP_SECRET);

    return next(); // Poursuite de la chaîne de middlewares.
  } catch (err) {
    return res.sendStatus(404).send("Il y a eu une erreur"); // En cas d'erreur, renvoie un statut HTTP 404 (Not Found) avec un message d'erreur.
  }
};

// Exportation des middlewares pour les utiliser dans d'autres parties de l'application.
module.exports = {
  hashPassword, // Hachage des mots de passe.
  verifyToken, // Vérification des tokens JWT dans les en-têtes HTTP.
  verifyCookie, // Vérification des tokens JWT dans les cookies.
};
