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
        country: "Sénégalais",
        refName: "afriqueSenegal"
      },
      {
        continent: "Amerique",
        country: "Texan",
        refName: "texasAmerique"
      },
      {
        continent: "Asie",
        country: "Japonais",
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
