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
        continent: "Asie",
        country: "Japon",
        refName: "asieJapon"
      },
    ];

    menus.forEach((menu) => {
      this.insert(menu);
    });
  }
}

module.exports = MenuSeeder;
