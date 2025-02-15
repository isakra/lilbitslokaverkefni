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
      prevSelected.some((d) => d.idDrink === drink.idDrink)
        ? prevSelected.filter((d) => d.idDrink !== drink.idDrink)
        : [...prevSelected, drink]
    );
  };

  const goToOrderScreen = () => {
    if (selectedDrinks.length > 0) {
      localStorage.setItem("selectedDrinks", JSON.stringify(selectedDrinks)); // Save to localStorage
    }
    router.push("/order");
  };

  return (
    <div>
      <h1>Select Drinks</h1>
      {drinks.length > 0 ? (
        drinks.map((drink) => (
          <div key={drink.idDrink}>
            <input
              type="checkbox"
              checked={selectedDrinks.some((d) => d.idDrink === drink.idDrink)}
              onChange={() => toggleDrinkSelection(drink)}
            />
            {drink.strDrink}
          </div>
        ))
      ) : (
        <p>Loading drinks...</p>
      )}
      <button onClick={goToOrderScreen} disabled={selectedDrinks.length === 0}>
        Next: Order Screen
      </button>
    </div>
  );
};

export default SelectDrinks;
