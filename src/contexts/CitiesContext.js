import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(function () {
    async function getCities() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok)
          throw new Error("Something went wrong with fetching the data.");
        const data = await res.json();
        setCities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider.");
  return context;
}

export { CitiesProvider, useCities };
