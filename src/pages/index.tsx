import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface OrderResponse {
  exists: boolean;
}

const Home = () => {
  const [email, setEmail] = useState("");
  const [orderExists, setOrderExists] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (email) {
      axios.get<OrderResponse>(`/api/orders?email=${email}`)
        .then((res) => setOrderExists(res.data.exists))
        .catch(() => console.error("Failed to check order"));
    }
  }, [email]);

  const handleStartOrder = () => {
    router.push(orderExists ? `/update-order?email=${email}` : `/select-dish`);
  };

  return (
    <div className="flex flex-col items-center">
      <Image src="/logo.png" alt="Logo" width={150} height={100} />
      <Carousel responsive={{ superLarge: { breakpoint: { max: 4000, min: 1024 }, items: 1 } }}>
        <div><img src="/carousel1.jpg" alt="Carousel 1" className="h-64 w-full object-cover" /></div>
        <div><img src="/carousel2.jpg" alt="Carousel 2" className="h-64 w-full object-cover" /></div>
        <div><img src="/carousel3.jpg" alt="Carousel 3" className="h-64 w-full object-cover" /></div>
      </Carousel>
      <input
        type="email"
        placeholder="Enter email to start/update order"
        className="p-3 border rounded mt-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="bg-red-600 text-white p-2 mt-4 rounded" onClick={handleStartOrder}>
        Proceed
      </button>
    </div>
  );
};

export default Home;
