// Importation du fichier CSS pour appliquer les styles au composant Admin.
import "./Admin.css";

// Importation des hooks useState, useRef, et useEffect de React.
import { useState, useRef, useEffect } from "react";

// Importation de useNavigate pour la navigation et de toast pour les notifications.
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Importation du contexte utilisateur pour accéder aux informations sur l'utilisateur connecté.
import { useUserContext } from "../../contexts/UserContext";

// Fonction qui crée et renvoie l'état initial du formulaire pour chaque continent.
const createInitialFormState = () => ({
  id: "",
  country: "",
  starterId: "",
  starterName: "",
  starterIngredients: "",
  starterSteps: "",
  starterStepTime: "",
  starterImageUrl: "",
  dishId: "",
  dishName: "",
  dishIngredients: "",
  dishSteps: "",
  dishStepTime: "",
  dishImageUrl: "",
  dessertId: "",
  dessertName: "",
  dessertIngredients: "",
  dessertSteps: "",
  dessertStepTime: "",
  dessertImageUrl: "",
  cocktailId: "",
  cocktailName: "",
  cocktailIngredients: "",
  cocktailSteps: "",
  cocktailStepTime: "",
  cocktailImageUrl: "",
});

// Composant Admin pour gérer les modifications des menus par continent.
function Admin() {
  // État pour le continent sélectionné et pour les données du formulaire.
  const [selectedContinent, setSelectedContinent] = useState("");
  const [newsForm, setNewsForm] = useState({
    europe: createInitialFormState(),
    afrique: createInitialFormState(),
    amerique: createInitialFormState(),
    asie: createInitialFormState(),
    oceanie: createInitialFormState(),
  });

  // Fonctions pour afficher des notifications de succès ou d'erreur.
  const notifySuccess = (text) => toast.success(text);
  const notifyFail = (text) => toast.error(text);

  // Utilisation de useRef pour référencer le formulaire pour le réinitialiser plus tard.
  const formRef = useRef(null);

  // Utilisation de useNavigate pour rediriger l'utilisateur en cas de besoin.
  const navigate = useNavigate();

  // Récupération de l'utilisateur depuis le contexte utilisateur.
  const { user } = useUserContext();

  // Vérifie si l'utilisateur est admin. Si non, redirige vers la page d'accueil.
  useEffect(() => {
    if (!(user !== "" && user.role === "admin")) {
      navigate("/");
    }
  }, [user, navigate]);

  // Mapping des numéros de continent à leurs noms pour faciliter l'accès aux données.
  const continentMap = {
    1: "europe",
    2: "afrique",
    3: "amerique",
    4: "asie",
    5: "oceanie",
  };

  // Gestionnaire pour changer le continent sélectionné.
  const handleContinentChange = (e) => {
    setSelectedContinent(e.target.value);
  };

  // Gestionnaire pour mettre à jour l'état du formulaire lorsque l'utilisateur modifie les champs.
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

  // Ajuste la hauteur des zones de texte automatiquement en fonction du contenu.
  const adjustTextareaHeight = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Gestionnaire pour soumettre le formulaire.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire par défaut.

    const ApiUrl = import.meta.env.VITE_API_URL; // Récupère l'URL de l'API depuis les variables d'environnement.

    try {
      const continentData = newsForm[continentMap[selectedContinent]];
      const menuId = selectedContinent;

      // Mise à jour des données du menu pour le continent sélectionné.
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
        throw new Error("Erreur lors de la mise à jour du menu."); // Lève une erreur si la mise à jour échoue.
      }

      // Mise à jour des recettes (entrée, plat, dessert, cocktail) pour le menu sélectionné.
      const recipeTypes = ["starter", "dish", "dessert", "cocktail"];
      const recipePromises = recipeTypes.map(async (type) => {
        const idField = `${type}Id`;
        const nameField = `${type}Name`;
        const ingredientsField = `${type}Ingredients`;
        const stepsField = `${type}Steps`;
        const stepTimeField = `${type}StepTime`;
        const imageUrlField = `${type}ImageUrl`;

        const recipeData = {
          id: continentData[idField],
          menu_id: menuId,
          type,
        };

        // Ajoute uniquement les champs qui ne sont pas vides.
        if (continentData[nameField])
          recipeData.name = continentData[nameField];
        if (continentData[ingredientsField])
          recipeData.ingredient = continentData[ingredientsField];
        if (continentData[stepsField])
          recipeData.step = continentData[stepsField];
        if (continentData[stepTimeField])
          recipeData.step_time = continentData[stepTimeField];
        if (continentData[imageUrlField])
          recipeData.image = continentData[imageUrlField];

        // Envoie la requête de mise à jour de la recette.
        return fetch(`${ApiUrl}/recipe`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipeData),
        });
      });

      // Attend que toutes les requêtes de mise à jour soient complétées.
      await Promise.all(recipePromises);

      notifySuccess("Le formulaire a été validé avec succès !"); // Notifie l'utilisateur du succès.

      // Réinitialise le formulaire et redirige l'utilisateur vers la page du menu mis à jour.
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
      console.error("Error submitting form:", error); // Affiche l'erreur en cas d'échec.
      notifyFail("Erreur lors de la soumission du formulaire.");
    }
  };

  return (
    <div className="create-menu">
      <h1>Modifier un menu</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        {/* Sélection du continent à modifier */}
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

        {/* Section pour modifier les informations sur l'entrée */}
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
            <label htmlFor="starterImageUrl">
              Lien de l'image:
              <textarea
                id="starterImageUrl"
                name="starterImageUrl"
                placeholder="Lien de l'image"
                value={
                  newsForm[continentMap[selectedContinent]]?.starterImageUrl ||
                  ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
          </div>
        </div>

        {/* Section pour modifier les informations sur le plat principal */}
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
            <label htmlFor="dishImageUrl">
              Lien de l'image:
              <textarea
                id="dishImageUrl"
                name="dishImageUrl"
                placeholder="Lien de l'image"
                value={
                  newsForm[continentMap[selectedContinent]]?.dishImageUrl || ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
          </div>
        </div>

        {/* Section pour modifier les informations sur le dessert */}
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
            <label htmlFor="dessertImageUrl">
              Lien de l'image:
              <textarea
                id="dessertImageUrl"
                name="dessertImageUrl"
                placeholder="Lien de l'image"
                value={
                  newsForm[continentMap[selectedContinent]]?.dessertImageUrl ||
                  ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
          </div>
        </div>

        {/* Section pour modifier les informations sur le cocktail */}
        <div>
          <h2>Cocktail</h2>
          <div>
            <label htmlFor="cocktailName">
              Nom du cocktail:
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
            <label htmlFor="cocktailImageUrl">
              Lien de l'image:
              <textarea
                id="cocktailImageUrl"
                name="cocktailImageUrl"
                placeholder="Lien de l'image"
                value={
                  newsForm[continentMap[selectedContinent]]?.cocktailImageUrl ||
                  ""
                }
                onChange={handleUpdateChange}
                onInput={adjustTextareaHeight}
              />
            </label>
          </div>
        </div>

        {/* Bouton pour soumettre le formulaire */}
        <button type="submit">Valider</button>
      </form>
    </div>
  );
}

// Exportation du composant Admin pour l'utiliser dans d'autres parties de l'application.
export default Admin;
