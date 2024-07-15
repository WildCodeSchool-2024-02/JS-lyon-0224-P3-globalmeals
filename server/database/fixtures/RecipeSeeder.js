const AbstractSeeder = require("./AbstractSeeder");

class RecipeSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "recipe", truncate: true });
  }

  run() {
    const recipes = [
      // Europe (Italien)
      {
        name: "Bruschetta",
        ingredient:
          "4 tranches de pain de campagne, 2 tomates, 1 gousse d'ail, 4 cuillères à soupe d'huile d'olive, sel, poivre, quelques feuilles de basilic frais",
        step: "Couper les tomates et l'ail. Griller le pain et frotter avec l'ail. Tartiner les tomates, arroser d'huile, assaisonner et ajouter du basilic.",
        step_time: "15 min",
        type: "starter",
        image: "bruschetta.png",
        menu_id: this.getRef(`europeItalien`).insertId,
        refName: "europeItalienBruschetta",
      },
      {
        name: "Pasta",
        ingredient:
          "400 g de pâtes, 2 tomates, 1 bouquet de basilic frais, 2 gousses d'ail, 4 cuillères à soupe d'huile d'olive, sel, poivre, parmesan râpé (facultatif)",
        step: "Faire bouillir les pâtes. Couper les tomates et l'ail. Chauffer l'huile et l'ail, ajouter les tomates, assaisonner. Égoutter les pâtes, mélanger avec la sauce, ajouter basilic et parmesan.",
        step_time: "25 min",
        type: "dish",
        image: "pasta.png",
        menu_id: this.getRef(`europeItalien`).insertId,
        refName: "europeItalienPasta",
      },
      {
        name: "Tiramisu",
        ingredient:
          "250 g de mascarpone, 3 œufs, 100 g de sucre, 20 biscuits à la cuillère, 300 ml de café fort refroidi, 2 cuillères à soupe de cacao en poudre",
        step: "Séparer les œufs. Battre les jaunes avec le sucre, ajouter le mascarpone, incorporer les blancs en neige. Tremper les biscuits dans le café, alterner couches de biscuits et crème. Réfrigérer, saupoudrer de cacao.",
        step_time: "25 min",
        type: "dessert",
        image: "tiramisu.png",
        menu_id: this.getRef(`europeItalien`).insertId,
        refName: "europeItalienTiramisu",
      },
      {
        name: "Milano-Torino",
        ingredient:
          "30 ml de Campari, 30 ml de vermouth rouge, glaçons, zeste d'orange pour la garniture",
        step: "Remplir un verre de glaçons. Verser le Campari et le vermouth, remuer délicatement, garnir d'un zeste d'orange.",
        step_time: "10 min",
        type: "cocktail",
        image: "milano-torino.png",
        menu_id: this.getRef(`europeItalien`).insertId,
        refName: "europeItalienMilanoTorino",
      },

      // Afrique (Sénégal)
      {
        name: "Pastels",
        ingredient:
          "Pâte feuilletée, farce (viande hachée, oignons, persil, épices), huile pour friture",
        step: "Étaler la pâte, mettre la farce, fermer en triangle, frire jusqu'à dorure.",
        step_time: "30 min",
        type: "starter",
        image: "pastels.png",
        menu_id: this.getRef(`afriqueSenegal`).insertId,
        refName: "afriqueSenegalPastels",
      },
      {
        name: "Thiéboudienne",
        ingredient:
          "Poisson (lotte ou dorade), riz, tomates, oignons, carottes, chou, aubergine, huile de palme, piment, sel",
        step: "Faire revenir les légumes dans l'huile de palme, ajouter le poisson, le riz, et cuire jusqu'à absorption du liquide.",
        step_time: "45 min",
        type: "dish",
        image: "thieboudienne.png",
        menu_id: this.getRef(`afriqueSenegal`).insertId,
        refName: "afriqueSenegalThieboudienne",
      },
      {
        name: "Mango noix de coco",
        ingredient: "Mangue, noix de coco râpée, lait de coco, sucre",
        step: "Couper la mangue, mélanger avec la noix de coco râpée, ajouter le lait de coco et le sucre, laisser reposer au frais.",
        step_time: "15 min",
        type: "dessert",
        image: "mango.png",
        menu_id: this.getRef(`afriqueSenegal`).insertId,
        refName: "afriqueSenegalMangoCoco",
      },

      {
        name: "Bissap",
        ingredient: "Fleurs d'hibiscus séchées, sucre, eau, menthe fraîche",
        step: "Infuser les fleurs d'hibiscus dans l'eau chaude, ajouter le sucre et la menthe, laisser refroidir.",
        step_time: "20 min",
        type: "cocktail",
        image: "bissap.png",
        menu_id: this.getRef(`afriqueSenegal`).insertId,
        refName: "afriqueSenegalBissap",
      },

      // Amérique (Texas)
      {
        name: "Nachos",
        ingredient:
          "Chips de maïs, fromage cheddar râpé, haricots noirs, jalapeños, salsa, guacamole, crème fraîche",
        step: "Disposer les chips sur une plaque, ajouter le fromage et les haricots, faire cuire au four, garnir de jalapeños, salsa, guacamole et crème fraîche.",
        step_time: "20 min",
        type: "starter",
        image: "nachos.png",
        menu_id: this.getRef(`texasAmerique`).insertId,
        refName: "texasAmeriqueNachos",
      },
      {
        name: "Barbecue ribs",
        ingredient:
          "Côtes de porc, sauce barbecue, épices (paprika, cumin, poivre, sel), vinaigre de cidre, miel",
        step: "Mariner les côtes de porc dans la sauce barbecue, les épices, le vinaigre et le miel, cuire au barbecue jusqu'à tendreté.",
        step_time: "2 heures",
        type: "dish",
        image: "ribs.png",
        menu_id: this.getRef(`texasAmerique`).insertId,
        refName: "texasAmeriqueBarbecueRibs",
      },
      {
        name: "Key Lime Pie",
        ingredient:
          "Biscuits Graham, beurre fondu, lait concentré sucré, jus de citron vert, zeste de citron vert, crème fouettée",
        step: "Mélanger les biscuits émiettés avec le beurre, presser dans un moule. Mélanger le lait concentré, le jus et le zeste de citron vert, verser sur la croûte. Réfrigérer, garnir de crème fouettée.",
        step_time: "30 min",
        type: "starter",
        image: "keyLimePie.png",
        menu_id: this.getRef(`texasAmerique`).insertId,
        refName: "texasAmeriqueKeyLimePie",
      },
      {
        name: "Margarita",
        ingredient:
          "Tequila, Cointreau, jus de citron vert, glace pilée, sel pour le bord du verre",
        step: "Mouiller le bord du verre avec du jus de citron vert et tremper dans le sel. Mélanger la tequila, le Cointreau, le jus de citron vert et la glace dans un shaker, verser dans le verre.",
        step_time: "10 min",
        type: "cocktail",
        image: "margarita.png",
        menu_id: this.getRef(`texasAmerique`).insertId,
        refName: "texasAmeriqueMargarita",
      },

      // Asie (Japon)
      {
        name: "Edamame",
        ingredient: "Fèves de soja (edamame), sel",
        step: "Faire bouillir les edamame dans de l'eau salée, égoutter et servir chaud.",
        step_time: "10 min",
        type: "starter",
        image: "edamame.png",
        menu_id: this.getRef(`asieJapon`).insertId,
        refName: "asieJaponEdamame",
      },
      {
        name: "Sushi assorti",
        ingredient:
          "Riz à sushi, poissons et fruits de mer variés (saumon, thon, crevettes), algue nori, vinaigre de riz, sucre, sel, légumes (avocat, concombre)",
        step: "Cuire le riz avec le vinaigre, assembler les ingrédients sur les feuilles de nori, rouler et couper en morceaux.",
        step_time: "30 min",
        type: "dish",
        image: "sushi.png",
        menu_id: this.getRef(`asieJapon`).insertId,
        refName: "asieJaponSushiAssorti",
      },
      {
        name: "Dorayaki",
        ingredient:
          "Farine, œufs, sucre, miel, levure chimique, anko (pâte de haricots rouges)",
        step: "Battre les œufs avec le sucre, ajouter la farine et la levure, cuire à la poêle en petites crêpes, garnir de pâte de haricots rouges, former un sandwich.",
        step_time: "30 min",
        type: "dessert",
        image: "doroyakii.png",
        menu_id: this.getRef(`asieJapon`).insertId,
        refName: "asieJaponDorayaki",
      },
      {
        name: "Sake martini",
        ingredient: "Sake, vodka, sirop de sucre, glaçons, zeste de citron",
        step: "Mélanger le sake, la vodka, le sirop de sucre et les glaçons dans un shaker, verser dans un verre à martini, garnir de zeste de citron.",
        step_time: "10 min",
        type: "cocktail",
        image: "sake.png",
        menu_id: this.getRef(`asieJapon`).insertId,
        refName: "asieJaponSakeMartini",
      },

      // Océanie (Tahitien)
      {
        name: "Thon noix de coco",
        ingredient:
          "Thon frais, lait de coco, concombre, tomates, citron vert, oignon, sel",
        step: "Couper le thon en dés, mélanger avec le lait de coco, les légumes coupés, le jus de citron vert et l'oignon émincé, laisser mariner.",
        step_time: "20 min",
        type: "starter",
        image: "thon.png",
        menu_id: this.getRef(`oceanieTahitien`).insertId,
        refName: "oceanieTahitienPoissonCru",
      },
      {
        name: "Poulet fafa",
        ingredient: "Poulet, épinards, lait de coco, oignons, ail, sel, poivre",
        step: "Faire revenir le poulet avec les oignons et l'ail, ajouter les épinards et le lait de coco, laisser mijoter jusqu'à tendreté.",
        step_time: "40 min",
        type: "dish",
        image: "pouletfafa.png",
        menu_id: this.getRef(`oceanieTahitien`).insertId,
        refName: "oceanieTahitienPouletFafa",
      },
      {
        name: "Poisson vanille",
        ingredient:
          "Poisson blanc (loup de mer), jus de citron vert, lait de coco, concombre, tomates, vanille, sel",
        step: "Couper le poisson en dés, mélanger avec le jus de citron vert, le lait de coco, les légumes coupés et la vanille grattée, laisser mariner.",
        step_time: "20 min",
        type: "dessert",
        image: "poissonvanille.png",
        menu_id: this.getRef(`oceanieTahitien`).insertId,
        refName: "oceanieTahitienPoissonVanille",
      },
      {
        name: "Mai Tai",
        ingredient:
          "Rhum blanc, rhum brun, jus de citron vert, sirop d'orgeat, glaçons, cerise et ananas pour garnir",
        step: "Mélanger les rhums, le jus de citron vert et le sirop d'orgeat avec des glaçons dans un shaker, verser dans un verre sur glace, garnir de cerise et d'ananas.",
        step_time: "10 min",
        type: "cocktail",
        image: "maiTai.png",
        menu_id: this.getRef(`oceanieTahitien`).insertId,
        refName: "oceanieTahitienMaiTai",
      },
    ];

    recipes.forEach((recipe) => {
      this.insert(recipe);
    });
  }
}

module.exports = RecipeSeeder;
