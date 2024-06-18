const AbstractSeeder = require("./AbstractSeeder");
const RecipeSeeder = require("./RecipeSeeder");
const MenuSeeder = require("./MenuSeeder")

class MenuRecipeSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "menu_recipe", truncate: true, dependencies: [MenuSeeder, RecipeSeeder]});
  }

  run() {
    const menuRecipes = [
      {
        menu_id: this.getRef(`europeItalien`).insertId,
        recipe_id: this.getRef(`bruschettaEntrée`).insertId,
      },
      {
        menu_id: this.getRef(`europeItalien`).insertId,
        recipe_id: this.getRef(`pastaPlat`).insertId,
      },
    ];

    menuRecipes.forEach((menuRecipe) => {
      this.insert(menuRecipe);
    });
  }
}

module.exports = MenuRecipeSeeder;

