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
import imageMenu9 from "../../public/nachos.png";
import imageMenu10 from "../../public/ribs.png";
import imageMenu11 from "../../public/keyLimePie.png";
import imageMenu12 from "../../public/margarita.png";
import imageMenu13 from "../../public/edamame.png";
import imageMenu14 from "../../public/sushi.png";
import imageMenu15 from "../../public/doroyakii.png";
import imageMenu16 from "../../public/sake.png";
import imageMenu17 from "../../public/thon.png";
import imageMenu18 from "../../public/pouletfafa.png";
import imageMenu19 from "../../public/poissonvanille.png";
import imageMenu20 from "../../public/maiTai.png";

const ApiUrl = import.meta.env.VITE_API_URL;

const changeColors = (continent) => {
  const root = document.documentElement;
  switch (continent.toLowerCase()) {
    case "europe":
      root.style.setProperty("--color-continent", "#0081c8");
      break;
    case "afrique":
      root.style.setProperty("--color-continent", "#242423");
      break;
    case "amerique":
      root.style.setProperty("--color-continent", "#ee334e");
      break;
    case "asie":
      root.style.setProperty("--color-continent", "#e9c46a");
      break;
    case "oceanie":
      root.style.setProperty("--color-continent", "#00a651");
      break;
    default:
      break;
  }
};

function Menu() {
  const { continent } = useParams();
  const [menuData, setMenuData] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(
          `${ApiUrl}/menu/menus-recipes?continent=${continent}`
        );
        if (!response.ok) {
          throw new Error("The network response was not OK");
        }
        const data = await response.json();
        const filterData = data.filter(
          (item) => item.continent.toLowerCase() === continent.toLowerCase()
        );
        setMenuData(filterData);
        changeColors(continent);
        setActiveTab("Description");

        const starter = filterData.find(
          (item) => item.type.toLowerCase() === "entrée"
        );
        setActiveMenu(starter);
      } catch (err) {
        console.error("Menu data recovery failed :", err);
      }
    };
    fetchMenuData();
  }, [continent]);

  const countries = [...new Set(menuData.map((item) => item.country))];

  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
  };

  const getMenuImage = (continentImage, type) => {
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
      case "amerique":
        switch (type.toLowerCase()) {
          case "entrée":
            return imageMenu9;
          case "plat":
            return imageMenu10;
          case "dessert":
            return imageMenu11;
          case "cocktail":
            return imageMenu12;
          default:
            return null;
        }
      case "asie":
        switch (type.toLowerCase()) {
          case "entrée":
            return imageMenu13;
          case "plat":
            return imageMenu14;
          case "dessert":
            return imageMenu15;
          case "cocktail":
            return imageMenu16;
          default:
            return null;
        }
      case "oceanie":
        switch (type.toLowerCase()) {
          case "entrée":
            return imageMenu17;
          case "plat":
            return imageMenu18;
          case "dessert":
            return imageMenu19;
          case "cocktail":
            return imageMenu20;
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
          <h1 className="menu-title">
            {continent.charAt(0).toUpperCase() +
              continent.slice(1).toLowerCase()}
          </h1>
          {countries.map((country) => {
            const countryMenuData = menuData.filter(
              (item) => item.country === country
            );
            return (
              <div key={country} className="menu-item">
                <h2>Menu {country}</h2>
                <div className="menu-container">
                  <div className={`sidebar ${activeMenu ? "active" : ""}`}>
                    <button
                      type="button"
                      className={`tab-button ${activeTab === "Description" ? "active" : ""}`}
                      onClick={() => setActiveTab("Description")}
                    >
                      <img
                        src={imageTab1}
                        alt="Description"
                        className="tab-icon"
                      />
                    </button>
                    <button
                      type="button"
                      className={`tab-button ${activeTab === "Ingrédients" ? "active" : ""}`}
                      onClick={() => setActiveTab("Ingrédients")}
                    >
                      <img
                        src={imageTab2}
                        alt="Ingrédients"
                        className="tab-icon"
                      />
                    </button>
                    <button
                      type="button"
                      className={`tab-button ${activeTab === "Préparation" ? "active" : ""}`}
                      onClick={() => setActiveTab("Préparation")}
                    >
                      <img
                        src={imageTab3}
                        alt="Préparation"
                        className="tab-icon"
                      />
                    </button>
                  </div>
                  <div className="menu-section">
                    {["entrée", "plat", "dessert", "cocktail"].map((type) => {
                      const menuItem = countryMenuData.find(
                        (item) => item.type.toLowerCase() === type
                      );
                      return (
                        menuItem && (
                          <div
                            key={type}
                            className={`menu-subsection ${activeMenu?.name === menuItem.name ? "selected" : ""}`}
                            onClick={() => handleMenuClick(menuItem)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                handleMenuClick(menuItem);
                              }
                            }}
                            role="button"
                            tabIndex={0}
                          >
                            <h3>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </h3>
                            <p>{menuItem.name || "s/o"}</p>
                            <img
                              src={getMenuImage(continent, type)}
                              alt={type}
                              aria-hidden="true"
                            />
                            <p>Temps : {menuItem.step_time || "s/o"}</p>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>

                {activeTab === "Ingrédients" && activeMenu && (
                  <div className="ingredient-section">
                    <h3>{activeMenu.name}</h3>
                    <h4>Les ingrédients - 4 personnes</h4>
                    <p>{activeMenu.ingredient || "s/o"}</p>
                  </div>
                )}

                {activeTab === "Préparation" && activeMenu && (
                  <div className="ingredient-section">
                    <h3>{activeMenu.name}</h3>
                    <h4>La préparation</h4>
                    <p>{activeMenu.step || "s/o"}</p>
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
