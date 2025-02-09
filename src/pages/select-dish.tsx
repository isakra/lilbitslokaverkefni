import { useEffect, useState } from "react";
import { fetchRandomMeal } from "@/lib/api";
import { useRouter } from "next/router";

const SelectDish = () => {
  const [dish, setDish] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetchRandomMeal().then(setDish);
  }, []);

  const goToSelectDrinks = () => {
    router.push("/select-drinks");
  };

  return (
    <div>
      <h1>Select a Dish</h1>
      {dish && (
        <div>
          <h2>{dish.strMeal}</h2>
          <img src={dish.strMealThumb} alt={dish.strMeal} />
        </div>
      )}
      <button onClick={goToSelectDrinks}>Next: Select Drinks</button>
    </div>
  );
};

export default SelectDish;
