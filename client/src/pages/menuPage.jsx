import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./menus.css";
import imageTab1 from "../assets/images/description.png";
import imageTab2 from "../assets/images/ingredients.png";
import imageTab3 from "../assets/images/etapes.png";

const ApiUrl = import.meta.env.VITE_API_URL;

const changeColors = (continent) => {
  const root = document.documentElement;
  switch (continent) {
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
  const [selectedCountry, setSelectedCcountry] = useState([]);

  // function to get recipe
  const fetchMenuData = async () => {
    try {
      const response = await fetch(
        `${ApiUrl}/recipe/recipesByContinent?continent=${continent}`
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
        (item) => item.type.toLowerCase() === "starter"
      );
      setActiveMenu(starter);
    } catch (err) {
      console.error("Menu data recovery failed :", err);
    }
  };

  // function to get country
  const fetchMenu = async () => {
    try {
      const response = await fetch(
        `${ApiUrl}/menu/read?continent=${continent}`
      );
      if (!response.ok) {
        throw new Error("The network response was not OK");
      }
      const data = await response.json();

      const filterData = data.filter(
        (item) => item.continent.toLowerCase() === continent.toLowerCase()
      );

      setSelectedCcountry(filterData);
    } catch (err) {
      console.error("Menu data recovery failed :", err);
    }
  };

  useEffect(() => {
    fetchMenuData();
    fetchMenu();
  }, [continent]);

  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
  };

  const country = selectedCountry[0]?.country;

  const typeFrench = {
    starter: "Entrée",
    dish: "Plat",
    dessert: "Dessert",
    cocktail: "Cocktail"
  };

  return (
    <div className="content">
      {menuData.length > 0 ? (
        <>
          <h1 className="menu-title">
            {continent.charAt(0).toUpperCase() +
              continent.slice(1).toLowerCase()}
          </h1>
          <h2>
            Menu{" "}
            {country
              ? country.charAt(0).toUpperCase() + country.slice(1).toLowerCase()
              : "non défini"}
          </h2>
          <div className="menu-container">
            <div className={`sidebar ${activeMenu ? "active" : ""}`}>
              <button
                type="button"
                className={`tab-button ${
                  activeTab === "Description" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Description")}
              >
                <img src={imageTab1} alt="Description" className="tab-icon" />
              </button>
              <button
                type="button"
                className={`tab-button ${
                  activeTab === "Ingrédients" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Ingrédients")}
              >
                <img src={imageTab2} alt="Ingrédients" className="tab-icon" />
              </button>
              <button
                type="button"
                className={`tab-button ${
                  activeTab === "Préparation" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Préparation")}
              >
                <img src={imageTab3} alt="Préparation" className="tab-icon" />
              </button>
            </div>
            <div className="menu-section">
              {["starter", "dish", "dessert", "cocktail"].map((type) => {
                const menuItem = menuData.find(
                  (item) => item.type.toLowerCase() === type
                );
                return (
                  menuItem !== undefined && (
                    <div
                      key={type}
                      className={`menu-subsection ${
                        activeMenu?.name === menuItem.name ? "selected" : ""
                      }`}
                      onClick={() => handleMenuClick(menuItem)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleMenuClick(menuItem);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <h3>{typeFrench[type]}</h3>
                      <p>{menuItem.name || "s/o"}</p>
                      <img
                        src={
                          menuItem.image.startsWith("http")
                            ? menuItem.image
                            : `/images/${menuItem.image}`
                        }
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
          {activeTab === "Ingrédients" && activeMenu !== null && (
            <div className="ingredient-section">
              <h3>{activeMenu.name}</h3>
              <h4>Les ingrédients - 4 personnes</h4>
              <p>{activeMenu.ingredient || "s/o"}</p>
            </div>
          )}
          {activeTab === "Préparation" && activeMenu !== null && (
            <div className="ingredient-section">
              <h3>{activeMenu.name}</h3>
              <h4>La préparation</h4>
              <p>{activeMenu.step || "s/o"}</p>
            </div>
          )}
        </>
      ) : (
        <p>Aucun menu disponible pour ce continent.</p>
      )}
    </div>
  );
}

export default Menu;
