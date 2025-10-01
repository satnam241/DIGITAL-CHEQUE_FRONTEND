import React, { useState } from "react";
import { USER_AUTH, ENDPOINTS } from "../../utils/constant";

interface Step4PaymentProps {
  planId: string;
  payableAmount: number;
  userDetails: any;
}

const Step4Payment: React.FC<Step4PaymentProps> = ({ planId, payableAmount, userDetails }) => {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleSubscribe = async () => {
    if (!planId || !payableAmount) return alert("Plan or amount missing.");
    setLoading(true);

    try {
      const res = await fetch(`${USER_AUTH}${ENDPOINTS.PAYMENT_CREATE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ planId, payableAmount, userDetails }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create order.");
      }

      const { order, transactionId } = await res.json();

      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) return alert("Failed to load Razorpay.");

      const options = {
        key: import.meta.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "My App",
        description: "Plan Subscription",
        prefill: {
          name: userDetails.fullName,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        handler: async function (response: any) {
          const verifyRes = await fetch(`${USER_AUTH}${ENDPOINTS.PAYMENT_VERIFY}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              planId,
              transactionId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (!verifyRes.ok) {
            const errorVerifyData = await verifyRes.json();
            alert(errorVerifyData.message || "Verification failed.");
            return;
          }

          const result = await verifyRes.json();
          alert(result.message || "Payment successful!");
          window.location.href = "/payment-success";
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Subscription error:", err);
      alert(err.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px", borderRadius: "16px" }}>
        <h3 className="fw-bold mb-3">Complete Payment</h3>
        <div className="mb-4">
          <p className="text-muted">Amount to pay:</p>
          <h2 className="text-success">₹{payableAmount.toLocaleString()}</h2>
        </div>
        <button className="btn btn-success w-100 fw-semibold py-2" onClick={handleSubscribe} disabled={loading}>
          {loading ? "Processing..." : `Pay ₹${payableAmount.toLocaleString()}`}
        </button>
      </div>
    </div>
  );
};

export default Step4Payment;
