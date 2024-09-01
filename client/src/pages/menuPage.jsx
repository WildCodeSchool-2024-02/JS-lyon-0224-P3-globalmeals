// Importation des hooks nécessaires de React, React Router et des images utilisées pour les onglets.
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./menus.css";
import imageTab1 from "../assets/images/description.png";
import imageTab2 from "../assets/images/ingredients.png";
import imageTab3 from "../assets/images/etapes.png";

// Récupération de l'URL de l'API depuis les variables d'environnement.
const ApiUrl = import.meta.env.VITE_API_URL;

// Fonction utilitaire pour changer les couleurs en fonction du continent sélectionné.
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
  // Récupération du paramètre de route pour identifier le continent sélectionné.
  const { continent } = useParams();

  // États pour stocker les données du menu, le menu actif, l'onglet actif, et le pays sélectionné.
  const [menuData, setMenuData] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");
  const [selectedCountry, setSelectedCcountry] = useState([]);

  // Fonction pour récupérer les données de recettes en fonction du continent.
  const fetchMenuData = async () => {
    try {
      const response = await fetch(
        `${ApiUrl}/recipe/recipesByContinent?continent=${continent}`
      );
      if (!response.ok) {
        throw new Error("The network response was not OK");
      }
      const data = await response.json();

      // Filtrer les données pour ne garder que celles correspondant au continent.
      const filterData = data.filter(
        (item) => item.continent.toLowerCase() === continent.toLowerCase()
      );

      setMenuData(filterData);
      changeColors(continent); // Appliquer les couleurs selon le continent.
      setActiveTab("Description"); // Définir l'onglet actif sur "Description".

      // Définir l'entrée (starter) comme le menu actif par défaut.
      const starter = filterData.find(
        (item) => item.type.toLowerCase() === "starter"
      );
      setActiveMenu(starter);
    } catch (err) {
      console.error("Menu data recovery failed :", err);
    }
  };

  // Fonction pour récupérer les informations du pays correspondant au continent.
  const fetchMenu = async () => {
    try {
      const response = await fetch(
        `${ApiUrl}/menu/read?continent=${continent}`
      );
      if (!response.ok) {
        throw new Error("The network response was not OK");
      }
      const data = await response.json();

      // Filtrer les données pour ne garder que celles correspondant au continent.
      const filterData = data.filter(
        (item) => item.continent.toLowerCase() === continent.toLowerCase()
      );

      setSelectedCcountry(filterData); // Définir le pays sélectionné.
    } catch (err) {
      console.error("Menu data recovery failed :", err);
    }
  };

  // Effectue l'appel aux fonctions fetchMenuData et fetchMenu chaque fois que le continent change.
  useEffect(() => {
    fetchMenuData();
    fetchMenu();
  }, [continent]);

  // Fonction pour gérer le clic sur un menu pour le définir comme actif.
  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
  };

  // Récupère le pays sélectionné (premier élément de selectedCountry).
  const country = selectedCountry[0]?.country;

  // Traduction des types de plats en français pour l'affichage.
  const typeFrench = {
    starter: "Entrée",
    dish: "Plat",
    dessert: "Dessert",
    cocktail: "Cocktail",
  };

  return (
    <div className="content">
      {/* Si des données de menu sont disponibles, les afficher */}
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
            {/* Barre latérale avec les onglets pour changer de vue (Description, Ingrédients, Préparation) */}
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

            {/* Affichage des différents types de plats (Entrée, Plat, Dessert, Cocktail) */}
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

          {/* Affichage des ingrédients pour le plat actif */}
          {activeTab === "Ingrédients" && activeMenu !== null && (
            <div className="ingredient-section">
              <h3>{activeMenu.name}</h3>
              <h4>Les ingrédients - 4 personnes</h4>
              <p>{activeMenu.ingredient || "s/o"}</p>
            </div>
          )}

          {/* Affichage des étapes de préparation pour le plat actif */}
          {activeTab === "Préparation" && activeMenu !== null && (
            <div className="ingredient-section">
              <h3>{activeMenu.name}</h3>
              <h4>La préparation</h4>
              <p>{activeMenu.step || "s/o"}</p>
            </div>
          )}
        </>
      ) : (
        // Message affiché si aucun menu n'est disponible pour le continent sélectionné.
        <p>Aucun menu disponible pour ce continent.</p>
      )}
    </div>
  );
}

export default Menu;
