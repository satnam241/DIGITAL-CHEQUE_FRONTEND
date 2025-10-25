// // import React, { useState, useEffect } from "react";
// // import { validateGSTNumber, calculateGST } from "../../services/apiService";

// // interface OrderDetailsPageProps {
// //   plan: any;
// //   next: () => void;
// //   updateOrderData: (data: any) => void;
// // }

// // const OrderDetailsPage: React.FC<OrderDetailsPageProps> = ({ plan, next, updateOrderData }) => {
// //   const [gstNumber, setGstNumber] = useState("");
// //   const [gstValidationMsg, setGstValidationMsg] = useState<string | null>(null);

// //   const [orderData, setOrderData] = useState({
// //     productName: plan?.name || "",
// //     priceId: plan?._id || "",
// //     quantity: 1, // always fixed 1
// //     taxableAmount: plan?.price || 0,
// //     gst: 0,
// //     payableAmount: plan?.price || 0,
// //     gstNumber: "",
// //     gstValid: false,
// //   });

// //   // 🔹 Call backend for GST calculation (based only on price)
// //   const recalcGST = async () => {
// //     if (!plan) return;
// //     const res = await calculateGST(plan.price, 1);
// //     if (res.success) {
// //       setOrderData(prev => ({
// //         ...prev,
// //         taxableAmount: res.data.taxableAmount,
// //         gst: res.data.gst,
// //         payableAmount: res.data.payableAmount,
// //       }));
// //     }
// //   };

// //   // Run once on mount
// //   useEffect(() => {
// //     recalcGST();
// //   }, [plan]);

// //   // Update parent whenever orderData changes
// //   useEffect(() => {
// //     updateOrderData(orderData);
// //   }, [orderData]);

// //   // 🔹 GST Validation Handler
// //   const handleGSTValidation = async () => {
// //     if (!gstNumber) {
// //       setGstValidationMsg("⚠️ Please enter GST number");
// //       setOrderData(prev => ({ ...prev, gstNumber: "", gstValid: false }));
// //       return;
// //     }
// //     const res = await validateGSTNumber(gstNumber);
// //     if (res.success) {
// //       setGstValidationMsg("✅ GST number is valid");
// //       setOrderData(prev => ({ ...prev, gstNumber, gstValid: true }));
// //     } else {
// //       setGstValidationMsg(`❌ ${res.message || res.error}`);
// //       setOrderData(prev => ({ ...prev, gstNumber, gstValid: false }));
// //     }
// //   };

// //   return (
// //     <div className="container py-5">
// //       <div className="card shadow-sm mx-auto p-4" style={{ maxWidth: "400px", borderRadius: "16px" }}>
// //         <h4 className="fw-bold mb-3">Order Details</h4>

// //         {/* Product Name */}
// //         <div className="mb-3">
// //           <label className="form-label fw-semibold">Product Name</label>
// //           <input type="text" className="form-control" value={orderData.productName} readOnly />
// //         </div>

// //         {/* Quantity (always 1, disabled) */}
// //         <div className="mb-3">
// //           <label className="form-label fw-semibold">Quantity</label>
// //           <input type="number" className="form-control" value={1} readOnly />
// //         </div>

// //         {/* GST Number */}
// //         <div className="mb-3">
// //           <label className="form-label fw-semibold">GST Number</label>
// //           <div className="d-flex gap-2">
// //             <input
// //               type="text"
// //               className="form-control"
// //               value={gstNumber}
// //               onChange={e => setGstNumber(e.target.value.toUpperCase())}
// //               placeholder="Enter GST Number"
// //             />
// //             <button type="button" className="btn btn-outline-primary" onClick={handleGSTValidation}>
// //               Validate
// //             </button>
// //           </div>
// //           {gstValidationMsg && (
// //             <small
// //               className="d-block mt-1"
// //               style={{ color: gstValidationMsg.includes("✅") ? "green" : "red" }}
// //             >
// //               {gstValidationMsg}
// //             </small>
// //           )}
// //         </div>

// //         {/* GST & Amount */}
// //         <div className="mb-3">
// //           <div className="d-flex justify-content-between">
// //             <span>Taxable Amount (₹)</span>
// //             <span>₹{orderData.taxableAmount.toLocaleString()}</span>
// //           </div>
// //           <div className="d-flex justify-content-between">
// //             <span>GST @ 18% (₹)</span>
// //             <span>₹{orderData.gst.toFixed(2)}</span>
// //           </div>
// //           <div className="d-flex justify-content-between fw-bold mt-2">
// //             <span>Payable Amount (₹)</span>
// //             <span>₹{orderData.payableAmount.toLocaleString()}</span>
// //           </div>
// //         </div>

