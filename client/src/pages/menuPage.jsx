import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./menus.css";
import imageTab1 from "../assets/images/description.png";
import imageTab2 from "../assets/images/ingredients.png";
import imageTab3 from "../assets/images/etapes.png";

const ApiUrl = import.meta.env.VITE_API_URL;

function Menu() {
  const { continent } = useParams();
  const [menuData, setMenuData] = useState([]);
  const [activeMenuItem, setActiveMenuItem] = useState("Entrée");
  const [activeTab, setActiveTab] = useState("Description");

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`${ApiUrl}/menuPage/recipes?continent=${continent}`);
// soucis de fetch ici

        const data = await response.json();
        setMenuData(data);
      } catch (err) {
        console.error("Failed to fetch menu data:", err);
      }
    };
    fetchMenuData();
  }, [continent]);


  return (
    <div className="content">
      {menuData.length > 0 && (
        <>
          <h1 className="menu-title">{continent}</h1>
          <div className="menu-item">
            <h2>Menu {menuData[0].country}</h2>
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
                <div className={`menu-subsection ${activeMenuItem === "Entrée" ? "selected" : ""}`}>
                  <h3>Entrée</h3>
                  <p>{("Entrée")?.recipe_name || "s/o"}</p>
                  <img
                    src="/bruschetta.png"
                    alt="starter"
                    onClick={() => setActiveMenuItem("Entrée")}
                    aria-hidden="true"
                  />
                  <p>Temps : {("Entrée")?.step_time || "s/o"}</p>
                </div>
                <div className={`menu-subsection ${activeMenuItem === "Plat" ? "selected" : ""}`}>
                  <h3>Plat</h3>
                  <p>{("Plat")?.recipe_name || "s/o"}</p>
                  <img
                    src="/pasta.png"
                    alt="dish"
                    onClick={() => setActiveMenuItem("Plat")}
                    aria-hidden="true"
                  />
                  <p>Temps : {("Plat")?.step_time || "s/o"}</p>
                </div>
                <div className={`menu-subsection ${activeMenuItem === "Dessert" ? "selected" : ""}`}>
                  <h3>Dessert</h3>
                  <p>{("Dessert")?.recipe_name || "s/o"}</p>
                  <img
                    src="/tiramisu.png"
                    alt="dessert"
                    onClick={() => setActiveMenuItem("Dessert")}
                    aria-hidden="true"
                  />
                  <p>Temps : {("Dessert")?.step_time || "s/o"}</p>
                </div>
                <div className={`menu-subsection ${activeMenuItem === "Cocktail" ? "selected" : ""}`}>
                  <h3>Cocktail</h3>
                  <p>{("Cocktail")?.recipe_name || "s/o"}</p>
                  <img
                    src="/milano-torino.png"
                    alt="cocktail"
                    onClick={() => setActiveMenuItem("Cocktail")}
                    aria-hidden="true"
                  />
                  <p>Temps : {("Cocktail")?.step_time || "s/o"}</p>
                </div>
              </div>
            </div>
          </div>

          {activeTab === "Ingrédients" && activeMenuItem && (
            <div className="ingredient-section">
              <h3>{activeMenuItem}</h3>
              <h4>Les ingrédients - 4 personnes</h4>
              <p>
                {(activeMenuItem)?.ingredient || "s/o"}
              </p>
            </div>
          )}

          {activeTab === "Préparation" && activeMenuItem && (
            <div className="ingredient-section">
              <h3>{activeMenuItem}</h3>
              <h4>La préparation</h4>
              <p>
                {(activeMenuItem)?.step || "s/o"}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Menu;
