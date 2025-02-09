import { useEffect, useState } from "react";
import { fetchDrinks } from "../lib/api";

const SelectDrinks = () => {
  const [drinks, setDrinks] = useState<any[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<any[]>([]);

  useEffect(() => {
    fetchDrinks().then(setDrinks);
  }, []);

  return (
    <div>
      <h1>Select Drinks</h1>
      {drinks.map((drink) => (
        <div key={drink.idDrink}>
          <input
            type="checkbox"
            onChange={() => setSelectedDrinks([...selectedDrinks, drink])}
          />
          {drink.strDrink}
        </div>
      ))}
    </div>
  );
};

export default SelectDrinks;
