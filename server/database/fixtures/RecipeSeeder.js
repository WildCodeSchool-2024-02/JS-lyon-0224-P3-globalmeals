const AbstractSeeder = require("./AbstractSeeder");

class RecipeSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "recipe", truncate: true });
  }

  run() {
    const recipes = [
      {
        name: "Bruschetta",
        ingredient: "4 tranches de pain de campagne, 2 tomates, 1 gousse d'ail, 4 cuillères à soupe d'huile d'olive, sel, poivre, quelques feuilles de basilic frais",
        step: "Couper les tomates et l'ail. Griller le pain et frotter avec l'ail. Tartiner les tomates, arroser d'huile, assaisonner et ajouter du basilic.",
        step_time: "15 min",
        type: "entrée",
        refName: "bruschettaEntrée"
      },
      {
        name: "Pasta",
        ingredient: "400 g de pâtes, 2 tomates, 1 bouquet de basilic frais, 2 gousses d'ail, 4 cuillères à soupe d'huile d'olive, sel, poivre, parmesan râpé (facultatif)",
        step: "Faire bouillir les pâtes. Couper les tomates et l'ail. Chauffer l'huile et l'ail, ajouter les tomates, assaisonner. Égoutter les pâtes, mélanger avec la sauce, ajouter basilic et parmesan.",
        step_time: "25 min",
        type: "plat",
        refName: "pastaPlat"
      },
      {
        name: "Tiramisu",
        ingredient: "250 g de mascarpone, 3 œufs, 100 g de sucre, 20 biscuits à la cuillère, 300 ml de café fort refroidi, 2 cuillères à soupe de cacao en poudre",
        step: "Séparer les œufs. Battre les jaunes avec le sucre, ajouter le mascarpone, incorporer les blancs en neige. Tremper les biscuits dans le café, alterner couches de biscuits et crème. Réfrigérer, saupoudrer de cacao.",
        step_time: "25 min",
        type: "dessert",
        refName: "tiramisuDessert"
      },
      {
        name: "Milano-Torino",
        ingredient: "30 ml de Campari, 30 ml de vermouth rouge, glaçons, zeste d'orange pour la garniture",
        step: "Remplir un verre de glaçons. Verser le Campari et le vermouth, remuer délicatement, garnir d'un zeste d'orange.",
        step_time: "10 min",
        type: "cocktail",
        refName: "milanoCocktail"
      },
    ];

    recipes.forEach((recipe) => {
      this.insert(recipe);
    });
  }
}

module.exports = RecipeSeeder;
