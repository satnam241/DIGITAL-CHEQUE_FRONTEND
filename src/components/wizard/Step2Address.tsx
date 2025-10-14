// import React, { useState, useEffect } from "react";
// import { USER_DATA, ENDPOINTS } from "../../utils/constant";

// interface Step2Props {
//   data: any;
//   updateForm: (data: Partial<any>) => void;
//   next: () => void;
//   back: () => void;
// }

// const Step2Address: React.FC<Step2Props> = ({ data, updateForm, next, back }) => {
//   const [localData, setLocalData] = useState(data);
//   const [loading, setLoading] = useState(false);
//   const [pinLoading, setPinLoading] = useState(false);

//   // Handle input change
//   const handleChange = (field: string, value: string) => {
//     setLocalData(prev => ({ ...prev, [field]: value }));
//   };

//   // GST validation
//   const isValidGST = (gst?: string) => {
//     if (!gst) return true;
//     const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
//     return gstRegex.test(gst);
//   };

//   // Optimized pin code lookup
//   useEffect(() => {
//     if (!localData.pinCode || localData.pinCode.length !== 6) return;

//     const timeout = setTimeout(async () => {
//       setPinLoading(true);
//       try {
//         const res = await fetch(`https://api.postalpincode.in/pincode/${localData.pinCode}`);
//         const json = await res.json();
//         if (json[0].Status === "Success") {
//           const postOffice = json[0].PostOffice[0];
//           setLocalData(prev => ({
//             ...prev,
//             city: postOffice.District,
//             state: postOffice.State
//           }));
//         }
//       } catch (err) {
//         console.error("Pin code fetch error:", err);
//       } finally {
//         setPinLoading(false);
//       }
//     }, 800); // debounce 800ms

//     return () => clearTimeout(timeout);
//   }, [localData.pinCode]);

//   // Save step2 & move next
//   const handleNext = async () => {
//     if (!localData.fullName || !localData.email || !localData.phone) {
//       alert("Full Name, Email, and Phone are required.");
//       return;
//     }

//     if (localData.gstNo && !isValidGST(localData.gstNo)) {
//       alert("Please enter a valid GST Number");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(`${USER_DATA}${ENDPOINTS.STEP2}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...localData,
//           // Ab planId optional, backend assign karega default plan agar missing ho
//           planId: data.plan?._id || undefined,
//           quantity: data.orderData?.quantity || 1,
//           payableAmount: data.orderData?.payableAmount || data.plan?.price,
//         }),
//       });

//       const result = await res.json();
//       if (!res.ok) {
//         alert(result.message || "Failed to save data");
//         return;
//       }

//       updateForm({ ...localData, plan: result.user.plan });
//       next();
//     } catch (err) {
//       console.error(err);
//       alert("Error saving data. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-4">
//       <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px", borderRadius: "16px" }}>
//         <div className="text-center mb-4">
//           <h3 className="fw-bold mb-1">Your Details</h3>
//           <p className="text-muted mb-0">Please fill out your information</p>
//         </div>

//         {[
//           { label: "Salutation", field: "salutation", type: "text" },
//           { label: "Full Name", field: "fullName", type: "text" },
//           { label: "Email", field: "email", type: "email" },
//           { label: "Phone Number", field: "phone", type: "text" },
//           { label: "Company Name", field: "companyName", type: "text" }
//         ].map(({ label, field, type }) => (
//           <div className="mb-3" key={field}>
//             <label className="form-label fw-semibold">{label}</label>
//             <input
//               type={type}
//               className="form-control"
//               value={localData[field] || ""}
//               onChange={e => handleChange(field, e.target.value)}
//             />
//           </div>
//         ))}

//         <div className="mb-3">
//           <label className="form-label fw-semibold">GST Number</label>
//           <input
//             type="text"
//             className={`form-control ${localData.gstNo && !isValidGST(localData.gstNo) ? "is-invalid" : ""}`}
//             value={localData.gstNo || ""}
//             onChange={e => handleChange("gstNo", e.target.value.toUpperCase())}
//           />
//           <div className="invalid-feedback">Invalid GST Number format</div>
//         </div>

