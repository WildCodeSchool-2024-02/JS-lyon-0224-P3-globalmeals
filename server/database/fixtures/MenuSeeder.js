const AbstractSeeder = require("./AbstractSeeder");

class MenuSeeder extends AbstractSeeder {
  constructor() {
      super({ table: "menu", truncate: true });
  }

  run() {
    this.insert({
      name: "Italien",
      continent: "Europe",
      starter: "Bruschetta",
      picture_starter: "https://www.shutterstock.com/image-photo/bruschetta-cherry-tomatoes-mozzarella-cheese-600nw-2438601411.jpg",
      dish: "Pasta",
      picture_dish: "https://t4.ftcdn.net/jpg/02/24/04/47/360_F_224044706_GKydWTrihWdUaMyjxCSUZYsnAUVHgVKm.jpg",
      dessert: "Tiramisu",
      picture_dessert: "https://media.istockphoto.com/id/1398679790/fr/photo/g%C3%A2teau-tiramisu-sur-assiette-en-c%C3%A9ramique-blanche.jpg?s=612x612&w=0&k=20&c=LaRD0me7CMUt-5NgyNmgzbfRBU3ltV18iRmC6XcwNLk=",
      cocktail: "Milano-Torino",
      picture_cocktail: "https://finefoodsblog.com/wp-content/uploads/2023/05/23-0506-milano-torino-cocktail-0004.jpg",
    });
  }
}

module.exports = MenuSeeder;
