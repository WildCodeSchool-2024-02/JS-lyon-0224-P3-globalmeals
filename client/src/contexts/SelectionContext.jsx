import { createContext, useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const SelectionContext = createContext();

export const useSelection = () => useContext(SelectionContext);

export function SelectionProvider({ children }) {
  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      const ApiUrl = import.meta.env.VITE_API_URL;
      if (selectedContinent) {
        try {
          const response = await fetch(`${ApiUrl}/menu/${selectedContinent}`);
          if (!response.ok) {
            throw new Error(
              "Erreur lors de la récupération des données du menu."
            );
          }
          const data = await response.json();
          setSelectedCountry(data.country);
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        }
      }
    };

    fetchInitialData();
  }, [selectedContinent]);

  const value = useMemo(
    () => ({
      selectedContinent,
      setSelectedContinent,
      selectedCountry,
      setSelectedCountry,
    }),
    [selectedContinent, selectedCountry]
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

SelectionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
