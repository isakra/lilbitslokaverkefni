import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Meal {
  strMeal: string;
  strMealThumb: string;
}

interface Drink {
  idDrink: string;
  strDrink: string;
}

const ReceiptPage = () => {
  const router = useRouter();
  const { date, time, people, email } = router.query;
  const [dish, setDish] = useState<Meal | null>(null);
  const [drinks, setDrinks] = useState<Drink[]>([]);

  useEffect(() => {
    setDish(JSON.parse(localStorage.getItem("selectedDish") || "null"));
    setDrinks(JSON.parse(localStorage.getItem("selectedDrinks") || "[]"));
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1>Receipt</h1>
      {dish && <div><h2>{dish.strMeal}</h2><img src={dish.strMealThumb} alt={dish.strMeal} className="w-40 h-40" /></div>}
      <h3>Drinks:</h3>
      {drinks.map(drink => <p key={drink.idDrink}>{drink.strDrink}</p>)}
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p>People: {people}</p>
      <p>Email: {email}</p>
      <button onClick={() => router.push("/")} className="bg-blue-600 text-white p-3 mt-4 rounded">Home</button>
    </div>
  );
};

export default ReceiptPage;
