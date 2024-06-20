import "./Admin.css";
import { useState, useRef } from "react";

function Admin() {
  const [selectedContinent, setSelectedContinent] = useState("");

  const [newsForm, setNewsForm] = useState({
    continent: "",
    country: "",
  });

  const formRef = useRef(null);

  const handleContinentChange = (e) => {
    setSelectedContinent(e.target.value);
    setNewsForm({ ...newsForm, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setNewsForm({ ...newsForm, [e.target.name]: e.target.value });
  };

  const adjustTextareaHeight = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ApiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${ApiUrl}/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newsForm),
      });

      if (response.ok === true) {
        alert("Le formulaire a été validé avec succès !");

        if (formRef.current === true) {
          formRef.current.reset();
        }
        setSelectedContinent("");
        setNewsForm({
          continent: "",
          country: "",
        });
      } else {
        alert("Erreur lors de la soumission du formulaire.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Erreur lors de la soumission du formulaire.");
    }
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
              name="continent"
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
              name="country"
              placeholder="Nom du Pays"
              value={newsForm.country}
              onChange={handleChange}
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
                name="starterName"
                placeholder="Nom de l'entrée"
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="starterIngredients">
              Ingrédients:
              <textarea
                id="starterIngredients"
                name="starterIngredients"
                placeholder="Ingrédients"
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="starterSteps">
              Étapes:
              <textarea
                id="starterSteps"
                name="starterSteps"
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
                name="dishName"
                placeholder="Nom du Plat"
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dishIngredients">
              Ingrédients:
              <textarea
                id="dishIngredients"
                name="dishIngredients"
                placeholder="Ingrédients"
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dishSteps">
              Étapes:
              <textarea
                id="dishSteps"
                name="dishSteps"
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
                name="dessertName"
                placeholder="Nom du Dessert"
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dessertIngredients">
              Ingrédients:
              <textarea
                id="dessertIngredients"
                name="dessertIngredients"
                placeholder="Ingrédients"
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dessertSteps">
              Étapes:
              <textarea
                id="dessertSteps"
                name="dessertSteps"
                placeholder="Étapes"
                onInput={adjustTextareaHeight}
              />
            </label>
          </div>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Valider
        </button>
      </form>
    </div>
  );
}

export default Admin;
