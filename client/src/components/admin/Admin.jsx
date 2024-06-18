import "./Admin.css";
import { useState } from "react";

function Admin() {
  const [selectedContinent, setSelectedContinent] = useState("");

  const handleContinentChange = (e) => {
    setSelectedContinent(e.target.value);
  };

  const adjustTextareaHeight = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="createMenu">
      <div>
        <h1>Création d'un menu</h1>
        <form className="adminContinent">
          <label htmlFor="continent">
            Continents:
            <select
              id="continent"
              className="selectContinent"
              value={selectedContinent}
              onChange={handleContinentChange}
            >
              <option value="">Sélectionner</option>
              <option value="europe">Europe</option>
              <option value="afrique">Afrique</option>
              <option value="amerique">Amérique</option>
              <option value="asie">Asie</option>
              <option value="oceanie">Océanie</option>
            </select>
          </label>
          <label htmlFor="country">
            Pays:
            <textarea
              id="country"
              placeholder="Nom du Pays"
              onInput={adjustTextareaHeight}
            />
          </label>
        </form>
      </div>
      <div>
        <h2>Entrée</h2>
        <form className="newStarter">
          <label htmlFor="starterName">
            Nom de l'entrée:
            <textarea
              id="starterName"
              placeholder="Nom de l'entrée"
              onInput={adjustTextareaHeight}
            />
          </label>
          <label htmlFor="starterIngredients">
            Ingrédients:
            <textarea
              id="starterIngredients"
              placeholder="Ingrédients"
              onInput={adjustTextareaHeight}
            />
          </label>
          <label htmlFor="starterSteps">
            Étapes:
            <textarea
              id="starterSteps"
              placeholder="Étapes"
              onInput={adjustTextareaHeight}
            />
          </label>
        </form>
      </div>
      <div>
        <h2>Plat</h2>
        <form className="newDish">
          <label htmlFor="dishName">
            Nom du plat:
            <textarea
              id="dishName"
              placeholder="Nom du Plat"
              onInput={adjustTextareaHeight}
            />
          </label>
          <label htmlFor="dishIngredients">
            Ingrédients:
            <textarea
              id="dishIngredients"
              placeholder="Ingrédients"
              onInput={adjustTextareaHeight}
            />
          </label>
          <label htmlFor="dishSteps">
            Étapes:
            <textarea
              id="dishSteps"
              placeholder="Étapes"
              onInput={adjustTextareaHeight}
            />
          </label>
        </form>
      </div>
      <div>
        <h2>Dessert</h2>
        <form className="newDessert">
          <label htmlFor="dessertName">
            Nom du dessert:
            <textarea
              id="dessertName"
              placeholder="Nom du Dessert"
              onInput={adjustTextareaHeight}
            />
          </label>
          <label htmlFor="dessertIngredients">
            Ingrédients:
            <textarea
              id="dessertIngredients"
              placeholder="Ingrédients"
              onInput={adjustTextareaHeight}
            />
          </label>
          <label htmlFor="dessertSteps">
            Étapes:
            <textarea
              id="dessertSteps"
              placeholder="Étapes"
              onInput={adjustTextareaHeight}
            />
          </label>
        </form>
      </div>
      <button type="button">Valider</button>
    </div>
  );
}

export default Admin;
