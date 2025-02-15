import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const ORDERS_API_URL = "https://github.com/GaddiSunshine/h24-fk2/tree/9962a6b623a64b199522da5e45142bfa7233c6fe/orders-api"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email parameter" });
  }

  try {
    const response = await axios.get(`${ORDERS_API_URL}?email=${email}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order details" });
  }
}