//         <div className="mb-3">
//           <label className="form-label fw-semibold">Address</label>
//           <textarea
//             className="form-control"
//             rows={3}
//             value={localData.address || ""}
//             onChange={e => handleChange("address", e.target.value)}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label fw-semibold">Pin Code</label>
//           <input
//             type="text"
//             className="form-control"
//             value={localData.pinCode || ""}
//             onChange={e => handleChange("pinCode", e.target.value)}
//           />
//           {pinLoading && <small className="text-muted">Fetching city/state...</small>}
//         </div>

//         <div className="mb-3">
//           <label className="form-label fw-semibold">City</label>
//           <input type="text" className="form-control" value={localData.city || ""} readOnly />
//         </div>

//         <div className="mb-3">
//           <label className="form-label fw-semibold">State</label>
//           <input type="text" className="form-control" value={localData.state || ""} readOnly />
//         </div>

//         <div className="d-flex justify-content-between mt-4">
//           <button className="btn btn-secondary fw-semibold px-4" onClick={back}>Back</button>
//           <button className="btn btn-success fw-semibold px-4" onClick={handleNext} disabled={loading}>
//             {loading ? "Saving..." : "Continue"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Step2Address;


// import React, { useState, useEffect } from "react";
// import { validateGSTNumber } from "../../services/apiService";

// interface Step2AddressProps {
//   next: () => void;
//   prev: () => void;
//   updateForm: (data: any) => void;
//   orderData: any;
// }

// const Step2Address: React.FC<Step2AddressProps> = ({ next, prev, updateForm, orderData }) => {
//   const [formData, setFormData] = useState({
//     addressLine1: orderData?.addressLine1 || "",
//     addressLine2: orderData?.addressLine2 || "",
//     city: orderData?.city || "",
//     state: orderData?.state || "",
//     pincode: orderData?.pincode || "",
//     gstNumber: orderData?.gstNumber || "",
//   });

//   const [gstValidationMsg, setGstValidationMsg] = useState<string | null>(null);

//   // ✅ handle input change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // ✅ GST validation with backend
//   const handleGSTValidation = async () => {
//     if (!formData.gstNumber) {
//       setGstValidationMsg("⚠️ GST number is required");
//       return;
//     }

//     const res = await validateGSTNumber(formData.gstNumber, formData.state);
//     if (res.success) {
//       setGstValidationMsg("✅ GST number is valid");
//     } else {
//       setGstValidationMsg(`❌ ${res.message || res.error}`);
//     }
//   };

//   // ✅ Save changes in parent state
//   useEffect(() => {
//     updateForm(formData);
//   }, [formData]);

//   return (
//     <div className="container py-5">
//       <div className="card shadow-sm mx-auto p-4" style={{ maxWidth: "550px", borderRadius: "16px" }}>
//         <h4 className="fw-bold mb-3">Billing Address</h4>

//         {/* Address Line 1 */}
//         <div className="mb-3">
//           <label className="form-label">Address Line 1</label>
//           <input
//             type="text"
//             name="addressLine1"
//             className="form-control"
//             value={formData.addressLine1}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Address Line 2 */}
//         <div className="mb-3">
//           <label className="form-label">Address Line 2</label>
//           <input
//             type="text"
//             name="addressLine2"
//             className="form-control"
//             value={formData.addressLine2}
//             onChange={handleChange}
//           />
//         </div>

//         {/* City */}
//         <div className="mb-3">
//           <label className="form-label">City</label>
//           <input
//             type="text"
//             name="city"
//             className="form-control"
//             value={formData.city}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* State */}
//         <div className="mb-3">
//           <label className="form-label">State</label>
//           <select
//             name="state"
//             className="form-select"
//             value={formData.state}
//             onChange={handleChange}
//             required
//           >
//             <option value="">-- Select State --</option>
//             <option value="MH">Maharashtra</option>
//             <option value="DL">Delhi</option>
//             <option value="GJ">Gujarat</option>
//             <option value="RJ">Rajasthan</option>
//             {/* aur bhi states add kar sakte ho */}
//           </select>
//         </div>

