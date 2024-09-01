// Importation des hooks useState et useEffect de React.
import { useState, useEffect } from "react";

// Fonction utilitaire pour récupérer la valeur stockée dans localStorage.
function getStorageValue(key, defaultValue) {
  // Récupère la valeur stockée dans localStorage pour la clé spécifiée.
  let saved = localStorage.getItem(key) || "";

  // Si la valeur semble être un objet ou un tableau (JSON), elle est parsée en conséquence.
  if (saved.startsWith("{") || saved.startsWith("[")) saved = JSON.parse(saved);

  // Retourne la valeur stockée ou la valeur par défaut si aucune valeur n'est trouvée.
  return saved || defaultValue;
}

// Hook personnalisé pour gérer l'état avec persistance dans localStorage.
const useLocalStorage = (key, defaultValue) => {
  // Utilise useState pour initialiser l'état avec la valeur récupérée de localStorage.
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

  // Utilise useEffect pour mettre à jour localStorage chaque fois que la valeur change.
  useEffect(() => {
    // Si la valeur est un objet, elle est convertie en chaîne JSON avant d'être stockée.
    const storedVal = typeof value === "object" ? JSON.stringify(value) : value;

    // Stocke la valeur dans localStorage avec la clé spécifiée.
    localStorage.setItem(key, storedVal);
  }, [value, key]); // Dépendances : effectue la mise à jour lorsque `value` ou `key` change.

  // Retourne la valeur actuelle et la fonction pour la mettre à jour (similaire à useState).
  return [value, setValue];
};

// Exportation du hook personnalisé pour être utilisé dans d'autres composants.
export default useLocalStorage;