// //         <button className="btn btn-success w-100" onClick={next}>
// //           Continue
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OrderDetailsPage;


// import React, { useState, useEffect } from "react";
// import { calculateGST, validateGSTNumber } from "../../services/apiService";

// interface Props {
//   plan: any;
//   next: () => void;
//   updateOrderData: (data: any) => void;
// }

// const OrderDetailsPage: React.FC<Props> = ({ plan, next, updateOrderData }) => {
//   const [gstNumber, setGstNumber] = useState("");
//   const [gstValidationMsg, setGstValidationMsg] = useState<string | null>(null);

//   const [orderData, setOrderData] = useState({
//     productName: plan?.name || "",
//     priceId: plan?._id || "",
//     quantity: 1,
//     taxableAmount: plan?.price || 0,
//     gst: 0,
//     payableAmount: plan?.price || 0,
//     gstNumber: "",
//     gstValid: false,
//   });

//   const recalcGST = async () => {
//     if (!plan) return;
//     const res = await calculateGST(plan.price, 1);
//     if (res.success) {
//       setOrderData(prev => ({
//         ...prev,
//         taxableAmount: res.data.taxableAmount,
//         gst: res.data.gst,
//         payableAmount: res.data.payableAmount,
//       }));
//     }
//   };

//   useEffect(() => {
//     recalcGST();
//   }, [plan]);

//   useEffect(() => {
//     updateOrderData(orderData);
//   }, [orderData]);

//   const handleGSTValidation = async () => {
//     if (!gstNumber) {
//       setGstValidationMsg("⚠️ Please enter GST number");
//       setOrderData(prev => ({ ...prev, gstNumber: "", gstValid: false }));
//       return;
//     }
//     const res = await validateGSTNumber(gstNumber);
//     if (res.success) {
//       setGstValidationMsg("✅ GST number is valid");
//       setOrderData(prev => ({ ...prev, gstNumber, gstValid: true }));
//     } else {
//       setGstValidationMsg(`❌ ${res.message || res.error}`);
//       setOrderData(prev => ({ ...prev, gstNumber, gstValid: false }));
//     }
//   };

//   return (
//     <div className="container py-5">
//     <div
//       className="card shadow-sm mx-auto p-4"
//       style={{ maxWidth: "400px", borderRadius: "16px" }}
//     >
//       <h4 className="fw-bold mb-3">Order Details</h4>
  
//       {/* Product Name */}
//       <div className="mb-3">
//         <label className="form-label fw-semibold">Product Name</label>
//         <input
//           type="text"
//           className="form-control"
//           value={orderData.productName}
//           readOnly
//         />
//       </div>
  
//       {/* Quantity (always 1, disabled) */}
//       <div className="mb-3">
//         <label className="form-label fw-semibold">Quantity</label>
//         <input
//           type="number"
//           className="form-control"
//           value={1}
//           readOnly
//         />
//       </div>
  
//       {/* GST Number */}
//       <div className="mb-3">
//         <label className="form-label fw-semibold">GST Number</label>
//         <div className="d-flex gap-2">
//           <input
//             type="text"
//             className="form-control"
//             value={gstNumber}
//             onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
//             placeholder="Enter GST Number"
//           />
//           <button
//             type="button"
//             className="btn btn-outline-primary"
//             onClick={handleGSTValidation}
//           >
//             Validate
//           </button>
//         </div>
//         {gstValidationMsg && (
//           <small
//             className="d-block mt-1"
//             style={{ color: gstValidationMsg.includes("✅") ? "green" : "red" }}
//           >
//             {gstValidationMsg}
//           </small>
//         )}
//       </div>
  
//       {/* GST & Amount */}
//       <div className="mb-3">
//         <div className="d-flex justify-content-between">
//           <span>Taxable Amount (₹)</span>
//           <span>₹{orderData.taxableAmount.toLocaleString()}</span>
//         </div>
//         <div className="d-flex justify-content-between">
//           <span>GST @ 18% (₹)</span>
//           <span>₹{orderData.gst.toFixed(2)}</span>
//         </div>
//         <div className="d-flex justify-content-between fw-bold mt-2">
//           <span>Payable Amount (₹)</span>
//           <span>₹{orderData.payableAmount.toLocaleString()}</span>
//         </div>
//       </div>
  
