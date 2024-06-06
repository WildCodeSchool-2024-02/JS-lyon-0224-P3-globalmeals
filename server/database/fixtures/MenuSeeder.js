const AbstractSeeder = require("./AbstractSeeder");

class MenuSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "menu", truncate: true, });
  }

  // The run method - Populate the 'item' table with fake data

  run() {
    // Generate and insert fake data into the 'menu' table
  this.insert({
    name: "Sénégal", 
    continent: "Afrique",
    picture:"",
    starter: "terrine de manioque",
    dish: "mafé",
    dessert: "coco-ice",
    cocktail: "bissap",
  });
      // Generate fake menu data
}
}

// Export the MenuSeeder class
module.exports = MenuSeeder;
