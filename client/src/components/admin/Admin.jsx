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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Le formulaire a été validé avec succès !");
    e.target.reset();
    setSelectedContinent("");
  };

  return (
    <div className="createMenu">
      <h1>Création d'un menu</h1>
      <form onSubmit={handleSubmit}>
        <div className="adminContinent">
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
        </div>
        <div>
          <h2>Entrée</h2>
          <div className="newStarter">
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
          </div>
        </div>
        <div>
          <h2>Plat</h2>
          <div className="newDish">
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
          </div>
        </div>
        <div>
          <h2>Dessert</h2>
          <div className="newDessert">
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
          </div>
        </div>
        <button type="submit">Valider</button>
      </form>
    </div>
  );
}

export default Admin;
