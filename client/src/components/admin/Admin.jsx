import "./Admin.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const createInitialFormState = () => ({
  id: "",
  country: "",
  starterId: "",
  starterName: "",
  starterIngredients: "",
  starterSteps: "",
  starterStepTime: "",
  dishId: "",
  dishName: "",
  dishIngredients: "",
  dishSteps: "",
  dishStepTime: "",
  dessertId: "",
  dessertName: "",
  dessertIngredients: "",
  dessertSteps: "",
  dessertStepTime: "",
  cocktailId: "",
  cocktailName: "",
  cocktailIngredients: "",
  cocktailSteps: "",
  cocktailStepTime: "",
});

function Admin() {
  const [selectedContinent, setSelectedContinent] = useState("");
  const [newsForm, setNewsForm] = useState({
    europe: createInitialFormState(),
    afrique: createInitialFormState(),
    amerique: createInitialFormState(),
    asie: createInitialFormState(),
    oceanie: createInitialFormState(),
  });
  const notifySuccess = (text) => toast.success(text);
  const notifyFail = (text) => toast.error(text);

  const formRef = useRef(null);
  const navigate = useNavigate();

  const continentMap = {
    1: "europe",
    2: "afrique",
    3: "amerique",
    4: "asie",
    5: "oceanie",
  };

  const handleContinentChange = (e) => {
    setSelectedContinent(e.target.value);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setNewsForm((prevState) => ({
      ...prevState,
      [continentMap[selectedContinent]]: {
        ...prevState[continentMap[selectedContinent]],
        [name]: value,
      },
    }));
  };

  const adjustTextareaHeight = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ApiUrl = import.meta.env.VITE_API_URL;

    try {
      const continentData = newsForm[continentMap[selectedContinent]];
      const menuId = selectedContinent; // Use the ID here

      const menuData = {
        id: menuId,
        country: continentData.country,
      };

      const menuResponse = await fetch(`${ApiUrl}/menu`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      });

      if (!menuResponse.ok) {
        throw new Error("Erreur lors de la mise à jour du menu.");
      }

      const recipeTypes = ["starter", "dish", "dessert", "cocktail"];
      const recipePromises = recipeTypes.map((type) => {
        const idField = `${type}Id`;
        const nameField = `${type}Name`;
        const ingredientsField = `${type}Ingredients`;
        const stepsField = `${type}Steps`;
        const stepTimeField = `${type}StepTime`;

        const recipeData = {
          id: continentData[idField],
          name: continentData[nameField],
          ingredient: continentData[ingredientsField],
          step: continentData[stepsField],
          step_time: continentData[stepTimeField],
          menu_id: menuId,
          type,
        };

        return fetch(`${ApiUrl}/recipe`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipeData),
        });
      });

      await Promise.all(recipePromises);

      notifySuccess("Le formulaire a été validé avec succès !");
      if (formRef.current) {
        formRef.current.reset();
      }
      setSelectedContinent("");
      setNewsForm({
        europe: createInitialFormState(),
        afrique: createInitialFormState(),
        amerique: createInitialFormState(),
        asie: createInitialFormState(),
        oceanie: createInitialFormState(),
      });

      navigate(`/menuPage/${continentMap[selectedContinent]}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      notifyFail("Erreur lors de la soumission du formulaire.");
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
              <option value="1">Europe</option>
              <option value="2">Afrique</option>
              <option value="3">Amérique</option>
              <option value="4">Asie</option>
              <option value="5">Océanie</option>
            </select>
          </label>
          <label htmlFor="country">
            Pays:
            <textarea
              id="country"
              name="country"
              placeholder="Nom du Pays"
              value={newsForm[continentMap[selectedContinent]]?.country || ""}
              onChange={handleUpdateChange}
              onInput={adjustTextareaHeight}
            />
          </label>
          <input
            type="hidden"
            name="id"
            value={newsForm[continentMap[selectedContinent]]?.id || ""}
          />
        </div>

        <div>
          <h2>Entrée</h2>
          <div>
            <input
              type="hidden"
              name="starterId"
              value={newsForm[continentMap[selectedContinent]]?.starterId || ""}
            />
            <label htmlFor="starterName">
              Nom de l'entrée:
              <textarea
                id="starterName"
                name="starterName"
                placeholder="Nom de l'entrée"
                value={
                  newsForm[continentMap[selectedContinent]]?.starterName || ""
                }
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
                value={
                  newsForm[continentMap[selectedContinent]]
                    ?.starterIngredients || ""
                }
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
                value={
                  newsForm[continentMap[selectedContinent]]?.starterSteps || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="starterStepTime">
              Temps des étapes:
              <textarea
                id="starterStepTime"
                name="starterStepTime"
                placeholder="Temps des étapes"
                value={
                  newsForm[continentMap[selectedContinent]]?.starterStepTime ||
                  ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
          </div>
        </div>

        <div>
          <h2>Plat</h2>
          <div>
            <label htmlFor="dishName">
              Nom du plat:
              <textarea
                id="dishName"
                name="dishName"
                placeholder="Nom du Plat"
                value={
                  newsForm[continentMap[selectedContinent]]?.dishName || ""
                }
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
                value={
                  newsForm[continentMap[selectedContinent]]?.dishIngredients ||
                  ""
                }
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
                value={
                  newsForm[continentMap[selectedContinent]]?.dishSteps || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dishStepTime">
              Temps des étapes:
              <textarea
                id="dishStepTime"
                name="dishStepTime"
                placeholder="Temps des étapes"
                value={
                  newsForm[continentMap[selectedContinent]]?.dishStepTime || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
          </div>
        </div>

        <div>
          <h2>Dessert</h2>
          <div>
            <label htmlFor="dessertName">
              Nom du dessert:
              <textarea
                id="dessertName"
                name="dessertName"
                placeholder="Nom du Dessert"
                value={
                  newsForm[continentMap[selectedContinent]]?.dessertName || ""
                }
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
                value={
                  newsForm[continentMap[selectedContinent]]
                    ?.dessertIngredients || ""
                }
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
                value={
                  newsForm[continentMap[selectedContinent]]?.dessertSteps || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="dessertStepTime">
              Temps des étapes:
              <textarea
                id="dessertStepTime"
                name="dessertStepTime"
                placeholder="Temps des étapes"
                value={
                  newsForm[continentMap[selectedContinent]]?.dessertStepTime ||
                  ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
          </div>
        </div>

        <div>
          <h2>Cocktail</h2>
          <div>
            <label htmlFor="cocktailName">
              Nom du dessert:
              <textarea
                id="cocktailName"
                name="cocktailName"
                placeholder="Nom du Cocktail"
                value={
                  newsForm[continentMap[selectedContinent]]?.cocktailName || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="cocktailIngredients">
              Ingrédients:
              <textarea
                id="cocktailIngredients"
                name="cocktailIngredients"
                placeholder="Ingrédients"
                value={
                  newsForm[continentMap[selectedContinent]]
                    ?.cocktailIngredients || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="cocktailSteps">
              Étapes:
              <textarea
                id="cocktailSteps"
                name="cocktailSteps"
                placeholder="Étapes"
                value={
                  newsForm[continentMap[selectedContinent]]?.cocktailSteps || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
            <label htmlFor="cocktailStepTime">
              Temps des étapes:
              <textarea
                id="cocktailStepTime"
                name="cocktailStepTime"
                placeholder="Temps des étapes"
                value={
                  newsForm[continentMap[selectedContinent]]?.cocktailStepTime ||
                  ""
                }
                onChange={handleUpdateChange}
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
