import { useState } from "react";
import { useRouter } from "next/router";

const OrderPage = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(1);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!email.includes("@") || !email.includes(".")) {
      setError("Invalid email format.");
      return;
    }
    if (!isValidDateTime(date, time)) {
      setError("Please select a valid date and time (Mon-Fri, 16:00 - 23:00).");
      return;
    }
    router.push(`/receipt?date=${date}&time=${time}&people=${people}&email=${email}`);
  };

  const isValidDateTime = (date: string, time: string) => {
    if (!date || !time) return false;
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = parseInt(time.split(":")[0]);

    return dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 16 && hour <= 23;
  };

  return (
    <div>
      <h1>Order Details</h1>
      <label>Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <label>Time:</label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <label>Number of People:</label>
      <select value={people} onChange={(e) => setPeople(Number(e.target.value))}>
        {[...Array(10).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>
            {num + 1}
          </option>
        ))}
      </select>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSubmit}>Next: Receipt</button>
    </div>
  );
};

export default OrderPage;
