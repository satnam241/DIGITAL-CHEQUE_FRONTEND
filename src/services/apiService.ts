import { USER_AUTH, ENDPOINTS } from "../utils/constant";


// ---------------- GST Calculation ----------------
export interface GSTCalculationResponse {
  success: boolean;
  data?: {
    taxableAmount: number;
    gst: number;
    payableAmount: number;
  };
  error?: string;
}

export const calculateGST = async (price: number, quantity = 1): Promise<GSTCalculationResponse> => {
  try {
    const res = await fetch(`${USER_AUTH}${ENDPOINTS.GST_ORDER_DETAIL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price, quantity }),
    });

    const data = await res.json();
    if (data.success) {
      return { success: true, data: data.data };
    } else {
      return { success: false, error: data.error || "Failed to calculate GST" };
    }
  } catch (err: any) {
    console.error("Error in calculateGST:", err);
    return { success: false, error: err.message || "Failed to calculate GST" };
  }
};

// ---------------- GST Number Validation ----------------
export interface GSTValidationResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    gstNumber: string;
    state?: string;
    isValid: boolean;
  };
}

export const validateGST = async (gstNumber: string, state?: string): Promise<GSTValidationResponse> => {
  try {
    const res = await fetch(`${USER_AUTH}${ENDPOINTS.GST_VALIDATE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gstNumber, state }),
    });

    const data = await res.json();
    if (data.success) {
      return {
        success: true,
        message: data.message,
        data: data.data,
      };
    } else {
      return {
        success: false,
        message: data.message,
        error: data.error || "GST validation failed",
      };
    }
  } catch (err: any) {
    console.error("Error in validateGST:", err);
    return { success: false, error: err.message || "GST validation failed" };
  }
};

// export async function calculateGST(price: number, quantity = 1) {
//   try {
//     const taxableAmount = Number(price) * Number(quantity);
//     const gst = Number((taxableAmount * 0.18).toFixed(2));
//     const payableAmount = Number((taxableAmount + gst).toFixed(2));
//     return { success: true, data: { taxableAmount, gst, payableAmount } };
//   } catch (err: any) {
//     return { success: false, error: err.message || "Error calculating GST" };
//   }
// }

// export async function validateGSTNumber(gstNumber: string) {
//   // simple regex check (frontend). For full validation use backend
//   const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;
//   if (!gstNumber) return { success: false, message: "GST number required" };
//   if (!gstRegex.test(gstNumber)) return { success: false, message: "Invalid format" };
//   return { success: true };
// }
