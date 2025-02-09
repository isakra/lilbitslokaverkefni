import axios from "axios";

// Define TypeScript interfaces for API responses
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface MealResponse {
  meals: Meal[];
}

interface DrinksResponse {
  drinks: Drink[];
}

// ✅ Fetch a random meal
export const fetchRandomMeal = async (): Promise<Meal> => {
  const res = await axios.get<MealResponse>("https://themealdb.com/api/json/v1/1/random.php");
  return res.data.meals[0]; // ✅ Ensures a value is returned
};

// ✅ Fetch drinks (Fixed syntax error)
export const fetchDrinks = async (): Promise<Drink[]> => {
  const res = await axios.get<DrinksResponse>("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic");
  return res.data.drinks; // ✅ Ensures a value is returned
};
