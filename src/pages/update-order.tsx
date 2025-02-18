import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// Define Order Type
interface Order {
  dish: string;
  drinks: string;
  date: string;
  time: string;
}

const UpdateOrder = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();
  const { email } = router.query;

  useEffect(() => {
    if (email) {
      axios.get(`/api/orders?email=${email}`)
        .then((res) => setOrder(res.data as Order))
        .catch(() => console.error("Failed to fetch order"));
    }
  }, [email]);

  const handleUpdate = () => {
    if (!order) return;
    axios.put(`/api/orders`, order)
      .then(() => router.push("/receipt"))
      .catch(() => console.error("Failed to update order"));
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Update Your Order</h1>
      {order ? (
        <div>
          <label>Dish:</label>
          <input
            type="text"
            value={order.dish}
            onChange={(e) => setOrder({ ...order, dish: e.target.value })}
            className="border p-2 rounded"
          />
          
          <label>Drinks:</label>
          <input
            type="text"
            value={order.drinks}
            onChange={(e) => setOrder({ ...order, drinks: e.target.value })}
            className="border p-2 rounded"
          />
          
          <label>Date:</label>
          <input
            type="date"
            value={order.date}
            onChange={(e) => setOrder({ ...order, date: e.target.value })}
            className="border p-2 rounded"
          />
          
          <label>Time:</label>
          <input
            type="time"
            value={order.time}
            onChange={(e) => setOrder({ ...order, time: e.target.value })}
            className="border p-2 rounded"
          />

          <button onClick={handleUpdate} className="bg-blue-600 text-white p-2 mt-4 rounded">
            Save Changes
          </button>
        </div>
      ) : (
        <p>Loading order...</p>
      )}
    </div>
  );
};

export default UpdateOrder;
