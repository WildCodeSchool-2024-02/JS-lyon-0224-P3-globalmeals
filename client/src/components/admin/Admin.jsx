import "./Admin.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [selectedContinent, setSelectedContinent] = useState("");
  const [newsForm, setNewsForm] = useState({
    continent: "",
    country: "",
    starterName: "",
    starterIngredients: "",
    starterSteps: "",
    dishName: "",
    dishIngredients: "",
    dishSteps: "",
    dessertName: "",
    dessertIngredients: "",
    dessertSteps: ""
  });

  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleContinentChange = (e) => {
    setSelectedContinent(e.target.value);
    setNewsForm({ ...newsForm, [e.target.name]: e.target.value });
  };

  const handleUpdateChange = (e) => {
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
      // Enregistrer les données de menu dans la table 'menu'
      const menuData = {
        continent: newsForm.continent,
        country: newsForm.country
      };

      const menuResponse = await fetch(`${ApiUrl}/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      });

      if (!menuResponse.ok) {
        throw new Error("Erreur lors de l'enregistrement du menu.");
      }

      const menuResponseData = await menuResponse.json(); // Parse la réponse JSON
      const menuId = menuResponseData.insertId; // Récupère l'ID du menu créé

      // Enregistrer les données de recette dans la table 'recipe'
      const recipeData = {
        name: newsForm.starterName,
        ingredient: newsForm.starterIngredients, // Correction de la clé à 'ingredients'
        step: newsForm.starterSteps,
        type: "starter", // Ajoutez le type selon votre logique (entrée, plat, dessert, etc.)
        menu_id: menuId // Utilisez l'ID du menu créé
      };

           const recipeResponse = await fetch(`${ApiUrl}/recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

    
      if (!recipeResponse.ok) {
        throw new Error("Erreur lors de l'enregistrement de la recette.");
      }

      alert("Le formulaire a été validé avec succès !");
      if (formRef.current) {
        formRef.current.reset();
      }
      setSelectedContinent("");
      setNewsForm({
        continent: "",
        country: "",
        name: "",
        ingredient: "",
        step: "",
        dishName: "",
        dishIngredients: "",
        dishSteps: "",
        dessertName: "",
        dessertIngredients: "",
        dessertSteps: ""
      });

      // Enregistrer le pays sélectionné avec une clé spécifique au continent
      localStorage.setItem(
        `selectedCountry_${newsForm.continent.toLowerCase()}`,
        newsForm.country
      );

      navigate(`/menuPage/${newsForm.continent.toLowerCase()}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Erreur lors de la soumission du formulaire.");
    }
  };

  return (
    <div className="create-menu">
      <h1>Création d'un menu</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="admin-continent">
          <label htmlFor="continent">
            Continents:
            <select
              id="continent"
              className="select-continent"
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
              onChange={handleUpdateChange}
              onInput={adjustTextareaHeight}
            />
          </label>
        </div>

        <div>
          <h2>Entrée</h2>
          <div className="new-starter">
            <label htmlFor="starterName">
              Nom de l'entrée:
              <textarea
                id="starterName"
                name="starterName"
                placeholder="Nom de l'entrée"
                value={newsForm.starterName}
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="starterIngredients">
              Ingrédients:
              <textarea
                id="starterIngredients"
                name="starterIngredients"
                placeholder="Ingrédients"
                value={newsForm.starterIngredients}
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="starterSteps">
              Étapes:
              <textarea
                id="starterSteps"
                name="starterSteps"
                placeholder="Étapes"
                value={newsForm.starterSteps}
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
          </div>
        </div>

        <div>
          <h2>Plat</h2>
          <div className="new-dish">
            <label htmlFor="dishName">
              Nom du plat:
              <textarea
                id="dishName"
                name="dishName"
                placeholder="Nom du Plat"
                value={newsForm.dishName}
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dishIngredients">
              Ingrédients:
              <textarea
                id="dishIngredients"
                name="dishIngredients"
                placeholder="Ingrédients"
                value={newsForm.dishIngredients}
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dishSteps">
              Étapes:
              <textarea
                id="dishSteps"
                name="dishSteps"
                placeholder="Étapes"
                value={newsForm.dishSteps}
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
          </div>
        </div>

        <div>
          <h2>Dessert</h2>
          <div className="new-dessert">
            <label htmlFor="dessertName">
              Nom du dessert:
              <textarea
                id="dessertName"
                name="dessertName"
                placeholder="Nom du Dessert"
                value={newsForm.dessertName}
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dessertIngredients">
              Ingrédients:
              <textarea
                id="dessertIngredients"
                name="dessertIngredients"
                placeholder="Ingrédients"
                value={newsForm.dessertIngredients}
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dessertSteps">
              Étapes:
              <textarea
                id="dessertSteps"
                name="dessertSteps"
                placeholder="Étapes"
                value={newsForm.dessertSteps}
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
          </div>
        </div>

        <button type="submit">
          Valider
        </button>
      </form>
    </div>
  );
}

export default Admin;
