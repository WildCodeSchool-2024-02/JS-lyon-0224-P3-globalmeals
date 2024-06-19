import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./menus.css";
import imageTab1 from "../assets/images/description.png";
import imageTab2 from "../assets/images/ingredients.png";
import imageTab3 from "../assets/images/etapes.png";

function Menu() {
  const menuData = useLoaderData();
  const [activeMenuItem, setActiveMenuItem] = useState("Entrée");
  const [activeTab, setActiveTab] = useState("Description");

// La fonctionnalité "menu du mois" n'est pas complète dans cette US, 
// On récupérez que la première recette[0]
    const menu = menuData[0];

  const handleMenuItemClick = (menuItem) => {
    if (activeMenuItem === menuItem) {
      setActiveMenuItem(null);
    } else {
      setActiveMenuItem(menuItem);
      setActiveTab("Description");
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const starter = menuData.find(
    (recipe) => recipe.type.toLowerCase() === "entrée"
  );
  const dish = menuData.find((recipe) => recipe.type.toLowerCase() === "plat");
  const dessert = menuData.find(
    (recipe) => recipe.type.toLowerCase() === "dessert"
  );
  const cocktail = menuData.find(
    (recipe) => recipe.type.toLowerCase() === "cocktail"
  );

  return (
    <div className="content">
      <h1 className="menu-title">Europe</h1>
      {menu !== undefined && (
        <div className="menu-item">
          <h2>Menu {menu.country}</h2>
          <div className="menu-container">
            <div className={`sidebar ${activeMenuItem ? "active" : ""}`}>
              <button
                type="button"
                className={`tab-button ${activeTab === "Description" ? "active" : ""}`}
                onClick={() => handleTabClick("Description")}
              >
                <img src={imageTab1} alt="Description" className="tab-icon" />
              </button>
              <button
                type="button"
                className={`tab-button ${activeTab === "Ingrédients" ? "active" : ""}`}
                onClick={() => handleTabClick("Ingrédients")}
              >
                <img src={imageTab2} alt="Ingrédients" className="tab-icon" />
              </button>
              <button
                type="button"
                className={`tab-button ${activeTab === "Préparation" ? "active" : ""}`}
                onClick={() => handleTabClick("Préparation")}
              >
                <img src={imageTab3} alt="Préparation" className="tab-icon" />
              </button>
            </div>
            <div className="menu-section">
              <div
                className={`menu-subsection ${activeMenuItem === "Entrée" ? "selected" : ""}`}
              >
                <h3>Entrée</h3>
                <p>{starter !== undefined ? starter.name : "s/o"}</p>
                <img
                  src="/bruschetta.png"
                  alt="starter"
                  onClick={() => handleMenuItemClick("Entrée")}
                  aria-hidden="true"
                />
                <p>Temps : {starter !== undefined ? starter.step_time : "s/o"}</p>
              </div>
              <div
                className={`menu-subsection ${activeMenuItem === "Plat" ? "selected" : ""}`}
              >
                <h3>Plat</h3>
                <p>{dish !== undefined ? dish.name : "s/o"}</p>
                <img
                  src="/pasta.png"
                  alt="dish"
                  onClick={() => handleMenuItemClick("Plat")}
                  aria-hidden="true"
                />
                <p>Temps : {dish !== undefined ? dish.step_time : "s/o"}</p>
              </div>
              <div
                className={`menu-subsection ${activeMenuItem === "Dessert" ? "selected" : ""}`}
              >
                <h3>Dessert</h3>
                <p>{dessert !== undefined ? dessert.name : "s/o"}</p>
                <img
                  src="/tiramisu.png"
                  alt="dessert"
                  onClick={() => handleMenuItemClick("Dessert")}
                  aria-hidden="true"
                />
                <p>Temps : {dessert !== undefined ? dessert.step_time : "s/o"}</p>
              </div>
              <div
                className={`menu-subsection ${activeMenuItem === "Cocktail" ? "selected" : ""}`}
              >
                <h3>Cocktail</h3>
                <p>{cocktail !== undefined ? cocktail.name : "s/o"}</p>
                <img
                  src="/milano-torino.png"
                  alt="cocktail"
                  onClick={() => handleMenuItemClick("Cocktail")}
                  aria-hidden="true"
                />
                <p>Temps : {cocktail !== undefined ? cocktail.step_time : "s/o"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Ingrédients" && activeMenuItem && (
        <div className="ingredient-section">
          <h3>{activeMenuItem}</h3>
          <h4>Les ingrédients - 4 personnes</h4>
          <p>
            {menuData.find(
              (recipe) =>
                recipe.type.toLowerCase() === activeMenuItem.toLowerCase()
            )?.ingredient || "s/o"}
          </p>
        </div>
      )}

      {activeTab === "Préparation" && activeMenuItem && (
        <div className="ingredient-section">
          <h3>{activeMenuItem}</h3>
          <h4>La préparation</h4>
          <p>
            {menuData.find(
              (recipe) =>
                recipe.type.toLowerCase() === activeMenuItem.toLowerCase()
            )?.step || "s/o"}
          </p>
        </div>
      )}
    </div>
  );
}

export default Menu;