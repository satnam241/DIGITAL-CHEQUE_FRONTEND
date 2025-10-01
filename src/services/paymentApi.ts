
import {USER_AUTH,ENDPOINTS } from "../utils/constant";

export const createOrder = async (amount: number) => {
    const res = await fetch(`${USER_AUTH}${ENDPOINTS.CREATE_PLAN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    if (!res.ok) throw new Error("Failed to create order");
    return res.json();
  };