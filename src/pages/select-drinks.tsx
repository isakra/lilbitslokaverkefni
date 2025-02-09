import { useEffect, useState } from "react";
import { fetchDrinks } from "@/lib/api";
import { useRouter } from "next/router";

const SelectDrinks = () => {
  const [drinks, setDrinks] = useState<any[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchDrinks().then(setDrinks);
  }, []);

  const toggleDrinkSelection = (drink: any) => {
    setSelectedDrinks((prevSelected) =>
      prevSelected.includes(drink)
        ? prevSelected.filter((d) => d.idDrink !== drink.idDrink)
        : [...prevSelected, drink]
    );
  };

  const goToOrderScreen = () => {
    router.push("/order");
  };

  return (
    <div>
      <h1>Select Drinks</h1>
      {drinks.map((drink) => (
        <div key={drink.idDrink}>
          <input
            type="checkbox"
            checked={selectedDrinks.includes(drink)}
            onChange={() => toggleDrinkSelection(drink)}
          />
          {drink.strDrink}
        </div>
      ))}
      <button onClick={goToOrderScreen}>Next: Order Screen</button>
    </div>
  );
};

export default SelectDrinks;
