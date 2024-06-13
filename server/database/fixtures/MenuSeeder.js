const AbstractSeeder = require("./AbstractSeeder");

class MenuSeeder extends AbstractSeeder {
  constructor() {
      super({ table: "menu", truncate: true });
  }

  run() {
    this.insert({
      name: "Sénégal",
      continent: "Afrique",
      picture: "",
      starter: "terrine de manioque",
      dish: "mafé",
      dessert: "coco-ice",
      cocktail: "bissap",
    });
  }
}

module.exports = MenuSeeder;
