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

  return (
    <div className="content">
      <h1 className="menu-title">Europe</h1>
      {menuData.map((menu) => (
        <div key={menu.id} className="menu-item">
          <h2>Menu {menu.name}</h2>
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
                <p>{menu.starter}</p>
                <img
                  src={menu.picture_starter}
                  alt={menu.starter}
                  onClick={() => handleMenuItemClick("Entrée")}
                  aria-hidden="true"
                  />
                  <p>Temps : {menu.starter_preparation_time}</p>
              </div>
              <div
                className={`menu-subsection ${activeMenuItem === "Plat" ? "selected" : ""}`}
              >
                <h3>Plat</h3>
                <p>{menu.dish}</p>
                <img
                  src={menu.picture_dish}
                  alt={menu.dish}
                  onClick={() => handleMenuItemClick("Plat")}
                  aria-hidden="true"
                  />
                  <p>Temps : {menu.dish_preparation_time}</p>
              </div>
              <div
                className={`menu-subsection ${activeMenuItem === "Dessert" ? "selected" : ""}`}
              >
                <h3>Dessert</h3>
                <p>{menu.dessert}</p>
                <img
                  src={menu.picture_dessert}
                  alt={menu.dessert}
                  onClick={() => handleMenuItemClick("Dessert")}
                  aria-hidden="true"
                  />
                  <p>Temps : {menu.dessert_preparation_time}</p>
              </div>
              <div
                className={`menu-subsection ${activeMenuItem === "Cocktail" ? "selected" : ""}`}
              >
                <h3>Cocktail</h3>
                <p>{menu.cocktail}</p>
                <img
                  src={menu.picture_cocktail}
                  alt={menu.cocktail}
                  onClick={() => handleMenuItemClick("Cocktail")}
                  aria-hidden="true"
                  />
                  <p>Temps : {menu.cocktail_preparation_time}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <p>
        {activeTab === "Ingrédients" &&
          activeMenuItem &&
          `${activeMenuItem} - Ingrédients`}
      </p>
      <p>
        {activeTab === "Préparation" &&
          activeMenuItem &&
          `${activeMenuItem} - Préparation`}
      </p>
    </div>
  );
}

export default Menu;
