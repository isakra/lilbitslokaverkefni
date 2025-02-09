// src/pages/index.tsx (Home Screen)
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface OrderResponse {
  exists: boolean;
}

const Home = () => {
  const [email, setEmail] = useState("");
  const [orderExists, setOrderExists] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email as string);
      checkExistingOrder(router.query.email as string);
    }
  }, [router.query]);

  const checkExistingOrder = async (email: string) => {
    try {
      const res = await axios.get<OrderResponse>(`/api/orders?email=${email}`);
      if (res.data.exists) {
        setOrderExists(true);
      }
    } catch (error) {
      setError("Failed to check order. Please try again.");
    }
  };

  const startOrder = () => {
    if (orderExists) {
      router.push(`/select-dish?email=${email}`);
    } else {
      router.push(`/select-dish`);
    }
  };

  return (
    <div>
      <nav>
        <Link href="/" className={router.pathname === "/" ? "active" : ""}>Home</Link>
        <Link href="/select-dish" className={router.pathname === "/select-dish" ? "active" : ""}>Order</Link>
      </nav>
      <Image src="/logo.png" alt="Logo" width={150} height={100} />
      <Carousel responsive={{ superLarge: { breakpoint: { max: 4000, min: 1024 }, items: 1 } }} containerClass="carousel-container">
        <div className="carousel-item"><img src="/carousel1.jpg" alt="Carousel 1" /></div>
        <div className="carousel-item"><img src="/carousel2.jpg" alt="Carousel 2" /></div>
        <div className="carousel-item"><img src="/carousel3.jpg" alt="Carousel 3" /></div>
      </Carousel>
      <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={startOrder}>Start Order</button>
    </div>
  );
};

export default Home;
