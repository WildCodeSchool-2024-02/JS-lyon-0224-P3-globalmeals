const AbstractSeeder = require("./AbstractSeeder");
const RecipeSeeder = require("./RecipeSeeder");
const MenuSeeder = require("./MenuSeeder");

class MenuRecipeSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "menu_recipe", truncate: true, dependencies: [MenuSeeder, RecipeSeeder]});
  }

  run() {
    const menuRecipes = [
      // Europe (Italien)
      {
        menu_id: this.getRef(`europeItalien`).insertId,
        recipe_id: this.getRef(`europeItalienBruschetta`).insertId,
      },
      {
        menu_id: this.getRef(`europeItalien`).insertId,
        recipe_id: this.getRef(`europeItalienPasta`).insertId,
      },
      {
        menu_id: this.getRef(`europeItalien`).insertId,
        recipe_id: this.getRef(`europeItalienTiramisu`).insertId,
      },
      {
        menu_id: this.getRef(`europeItalien`).insertId,
        recipe_id: this.getRef(`europeItalienMilanoTorino`).insertId,
      },

      // Afrique (Sénégal)
      {
        menu_id: this.getRef(`afriqueSenegal`).insertId,
        recipe_id: this.getRef(`afriqueSenegalThieboudienne`).insertId,
      },
      {
        menu_id: this.getRef(`afriqueSenegal`).insertId,
        recipe_id: this.getRef(`afriqueSenegalPastels`).insertId,
      },
      {
        menu_id: this.getRef(`afriqueSenegal`).insertId,
        recipe_id: this.getRef(`afriqueSenegalBissap`).insertId,
      },
      {
        menu_id: this.getRef(`afriqueSenegal`).insertId,
        recipe_id: this.getRef(`afriqueSenegalMangoCoco`).insertId,
      },

      // Amérique (Texas)
      {
        menu_id: this.getRef(`texasAmérique`).insertId,
        recipe_id: this.getRef(`texasAmériqueNachos`).insertId,
      },
      {
        menu_id: this.getRef(`texasAmérique`).insertId,
        recipe_id: this.getRef(`texasAmériqueBarbecueRibs`).insertId,
      },
      {
        menu_id: this.getRef(`texasAmérique`).insertId,
        recipe_id: this.getRef(`texasAmériqueKeyLimePie`).insertId,
      },
      {
        menu_id: this.getRef(`texasAmérique`).insertId,
        recipe_id: this.getRef(`texasAmériqueMargarita`).insertId,
      },

      // Asie (Japon)
      {
        menu_id: this.getRef(`asieJapon`).insertId,
        recipe_id: this.getRef(`asieJaponEdamame`).insertId,
      },
      {
        menu_id: this.getRef(`asieJapon`).insertId,
        recipe_id: this.getRef(`asieJaponSushiAssorti`).insertId,
      },
      {
        menu_id: this.getRef(`asieJapon`).insertId,
        recipe_id: this.getRef(`asieJaponDorayaki`).insertId,
      },
      {
        menu_id: this.getRef(`asieJapon`).insertId,
        recipe_id: this.getRef(`asieJaponSakeMartini`).insertId,
      },

      // Océanie (Tahitien)
      {
        menu_id: this.getRef(`oceanieTahitien`).insertId,
        recipe_id: this.getRef(`oceanieTahitienPoissonCru`).insertId,
      },
      {
        menu_id: this.getRef(`oceanieTahitien`).insertId,
        recipe_id: this.getRef(`oceanieTahitienPouletFafa`).insertId,
      },
      {
        menu_id: this.getRef(`oceanieTahitien`).insertId,
        recipe_id: this.getRef(`oceanieTahitienPoissonVanille`).insertId,
      },
      {
        menu_id: this.getRef(`oceanieTahitien`).insertId,
        recipe_id: this.getRef(`oceanieTahitienMaiTai`).insertId,
      },
    ];

    menuRecipes.forEach((menuRecipe) => {
      this.insert(menuRecipe);
    });
  }
}

module.exports = MenuRecipeSeeder;
