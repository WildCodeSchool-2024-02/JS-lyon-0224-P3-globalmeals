const AbstractSeeder = require("./AbstractSeeder");

class MenuSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "menu", truncate: true });
  }

  run() {
    const menus = [
      {
        id: "1",
        continent: "Europe",
        country: "Italien",
        refName: "europeItalien",
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
      this.insert(menu);
    });
  }
}

module.exports = MenuSeeder;
