import { USER_AUTH, ENDPOINTS } from "../utils/constant";

// 🔹 GST Number Validation
export async function validateGSTNumber(gstNumber: string, state?: string) {
  const res = await fetch(`${USER_AUTH}${ENDPOINTS.GST_VALIDATE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gstNumber, state }),
  });
  return res.json();
}

// 🔹 GST Calculation (price × qty)
export async function calculateGST(price: number, quantity: number = 1) {
  const res = await fetch(`${USER_AUTH}${ENDPOINTS.GST_ORDER_DETAIL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ price, quantity }),
  });
  return res.json();
}
