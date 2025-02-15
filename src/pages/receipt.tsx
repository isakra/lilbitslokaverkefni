import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ReceiptPage = () => {
  const router = useRouter();
  const { date, time, people, email } = router.query;
  const [dish, setDish] = useState<any>(null);
  const [drinks, setDrinks] = useState<any[]>([]);
  const [pricePerPerson, setPricePerPerson] = useState(10); // Example price
  const [drinkPrice, setDrinkPrice] = useState(5); // Example drink price

  useEffect(() => {
    const storedDish = localStorage.getItem("selectedDish");
    const storedDrinks = localStorage.getItem("selectedDrinks");
    if (storedDish) setDish(JSON.parse(storedDish));
    if (storedDrinks) setDrinks(JSON.parse(storedDrinks));
  }, []);

  const totalFoodPrice = pricePerPerson * Number(people);
  const totalDrinkPrice = drinks.length * drinkPrice;
  const totalPrice = totalFoodPrice + totalDrinkPrice;

  return (
    <div>
      <h1>Receipt</h1>
      <h2>Order Summary</h2>
      {dish && (
        <div>
          <h3>Dish: {dish.strMeal}</h3>
          <img src={dish.strMealThumb} alt={dish.strMeal} width={150} />
        </div>
      )}
      <h3>Drinks:</h3>
      {drinks.map((drink) => (
        <p key={drink.idDrink}>{drink.strDrink}</p>
      ))}
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Time:</strong> {time}</p>
      <p><strong>People:</strong> {people}</p>
      <p><strong>Email:</strong> {email}</p>
      <h3>Total Price: ${totalPrice}</h3>
      <button onClick={() => router.push("/select-dish")}>Update Order</button>
    </div>
  );
};

export default ReceiptPage;
