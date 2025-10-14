// import { USER_AUTH, ENDPOINTS } from "../utils/constant";

// // 🔹 GST Number Validation
// export async function validateGSTNumber(gstNumber: string, state?: string) {
//   const res = await fetch(`${USER_AUTH}${ENDPOINTS.GST_VALIDATE}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ gstNumber, state }),
//   });
//   return res.json();
// }

// // 🔹 GST Calculation (price × qty)
// export async function calculateGST(price: number, quantity: number = 1) {
//   const res = await fetch(`${USER_AUTH}${ENDPOINTS.GST_ORDER_DETAIL}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ price, quantity }),
//   });
//   return res.json();
// }
export async function calculateGST(price: number, quantity = 1) {
  try {
    const taxableAmount = Number(price) * Number(quantity);
    const gst = Number((taxableAmount * 0.18).toFixed(2));
    const payableAmount = Number((taxableAmount + gst).toFixed(2));
    return { success: true, data: { taxableAmount, gst, payableAmount } };
  } catch (err: any) {
    return { success: false, error: err.message || "Error calculating GST" };
  }
}

export async function validateGSTNumber(gstNumber: string) {
  // simple regex check (frontend). For full validation use backend
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;
  if (!gstNumber) return { success: false, message: "GST number required" };
  if (!gstRegex.test(gstNumber)) return { success: false, message: "Invalid format" };
  return { success: true };
}
