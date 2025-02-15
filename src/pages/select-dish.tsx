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
    if (dish) {
      localStorage.setItem("selectedDish", JSON.stringify(dish)); // Save to localStorage
    }
    router.push("/select-drinks");
  };

  return (
    <div>
      <h1>Select a Dish</h1>
      {dish ? (
        <div>
          <h2>{dish.strMeal}</h2>
          <img src={dish.strMealThumb} alt={dish.strMeal} width={200} />
        </div>
      ) : (
        <p>Loading dish...</p>
      )}
      <button onClick={goToSelectDrinks}>Next: Select Drinks</button>
    </div>
  );
};

export default SelectDish;
