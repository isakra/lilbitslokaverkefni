import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const SelectDrinks = () => {
  const [drinks, setDrinks] = useState<any[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<any[]>([]);
  const [searchLetter, setSearchLetter] = useState("a"); // Default to 'a'
  const router = useRouter();

  useEffect(() => {
    fetchDrinks(searchLetter);
  }, [searchLetter]);

  const fetchDrinks = async (letter: string) => {
    try {
      const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
      setDrinks(res.data.drinks || []);
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };

  const toggleDrinkSelection = (drink: any) => {
    setSelectedDrinks((prevSelected) =>
      prevSelected.some((d) => d.idDrink === drink.idDrink)
        ? prevSelected.filter((d) => d.idDrink !== drink.idDrink)
        : [...prevSelected, drink]
    );
  };

  const goToOrderScreen = () => {
    if (selectedDrinks.length > 0) {
      localStorage.setItem("selectedDrinks", JSON.stringify(selectedDrinks));
    }
    router.push("/order");
  };

  return (
    <div>
      <h1>Select Drinks</h1>
      <label>Search by First Letter:</label>
      <select value={searchLetter} onChange={(e) => setSearchLetter(e.target.value)}>
        {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
          <option key={letter} value={letter}>{letter.toUpperCase()}</option>
        ))}
      </select>

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
