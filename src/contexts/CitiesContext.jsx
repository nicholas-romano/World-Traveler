import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { useLocalStorageState } from "../../data/useLocalStorageState";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unkown action type");
  }
}

function CitiesProvider({ children }) {
  CitiesProvider.propTypes = {
    children: PropTypes.object,
  };

  const [visitedCities, setVisitedCities] = useLocalStorageState(
    [],
    "visited-cities"
  );

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        dispatch({ type: "cities/loaded", payload: visitedCities });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data",
        });
      }
    }
    fetchCities();
  }, [visitedCities]);

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      setVisitedCities((visitedCities) => [...visitedCities, newCity]);
      dispatch({ type: "city/created", payload: newCity });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city.",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const cities = visitedCities.filter((city) => city.id !== id);
      setVisitedCities(cities);
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting this city.",
      });
    }
  }

  const getCity = useCallback(
    async function getCity(id) {
      if (id === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const foundCity = visitedCities.find((city) => city.id === id);
        dispatch({ type: "city/loaded", payload: foundCity });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city.",
        });
      }
    },
    [currentCity, visitedCities]
  );

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider.");
  return context;
}

export { CitiesProvider, useCities };
