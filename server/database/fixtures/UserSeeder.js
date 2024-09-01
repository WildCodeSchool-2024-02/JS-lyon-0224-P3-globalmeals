const argon2 = require("argon2"); // Importation de la bibliothèque argon2 pour le hachage de mots de passe
const AbstractSeeder = require("./AbstractSeeder"); // Importation de la classe AbstractSeeder

// Définition des options de hachage pour Argon2
const hashingOptions = {
  type: argon2.argon2id, // Utilisation de l'algorithme Argon2id recommandé pour le stockage des mots de passe
  memoryCost: 19 * 2 ** 10, // Coût en mémoire de 19 MiB
  timeCost: 2, // Coût temporel, nombre d'itérations de hachage
  parallelism: 1, // Nombre de threads parallèles utilisés pour le hachage
};

class UserSeeder extends AbstractSeeder {
  // Déclaration de la classe UserSeeder qui hérite d'AbstractSeeder
  constructor() {
    // Appel au constructeur de la classe parente avec le nom de la table et l'option de troncature
    super({ table: "user", truncate: true });
  }

  // Méthode run - Peupler la table 'user' avec des données factices
  async run() {
    // Générer et insérer des données factices dans la table 'user'
    for (let i = 0; i < 10; i += 1) {
      /* eslint-disable no-await-in-loop */
      const hashedPassword = await argon2.hash("toto1234", hashingOptions); // Hacher le mot de passe en utilisant Argon2

      const fakeUser = {
        username: `user_${i}`, // Générer un nom d'utilisateur factice
        mail: this.faker.internet.email(), // Générer une adresse e-mail factice avec la bibliothèque faker
        password: hashedPassword, // Utiliser le mot de passe haché
      };

      // Insérer les données de fakeUser dans la table 'user'
      await this.insert(fakeUser); // insert into user(username, mail, password) values (?, ?, ?)
    }
  }
}

// Exportation de la classe UserSeeder pour l'utiliser dans d'autres parties de l'application
module.exports = UserSeeder;
