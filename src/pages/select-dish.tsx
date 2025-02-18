import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface Meal {
  strMeal: string;
  strMealThumb: string;
}

interface APIResponse {
  meals: Meal[];
}

const SelectDish = () => {
  const [dish, setDish] = useState<Meal | null>(null);
  const router = useRouter();

  const fetchDish = async () => {
    const res = await axios.get<APIResponse>("https://themealdb.com/api/json/v1/1/random.php");
    setDish(res.data.meals[0]);
  };

  useEffect(() => {
    fetchDish();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1>Select a Dish</h1>
      {dish && (
        <div>
          <h2>{dish.strMeal}</h2>
          <img src={dish.strMealThumb} alt={dish.strMeal} className="w-64 h-64 object-cover rounded-lg mt-2" />
        </div>
      )}
      <button onClick={fetchDish} className="bg-blue-600 text-white p-2 mt-2 rounded">
        Generate New Dish
      </button>
      <button onClick={() => router.push("/select-drinks")} className="bg-green-600 text-white p-2 mt-2 rounded">
        Next: Select Drinks
      </button>
    </div>
  );
};

export default SelectDish;
