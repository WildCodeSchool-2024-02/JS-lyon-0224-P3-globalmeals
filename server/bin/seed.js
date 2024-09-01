// Charger les variables d'environnement depuis le fichier .env
require("dotenv").config();

const fs = require("node:fs"); // Importation du module fs pour manipuler les fichiers.
const path = require("node:path"); // Importation du module path pour manipuler les chemins de fichiers.

// Importer le client de base de données (probablement MySQL ou autre).
const database = require("../database/client");

// Construire le chemin vers le dossier contenant les fixtures (données de remplissage).
const fixtures = path.join(__dirname, "..", "database", "fixtures");

const seed = async () => {
  try {
    const dependencyMap = {}; // Carte des dépendances entre les seeders.

    // Construire chaque seeder à partir des fichiers dans le dossier fixtures.
    fs.readdirSync(fixtures)
      .filter((filePath) => !filePath.startsWith("Abstract")) // Ignorer les fichiers abstraits.
      .forEach((filePath) => {
        // Charger dynamiquement la classe de Seeder.
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const SeederClass = require(path.join(fixtures, filePath));

        // Instancier le seeder.
        const seeder = new SeederClass();

        // Ajouter le seeder à la carte des dépendances.
        dependencyMap[SeederClass] = seeder;
      });

    // Trier les seeders en fonction de leurs dépendances.
    const sortedSeeders = [];

    // Fonction récursive pour résoudre les dépendances.
    const solveDependencies = (n) => {
      n.dependencies.forEach((DependencyClass) => {
        const dependency = dependencyMap[DependencyClass];

        if (!sortedSeeders.includes(dependency)) {
          solveDependencies(dependency);
        }
      });

      if (!sortedSeeders.includes(n)) {
        sortedSeeders.push(n);
      }
    };

    // Résoudre les dépendances pour chaque seeder.
    Object.values(dependencyMap).forEach((seeder) => {
      solveDependencies(seeder);
    });

    // Tronquer les tables (en commençant par celles dont dépendent les autres).

    // Fonction récursive pour effectuer le truncate.
    const doTruncate = async (stack) => {
      if (stack.length === 0) {
        return;
      }

      const firstOut = stack.pop();

      // Utiliser delete au lieu de truncate pour éviter les contraintes de clé étrangère.
      await database.query(`delete from ${firstOut.table}`);

      await doTruncate(stack);
    };

    await doTruncate([...sortedSeeders]);

    // Exécuter chaque seeder pour remplir les tables.

    // Fonction récursive pour exécuter les seeders.
    const doRun = async (queue) => {
      if (queue.length === 0) {
        return;
      }

      const firstOut = queue.shift();

      // Exécuter le seeder pour insérer les données.
      await firstOut.run();

      // Attendre que toutes les promesses d'insertion soient complétées.
      await Promise.all(firstOut.promises);

      await doRun(queue);
    };

    await doRun(sortedSeeders);

    // Fermer la connexion à la base de données.
    database.end();

    console.info(
      `${database.databaseName} filled from '${path.normalize(fixtures)}' 🌱`
    );
  } catch (err) {
    // En cas d'erreur, afficher un message d'erreur détaillé.
    console.error("Error filling the database:", err.message, err.stack);
  }
};

// Exécuter la fonction de seed.
seed();
