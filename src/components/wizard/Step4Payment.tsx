// import React, { useState } from "react";
// import { USER_AUTH, ENDPOINTS } from "../../utils/constant";

// interface Step4PaymentProps {
//   planId: string;
//   payableAmount: number;
//   userDetails: any;
// }

// const Step4Payment: React.FC<Step4PaymentProps> = ({ planId, payableAmount, userDetails }) => {
//   const [loading, setLoading] = useState(false);

//   const loadRazorpayScript = () =>
//     new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });

//   const handleSubscribe = async () => {
//     if (!planId || !payableAmount) return alert("Plan or amount missing.");
//     setLoading(true);

//     try {
//       // ✅ Create Razorpay Order from backend
//       const res = await fetch(`${USER_AUTH}${ENDPOINTS.PAYMENT_CREATE}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ planId, payableAmount, userId: userDetails._id }),
//       });

//       const { order, transactionId } = await res.json();

//       const razorpayLoaded = await loadRazorpayScript();
//       if (!razorpayLoaded) return alert("Failed to load Razorpay.");

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ✅ env variable
//         amount: order.amount,
//         currency: order.currency,
//         order_id: order.id,
//         name: "My App",
//         description: "Plan Subscription",
//         prefill: {
//           name: userDetails.fullName,
//           email: userDetails.email,
//           contact: userDetails.phone,
//         },
//         handler: async function (response: any) {
//           // ✅ Verify Payment in backend
//           const verifyRes = await fetch(`${USER_AUTH}${ENDPOINTS.PAYMENT_VERIFY}`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//             body: JSON.stringify({
//               planId,
//               transactionId,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             }),
//           });

//           const result = await verifyRes.json();
//           if (verifyRes.ok) {
//             alert("✅ Payment successful!");
//             window.location.href = "/payment-success";
//           } else {
//             alert(result.message || "Payment verification failed.");
//           }
//         },
//         theme: { color: "#3399cc" },
//       };

//       const rzp = new (window as any).Razorpay(options);
//       rzp.open();
//     } catch (err: any) {
//       console.error("Subscription error:", err);
//       alert(err.message || "Unexpected error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-4">
//       <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px", borderRadius: "16px" }}>
//         <h3 className="fw-bold mb-3">Complete Payment</h3>
//         <div className="mb-4">
//           <p className="text-muted">Amount to pay:</p>
//           <h2 className="text-success">₹{payableAmount.toLocaleString()}</h2>
//         </div>
//         <button
//           className="btn btn-success w-100 fw-semibold py-2"
//           onClick={handleSubscribe}
//           disabled={loading}
//         >
//           {loading ? "Processing..." : `Pay ₹${payableAmount.toLocaleString()}`}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Step4Payment;

import React, { useState } from "react";
import { USER_PAYMENT, ENDPOINTS } from "../../utils/constant";

interface Props {
  planId: string;
  payableAmount: number;
  userDetails: any;
}

const loadRazorpayScript = () =>
  new Promise<boolean>((resolve) => {
    const id = "razorpay-sdk";
    if (document.getElementById(id)) return resolve(true);
    const script = document.createElement("script");
    script.id = id;
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Step4Payment: React.FC<Props> = ({ planId, payableAmount, userDetails }) => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!planId || !payableAmount) return alert("Missing plan or amount");
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // if logged in
      const res = await fetch(`${USER_PAYMENT}${ENDPOINTS.PAYMENT_CREATE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          planId,
          payableAmount,
          userId: userDetails?.userId || null,
          userDetails: {
            fullName: userDetails.fullName,
            email: userDetails.email,
            phone: userDetails.phone,
            companyName: userDetails.companyName,
            gstNo: userDetails.gstNo,
            address: userDetails.address,
            city: userDetails.city,
            state: userDetails.state,
          },
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        alert(json.message || "Failed to create order");
        setLoading(false);
        return;
      }

      const { order, transactionId, payableAmount: serverPayable } = json;

      const ok = await loadRazorpayScript();
      if (!ok) return alert("Failed to load Razorpay");

      const options: any = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "My App",
        description: "Plan Subscription",
        order_id: order.id,
        prefill: {
          name: userDetails.fullName,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        handler: async function (response: any) {
          // Verify on server
          const verifyRes = await fetch(`${USER_PAYMENT}${ENDPOINTS.PAYMENT_VERIFY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
            body: JSON.stringify({
              transactionId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const result = await verifyRes.json();
          if (verifyRes.ok) {
            alert("✅ Payment successful!");
            window.location.href = "/signup";
          } else {
            alert(result.message || "Payment verification failed");
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Error during subscribe:", err);
      alert(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
    <div
      className="card shadow-sm p-4 mx-auto"
      style={{ maxWidth: "500px", borderRadius: "16px" }}
    >
      <h3 className="fw-bold mb-3">Complete Payment</h3>
  
      <div className="mb-4">
        <p className="text-muted">Amount to pay:</p>
        <h2 className="text-success">₹{payableAmount.toLocaleString()}</h2>
      </div>
  
      <button
        className="btn btn-success w-100 fw-semibold py-2"
        onClick={handleSubscribe}
        disabled={loading}
      >
        {loading ? "Processing..." : `Pay ₹${payableAmount.toLocaleString()}`}
      </button>
    </div>
  </div>
  
  );
};

export default Step4Payment;
