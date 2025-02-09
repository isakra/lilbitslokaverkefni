import { useRouter } from "next/router";
import { useState } from "react";

const Home = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const checkOrder = () => {
    router.push(`/select-dish?email=${email}`);
  };

  return (
    <div>
      <h1>Welcome to Lil' Bits</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <button onClick={checkOrder}>Start Order</button>
    </div>
  );
};

export default Home;
