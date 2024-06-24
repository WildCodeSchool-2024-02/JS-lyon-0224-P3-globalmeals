import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./menus.css";
import imageTab1 from "../assets/images/description.png";
import imageTab2 from "../assets/images/ingredients.png";
import imageTab3 from "../assets/images/etapes.png";
import imageMenu1 from "../../public/bruschetta.png";
import imageMenu2 from "../../public/pasta.png";
import imageMenu3 from "../../public/tiramisu.png";
import imageMenu4 from "../../public/milano-torino.png";
import imageMenu5 from "../../public/pastels.png";
import imageMenu6 from "../../public/thieboudienne.png";
import imageMenu7 from "../../public/mango.png";
import imageMenu8 from "../../public/bissap.png";


const ApiUrl = import.meta.env.VITE_API_URL;

function Menu() {
  const { continent } = useParams();
  const [menuData, setMenuData] = useState([]);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`${ApiUrl}/menu/menus-recipes?continent=${continent}`);
        if (!response.ok) {
          throw new Error("La réponse du réseau n'était pas ok");
        }
        const data = await response.json();
        const filteredData = data.filter(item => item.continent.toLowerCase() === continent.toLowerCase());
        setMenuData(filteredData);
      } catch (err) {
        console.error("Échec de la récupération des données du menu :", err);
      }
    };
    fetchMenuData();
  }, [continent]);

  const countries = [...new Set(menuData.map(item => item.country))];

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const getMenuItemImage = (continentImage, type) => {
    switch (continentImage.toLowerCase()) {
      case "europe":
        switch (type.toLowerCase()) {
          case "entrée":
            return imageMenu1; 
          case "plat":
            return imageMenu2; 
          case "dessert":
            return imageMenu3; 
          case "cocktail":
            return imageMenu4; 
          default:
            return null;
        }
      case "afrique":
        switch (type.toLowerCase()) {
          case "entrée":
            return imageMenu5;
          case "plat":
            return imageMenu6; 
          case "dessert":
            return imageMenu7; 
          case "cocktail":
            return imageMenu8; 
          default:
            return null;
        }
     
      default:
        return null;
    }
  };

  return (
    <div className="content">
      {countries.length > 0 && (
        <>
          <h1 className="menu-title">{continent.charAt(0).toUpperCase() + continent.slice(1).toLowerCase()}</h1>
          {countries.map(country => {
            const countryMenuData = menuData.filter(item => item.country === country);
            return (
              <div key={country} className="menu-item">
                <h2>Menu {country}</h2>
                <div className="menu-container">
                  <div className={`sidebar ${activeMenuItem ? "active" : ""}`}>
                    <button
                      type="button"
                      className={`tab-button ${activeTab === "Description" ? "active" : ""}`}
                      onClick={() => setActiveTab("Description")}
                    >
                      <img src={imageTab1} alt="Description" className="tab-icon" />
                    </button>
                    <button
                      type="button"
                      className={`tab-button ${activeTab === "Ingrédients" ? "active" : ""}`}
                      onClick={() => setActiveTab("Ingrédients")}
                    >
                      <img src={imageTab2} alt="Ingrédients" className="tab-icon" />
                    </button>
                    <button
                      type="button"
                      className={`tab-button ${activeTab === "Préparation" ? "active" : ""}`}
                      onClick={() => setActiveTab("Préparation")}
                    >
                      <img src={imageTab3} alt="Préparation" className="tab-icon" />
                    </button>
                  </div>
                  <div className="menu-section">
                    {["entrée", "plat", "dessert", "cocktail"].map(type => {
                      const menuItem = countryMenuData.find(item => item.type.toLowerCase() === type);
                      return menuItem && (
                        <div
                          key={type}
                          className={`menu-subsection ${activeMenuItem?.name === menuItem.name ? "selected" : ""}`}
                          onClick={() => handleMenuItemClick(menuItem)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleMenuItemClick(menuItem);
                            }
                          }}
                          role="button"
                          tabIndex={0}
                        >
                          <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                          <p>{menuItem.name || "s/o"}</p>
                          <img
                            src={getMenuItemImage(continent, type)}
                            alt={type}
                            aria-hidden="true"
                          />
                          <p>Temps : {menuItem.step_time || "s/o"}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {activeTab === "Ingrédients" && activeMenuItem && (
                  <div className="ingredient-section">
                    <h3>{activeMenuItem.name}</h3>
                    <h4>Les ingrédients - 4 personnes</h4>
                    <p>
                      {activeMenuItem.ingredient || "s/o"}
                    </p>
                  </div>
                )}

                {activeTab === "Préparation" && activeMenuItem && (
                  <div className="ingredient-section">
                    <h3>{activeMenuItem.name}</h3>
                    <h4>La préparation</h4>
                    <p>
                      {activeMenuItem.step || "s/o"}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Menu;
