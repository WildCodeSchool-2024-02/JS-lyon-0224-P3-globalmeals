// // src/components/admin/Admin.jsx
// import "./Admin.css";
// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelection } from "../../contexts/SelectionContext";

// const createInitialFormState = () => ({
//   id: "",
//   country: "",
//   starterId: "",
//   starterName: "",
//   starterIngredients: "",
//   starterSteps: "",
//   dishId: "",
//   dishName: "",
//   dishIngredients: "",
//   dishSteps: "",
//   dessertId: "",
//   dessertName: "",
//   dessertIngredients: "",
//   dessertSteps: "",
// });

// function Admin() {
//   const { selectedContinent, setSelectedContinent, setSelectedCountry } =
//     useSelection();
//   const [newsForm, setNewsForm] = useState({
//     europe: createInitialFormState(),
//     afrique: createInitialFormState(),
//     amerique: createInitialFormState(),
//     asie: createInitialFormState(),
//     oceanie: createInitialFormState(),
//   });

//   const formRef = useRef(null);
//   const navigate = useNavigate();

//   const continentMap = {
//     1: "europe",
//     2: "afrique",
//     3: "amerique",
//     4: "asie",
//     5: "oceanie",
//   };

//   const handleContinentChange = (e) => {
//     setSelectedContinent(e.target.value);
//   };

//   const handleUpdateChange = (e) => {
//     const { name, value } = e.target;
//     setNewsForm((prevState) => ({
//       ...prevState,
//       [continentMap[selectedContinent]]: {
//         ...prevState[continentMap[selectedContinent]],
//         [name]: value,
//       },
//     }));
//   };

//   const adjustTextareaHeight = (e) => {
//     e.target.style.height = "auto";
//     e.target.style.height = `${e.target.scrollHeight}px`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const ApiUrl = import.meta.env.VITE_API_URL;

//     try {
//       const continentData = newsForm[continentMap[selectedContinent]];
//       const menuId = selectedContinent;

//       const menuData = {
//         id: menuId,
//         country: continentData.country,
//       };

//       const menuResponse = await fetch(`${ApiUrl}/menu`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(menuData),
//       });

//       if (!menuResponse.ok) {
//         throw new Error("Erreur lors de la mise à jour du menu.");
//       }

//       const recipeTypes = ["starter", "dish", "dessert"];
//       const recipePromises = recipeTypes.map((type) => {
//         const idField = `${type}Id`;
//         const nameField = `${type}Name`;
//         const ingredientsField = `${type}Ingredients`;
//         const stepsField = `${type}Steps`;

//         const recipeData = {
//           id: continentData[idField],
//           name: continentData[nameField],
//           ingredient: continentData[ingredientsField],
//           step: continentData[stepsField],
//           menu_id: menuId,
//           type,
//         };

//         return fetch(`${ApiUrl}/recipe`, {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(recipeData),
//         });
//       });

//       await Promise.all(recipePromises);

//       alert("Le formulaire a été validé avec succès !");
//       if (formRef.current) {
//         formRef.current.reset();
//       }
//       setSelectedContinent("");
//       setNewsForm({
//         europe: createInitialFormState(),
//         afrique: createInitialFormState(),
//         amerique: createInitialFormState(),
//         asie: createInitialFormState(),
//         oceanie: createInitialFormState(),
//       });

//       setSelectedCountry(continentData.country);

//       navigate(`/menuPage/${continentMap[selectedContinent]}`);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Erreur lors de la soumission du formulaire.");
//     }
//   };

//   return (
//     <div className="create-menu">
//       <h1>Création d'un menu</h1>
//       <form onSubmit={handleSubmit} ref={formRef}>
//         <div className="admin-continent">
//           <label htmlFor="continent">
//             Continents:
//             <select
//               id="continent"
//               className="select-continent"
//               name="continent"
//               value={selectedContinent}
//               onChange={handleContinentChange}
//             >
//               <option value="">Sélectionner</option>
//               <option value="1">Europe</option>
//               <option value="2">Afrique</option>
//               <option value="3">Amérique</option>
//               <option value="4">Asie</option>
//               <option value="5">Océanie</option>
//             </select>
//           </label>
//           <label htmlFor="country">
//             Pays:
//             <textarea
//               id="country"
//               name="country"
//               placeholder="Nom du Pays"
//               value={newsForm[continentMap[selectedContinent]]?.country || ""}
//               onChange={handleUpdateChange}
//               onInput={adjustTextareaHeight}
//             />
//           </label>
//           <input
//             type="hidden"
//             name="id"
//             value={newsForm[continentMap[selectedContinent]]?.id || ""}
//           />
//         </div>

