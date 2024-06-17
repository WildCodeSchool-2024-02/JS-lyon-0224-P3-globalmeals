const AbstractSeeder = require("./AbstractSeeder");

class MenuSeeder extends AbstractSeeder {
  constructor() {
      super({ table: "menu", truncate: true });
  }

  run() {
    this.insert({
      name: "Italien",
      starter: "Bruschetta",
      picture_starter: "https://www.shutterstock.com/image-photo/bruschetta-cherry-tomatoes-mozzarella-cheese-600nw-2438601411.jpg",
      starter_preparation_time: "15 min",
      dish: "Pasta",
      picture_dish: "https://t4.ftcdn.net/jpg/02/24/04/47/360_F_224044706_GKydWTrihWdUaMyjxCSUZYsnAUVHgVKm.jpg",
      dish_preparation_time: "20 min",
      dessert: "Tiramisu",
      picture_dessert: "https://t3.ftcdn.net/jpg/03/28/01/60/360_F_328016056_Ro67OjyMT2dnGFL6v4VKKoAkIcakElTW.jpg",
      dessert_preparation_time: "25 min",
      cocktail: "Milano-Torino",
      picture_cocktail: "https://finefoodsblog.com/wp-content/uploads/2023/05/23-0506-milano-torino-cocktail-0004.jpg",
      cocktail_preparation_time: "5 min"
    });
  }
}

module.exports = MenuSeeder;
