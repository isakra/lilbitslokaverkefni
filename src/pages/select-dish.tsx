import { useEffect, useState } from "react";
import { fetchRandomMeal } from "@/lib/api";

const SelectDish = () => {
  const [dish, setDish] = useState<any>(null);

  useEffect(() => {
    fetchRandomMeal().then(setDish);
  }, []);

  return (
    <div>
      <h1>Select a Dish</h1>
      {dish && <p>{dish.strMeal}</p>}
    </div>
  );
};

export default SelectDish;
