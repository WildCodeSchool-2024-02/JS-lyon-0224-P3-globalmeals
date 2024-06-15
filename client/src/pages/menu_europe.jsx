import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./menus.css";
import imageTab1 from "../assets/images/description.png";
import imageTab2 from "../assets/images/ingredients.png";
import imageTab3 from "../assets/images/etapes.png";

function Menu() {
  const menuData = useLoaderData();
  const [text, setText] = useState();

  const handleTabClick = (newText) => {
    setText(newText);
  };

  return (
    <div className="content">
      <h1>Menu Europe</h1>
      {menuData.map((menu) => (
        <div key={menu.id} className="menu-item">
          <h2>{menu.name}</h2>
          <div className="menu-container">
            <div className="sidebar">
              <button
                type="button"
                className="tab-button"
                onClick={() => handleTabClick("Description")}
              >
                <img src={imageTab1} alt="Description" className="tab-icon" />
              </button>
              <button
                type="button"
                className="tab-button"
                onClick={() => handleTabClick("Ingrédients")}
              >
                <img src={imageTab2} alt="Ingrédients" className="tab-icon" />
              </button>
              <button
                type="button"
                className="tab-button"
                onClick={() => handleTabClick("Étapes")}
              >
                <img src={imageTab3} alt="Étapes" className="tab-icon" />
              </button>
            </div>
            <div className="menu-section">
              <div className="menu-subsection">
                <h3>Entrée</h3>
                <p>{menu.starter}</p>
                <img src={menu.picture_starter} alt={menu.starter} />
              </div>
              <div className="menu-subsection">
                <h3>Plat</h3>
                <p>{menu.dish}</p>
                <img src={menu.picture_dish} alt={menu.dish} />
              </div>
              <div className="menu-subsection">
                <h3>Dessert</h3>
                <p>{menu.dessert}</p>
                <img src={menu.picture_dessert} alt={menu.dessert} />
              </div>
              <div className="menu-subsection">
                <h3>Cocktail</h3>
                <p>{menu.cocktail}</p>
                <img src={menu.picture_cocktail} alt={menu.cocktail} />
              </div>
            </div>
          </div>
        </div>
      ))}
      <p>Temps de préparation : </p>
      <p>Temps de cuisson : </p>
      <p>{text}</p>
    </div>
  );
}

export default Menu;