//       <button className="btn btn-success w-100" onClick={next}>
//         Continue
//       </button>
//     </div>
//   </div>
  
//   );
// };

// export default OrderDetailsPage;

import React, { useState, useEffect } from "react";
import { calculateGST, validateGST } from "../../services/apiService"; // backend APIs

interface Props {
  plan: any;
  next: () => void;
  updateOrderData: (data: any) => void;
}

const OrderDetailsPage: React.FC<Props> = ({ plan, next, updateOrderData }) => {
  const [gstNumber, setGstNumber] = useState("");
  const [gstValidationMsg, setGstValidationMsg] = useState<string | null>(null);
  const [loadingGST, setLoadingGST] = useState(false);
  const [loadingValidation, setLoadingValidation] = useState(false);

  const [orderData, setOrderData] = useState({
    productName: plan?.name || "",
    priceId: plan?._id || "",
    quantity: 1,
    taxableAmount: plan?.price || 0,
    gst: 0,
    payableAmount: plan?.price || 0,
    gstNumber: "",
    gstValid: false,
  });

  // Recalculate GST from backend
  const recalcGST = async () => {
    if (!plan) return;
    try {
      setLoadingGST(true);
      const res = await calculateGST(plan.price, 1); // call backend
      if (res.success) {
        setOrderData(prev => ({
          ...prev,
          taxableAmount: res.data.taxableAmount,
          gst: res.data.gst,
          payableAmount: res.data.payableAmount,
        }));
      } else {
        console.error("GST calculation failed:", res.error);
      }
    } catch (err) {
      console.error("Error calling GST API:", err);
    } finally {
      setLoadingGST(false);
    }
  };

  useEffect(() => {
    recalcGST();
  }, [plan]);

  // Sync orderData to parent
  useEffect(() => {
    updateOrderData(orderData);
  }, [orderData]);

  // GST Number validation
  const handleGSTValidation = async () => {
    if (!gstNumber) {
      setGstValidationMsg("⚠️ Please enter GST number");
      setOrderData(prev => ({ ...prev, gstNumber: "", gstValid: false }));
      return;
    }

    try {
      setLoadingValidation(true);
      const res = await validateGST(gstNumber); // call backend
      if (res.success) {
        setGstValidationMsg("✅ GST number is valid");
        setOrderData(prev => ({ ...prev, gstNumber, gstValid: true }));
      } else {
        setGstValidationMsg(`❌ ${res.message || res.error}`);
        setOrderData(prev => ({ ...prev, gstNumber, gstValid: false }));
      }
    } catch (err) {
      console.error("GST validation error:", err);
      setGstValidationMsg("❌ Error validating GST number");
      setOrderData(prev => ({ ...prev, gstNumber, gstValid: false }));
    } finally {
      setLoadingValidation(false);
    }
  };

  return (
    <div className="container py-5">
      <div
        className="card shadow-sm mx-auto p-4"
        style={{ maxWidth: "400px", borderRadius: "16px" }}
      >
        <h4 className="fw-bold mb-3">Order Details</h4>

        {/* Product Name */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={orderData.productName}
            readOnly
          />
        </div>

        {/* Quantity */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Quantity</label>
          <input
            type="number"
            className="form-control"
            value={1}
            readOnly
          />
        </div>

        {/* GST Number */}
        <div className="mb-3">
          <label className="form-label fw-semibold">GST Number</label>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
              placeholder="Enter GST Number"
              disabled={loadingValidation}
            />
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleGSTValidation}
              disabled={loadingValidation}
            >
              {loadingValidation ? "Validating..." : "Validate"}
            </button>
          </div>
          {gstValidationMsg && (
            <small
              className="d-block mt-1"
              style={{ color: gstValidationMsg.includes("✅") ? "green" : "red" }}
            >
              {gstValidationMsg}
            </small>
          )}
        </div>

        {/* GST & Amount */}
        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <span>Taxable Amount (₹)</span>
            <span>{loadingGST ? "Calculating..." : `₹${orderData.taxableAmount.toLocaleString()}`}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>GST @ 18% (₹)</span>
            <span>{loadingGST ? "-" : `₹${orderData.gst.toFixed(2)}`}</span>
          </div>
          <div className="d-flex justify-content-between fw-bold mt-2">
            <span>Payable Amount (₹)</span>
            <span>{loadingGST ? "-" : `₹${orderData.payableAmount.toLocaleString()}`}</span>
          </div>
        </div>

        <button
          className="btn btn-success w-100"
          onClick={next}
          disabled={loadingGST || loadingValidation}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
