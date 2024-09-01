const AbstractSeeder = require("./AbstractSeeder"); // Importation de la classe AbstractSeeder pour l'utiliser comme base

class MenuSeeder extends AbstractSeeder {
  // Déclaration de la classe MenuSeeder qui hérite d'AbstractSeeder
  constructor() {
    super({ table: "menu", truncate: true }); // Appel au constructeur parent avec le nom de la table et l'option de troncature
  }

  run() {
    // Implémentation de la méthode run qui définit les données à insérer
    const menus = [
      // Tableau d'objets représentant les menus à insérer
      {
        id: "1",
        continent: "Europe",
        country: "Italien",
        refName: "europeItalien", // Nom de référence pour cet enregistrement
      },
      {
        id: "2",
        continent: "Afrique",
        country: "Sénégalais",
        refName: "afriqueSenegal",
      },
      {
        id: "3",
        continent: "Amerique",
        country: "Texan",
        refName: "texasAmerique",
      },
      {
        id: "4",
        continent: "Asie",
        country: "Japonais",
        refName: "asieJapon",
      },
      {
        id: "5",
        continent: "Oceanie",
        country: "Tahitien",
        refName: "oceanieTahitien",
      },
    ];

    menus.forEach((menu) => {
      // Parcourt chaque élément du tableau menus
      this.insert(menu); // Insère chaque menu en utilisant la méthode insert héritée d'AbstractSeeder
    });
  }
}

module.exports = MenuSeeder; // Exportation de la classe MenuSeeder pour l'utiliser dans d'autres parties de l'application