//         {/* Pincode */}
//         <div className="mb-3">
//           <label className="form-label">Pincode</label>
//           <input
//             type="text"
//             name="pincode"
//             className="form-control"
//             value={formData.pincode}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* GST Number */}
//         <div className="mb-3">
//           <label className="form-label">GST Number</label>
//           <div className="d-flex gap-2">
//             <input
//               type="text"
//               name="gstNumber"
//               className="form-control"
//               value={formData.gstNumber}
//               onChange={handleChange}
//               placeholder="Enter GST Number"
//             />
//             <button type="button" className="btn btn-outline-primary" onClick={handleGSTValidation}>
//               Validate
//             </button>
//           </div>
//           {gstValidationMsg && (
//             <small
//               className="d-block mt-1"
//               style={{ color: gstValidationMsg.includes("✅") ? "green" : "red" }}
//             >
//               {gstValidationMsg}
//             </small>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="d-flex justify-content-between mt-4">
//           <button className="btn btn-secondary" onClick={prev}>Back</button>
//           <button className="btn btn-success" onClick={next}>Continue</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Step2Address;
import React, { useState, useEffect } from "react";

interface Props {
  data: any;
  updateForm: (data: Partial<any>) => void;
  next: () => void;
  back: () => void;
}

const Step2Address: React.FC<Props> = ({ data, updateForm, next, back }) => {
  const [localData, setLocalData] = useState<any>({
    fullName: data.fullName || "",
    email: data.email || "",
    phone: data.phone || "",
    companyName: data.companyName || "",
    gstNo: data.gstNo || "",
    address: data.address || "",
    pinCode: data.pinCode || "",
    city: data.city || "",
    state: data.state || "",
  });

  useEffect(() => {
    updateForm(localData);
  }, [localData]);

  const handleChange = (field: string, value: string) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
  };

  const isValidGST = (gst?: string) => {
    if (!gst) return true;
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;
    return gstRegex.test(gst);
  };

  const handleNext = () => {
    if (!localData.fullName || !localData.email || !localData.phone) {
      alert("Full Name, Email and Phone are required");
      return;
    }
    if (localData.gstNo && !isValidGST(localData.gstNo)) {
      alert("Invalid GST format");
      return;
    }
    updateForm(localData);
    next();
  };

  return (
    <div className="container py-5">
    <div
      className="card shadow-sm mx-auto p-4"
      style={{ maxWidth: "550px", borderRadius: "16px" }}
    >
      <h4 className="fw-bold mb-3">Your Details</h4>
  
      {/* Full Name, Email, Phone, Company */}
      {[
        { label: "Full Name", field: "fullName" },
        { label: "Email", field: "email" },
        { label: "Phone", field: "phone" },
        { label: "Company", field: "companyName" },
      ].map((f) => (
        <div className="mb-3" key={f.field}>
          <label className="form-label fw-semibold">{f.label}</label>
          <input
            type="text"
            className="form-control"
            value={localData[f.field] || ""}
            onChange={(e) => handleChange(f.field, e.target.value)}
          />
        </div>
      ))}
  
      {/* GST Number */}
      <div className="mb-3">
        <label className="form-label fw-semibold">GST Number</label>
        <input
          type="text"
          className="form-control"
          value={localData.gstNo || ""}
          onChange={(e) =>
            handleChange("gstNo", e.target.value.toUpperCase())
          }
          placeholder="Enter GST Number"
        />
      </div>
  
      {/* Address */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Address</label>
        <textarea
          className="form-control"
          value={localData.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </div>
  
      {/* Pin Code */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Pin Code</label>
        <input
          type="text"
          className="form-control"
          value={localData.pinCode || ""}
          onChange={(e) => handleChange("pinCode", e.target.value)}
        />
      </div>
  
      {/* City (read-only) */}
      <div className="mb-3">
        <label className="form-label fw-semibold">City</label>
        <input
          type="text"
          className="form-control"
          value={localData.city || ""}
          readOnly
        />
      </div>
  
      {/* State (read-only) */}
      <div className="mb-3">
        <label className="form-label fw-semibold">State</label>
        <input
          type="text"
          className="form-control"
          value={localData.state || ""}
          readOnly
        />
      </div>
  
      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary" onClick={back}>
          Back
        </button>
        <button className="btn btn-success" onClick={handleNext}>
          Continue
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default Step2Address;