//         <div>
//           <h2>Entrée</h2>
//           <div className="new-starter">
//             <input
//               type="hidden"
//               name="starterId"
//               value={newsForm[continentMap[selectedContinent]]?.starterId || ""}
//             />
//             <label htmlFor="starterName">
//               Nom de l'entrée:
//               <textarea
//                 id="starterName"
//                 name="starterName"
//                 placeholder="Nom de l'entrée"
//                 value={
//                   newsForm[continentMap[selectedContinent]]?.starterName || ""
//                 }
//                 onChange={handleUpdateChange}
//                 onInput={adjustTextareaHeight}
//               />
//             </label>
//             <label htmlFor="starterIngredients">
//               Ingrédients:
//               <textarea
//                 id="starterIngredients"
//                 name="starterIngredients"
//                 placeholder="Ingrédients"
//                 value={
//                   newsForm[continentMap[selectedContinent]]
//                     ?.starterIngredients || ""
//                 }
//                 onChange={handleUpdateChange}
//                 onInput={adjustTextareaHeight}
//               />
//             </label>
//             <label htmlFor="starterSteps">
//               Étapes:
//               <textarea
//                 id="starterSteps"
//                 name="starterSteps"
//                 placeholder="Étapes"
//                 value={
//                   newsForm[continentMap[selectedContinent]]?.starterSteps || ""
//                 }
//                 onChange={handleUpdateChange}
//                 onInput={adjustTextareaHeight}
//               />
//             </label>
//           </div>
//         </div>

//         <div>
//           <h2>Plat</h2>
//           <div className="new-dish">
//             <label htmlFor="dishName">
//               Nom du plat:
//               <textarea
//                 id="dishName"
//                 name="dishName"
//                 placeholder="Nom du Plat"
//                 value={
//                   newsForm[continentMap[selectedContinent]]?.dishName || ""
//                 }
//                 onChange={handleUpdateChange}
//                 onInput={adjustTextareaHeight}
//               />
//             </label>
//             <label htmlFor="dishIngredients">
//               Ingrédients:
//               <textarea
//                 id="dishIngredients"
//                 name="dishIngredients"
//                 placeholder="Ingrédients"
//                 value={
//                   newsForm[continentMap[selectedContinent]]?.dishIngredients ||
//                   ""
//                 }
//                 onChange={handleUpdateChange}
//                 onInput={adjustTextareaHeight}
//               />
//             </label>
//             <label htmlFor="dishSteps">
//               Étapes:
//               <textarea
//                 id="dishSteps"
//                 name="dishSteps"
//                 placeholder="Étapes"
//                 value={
//                   newsForm[continentMap[selectedContinent]]?.dishSteps || ""
//                 }
//                 onChange={handleUpdateChange}
//                 onInput={adjustTextareaHeight}
//               />
//             </label>
//           </div>
//         </div>

//         <div>
//           <h2>Dessert</h2>
//           <div className="new-dessert">
//             <label htmlFor="dessertName">
//               Nom du dessert:
//               <textarea
//                 id="dessertName"
//                 name="dessertName"
//                 placeholder="Nom du Dessert"
//                 value={
//                   newsForm[continentMap[selectedContinent]]?.dessertName || ""
//                 }
//                 onChange={handleUpdateChange}
//                 onInput={adjustTextareaHeight}
//               />
//             </label>
//             <label htmlFor="dessertIngredients">
//               Ingrédients:
//               <textarea
//                 id="dessertIngredients"
//                 name="dessertIngredients"
//                 placeholder="Ingrédients"
//                 value={
//                   newsForm[continentMap[selectedContinent]]
//                     ?.dessertIngredients || ""
//                 }
//                 onChange={handleUpdateChange}
//                 onInput={adjustTextareaHeight}
//               />
//             </label>
//             <label htmlFor="dessertSteps">
//               Étapes:
//               <textarea
//                 id="dessertSteps"
//                 name="dessertSteps"
//                 placeholder="Étapes"
//                 value={
//                   newsForm[continentMap[selectedContinent]]?.dessertSteps || ""
//                 }
//                 onChange={handleUpdateChange}
//                 onInput={adjustTextareaHeight}
//               />
//             </label>
//           </div>
//         </div>

//         <button type="submit">Valider</button>
//       </form>
//     </div>
//   );
// }

// export default Admin;

// src/components/admin/Admin.jsx
import "./Admin.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelection } from "../../contexts/SelectionContext";

const createInitialFormState = () => ({
  id: "",
  country: "",
  starterId: "",
  starterName: "",
  starterIngredients: "",
  starterSteps: "",
  dishId: "",
  dishName: "",
  dishIngredients: "",
  dishSteps: "",
  dessertId: "",
  dessertName: "",
  dessertIngredients: "",
  dessertSteps: "",
});

function Admin() {
  const { selectedContinent, setSelectedContinent, setSelectedCountry } =
    useSelection();
  const [newsForm, setNewsForm] = useState({
    europe: createInitialFormState(),
    afrique: createInitialFormState(),
    amerique: createInitialFormState(),
    asie: createInitialFormState(),
    oceanie: createInitialFormState(),
  });

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
      const menuId = selectedContinent;

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

      const recipeTypes = ["starter", "dish", "dessert"];
      const recipePromises = recipeTypes.map((type) => {
        const idField = `${type}Id`;
        const nameField = `${type}Name`;
        const ingredientsField = `${type}Ingredients`;
        const stepsField = `${type}Steps`;

        const recipeData = {
          id: continentData[idField],
          name: continentData[nameField],
          ingredient: continentData[ingredientsField],
          step: continentData[stepsField],
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

      alert("Le formulaire a été validé avec succès !");
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

      setSelectedCountry(continentData.country);

      navigate(`/menuPage/${continentMap[selectedContinent]}`);
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
          <div className="new-starter">
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
          </div>
        </div>

        <button type="submit">Valider</button>
      </form>
    </div>
  );
}

export default Admin;
