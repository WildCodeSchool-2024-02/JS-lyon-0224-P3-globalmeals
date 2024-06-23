const AbstractSeeder = require("./AbstractSeeder");

class MenuSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "menu", truncate: true });
  }

  run() {
    const menus = [
      {
        continent: "Europe",
        country: "Italien",
        refName: "europeItalien"
      },
      {
        continent: "Afrique",
        country: "Senegal",
        refName: "afriqueSenegal"
      },
      {
        continent: "Amérique",
        country: "Texas",
        refName: "texasAmérique"
      },
      {
        continent: "Asie",
        country: "Japon",
        refName: "asieJapon"
      },
      {
        continent: "Oceanie",
        country: "Tahitien",
        refName: "oceanieTahitien"
      },
    ];

    menus.forEach((menu) => {
      this.insert(menu);
    });
  }
}

module.exports = MenuSeeder;
