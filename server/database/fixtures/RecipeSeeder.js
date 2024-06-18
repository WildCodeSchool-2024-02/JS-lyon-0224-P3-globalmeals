const AbstractSeeder = require("./AbstractSeeder");

class RecipeSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "recipe", truncate: true });
  }

  run() {
    const recipes = [
      {
        name: "Bruschetta",
        ingredient: "Pain, olive, tomate...",
        step: "Couper, tartiner...",
        step_time: "15 min",
        type: "entrée",
        refName: "bruschettaEntrée"
      },
      {
        name: "Pasta",
        ingredient: "Pate, basilic, tomate...",
        step: "Faire bouillir, couper...",
        step_time: "25 min",
        type: "plat",
        refName: "pastaPlat"
      },
    ];

    recipes.forEach((recipe) => {
      this.insert(recipe);
    });
  }
}

module.exports = RecipeSeeder;
