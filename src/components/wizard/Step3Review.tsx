import React, { useState } from "react";

interface Step3Props {
  data: any;
  back: () => void;
  next: () => void;
}

const Step3Review: React.FC<Step3Props> = ({ data, back, next }) => {
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      next();
    }, 300);
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px", borderRadius: "16px" }}>
        <h3 className="fw-bold mb-3">Review Your Details</h3>

        {/* Plan & Order */}
        <div className="mb-2"><strong>Plan:</strong> {data.plan?.name}</div>
        <div className="mb-2"><strong>Quantity:</strong> {data.orderData?.quantity}</div>

        {/* GST & Amount Breakdown */}
        <div className="mb-2"><strong>Taxable Amount:</strong> ₹{data.orderData?.taxableAmount?.toLocaleString()}</div>
        <div className="mb-2"><strong>GST (18%):</strong> ₹{data.orderData?.gst?.toFixed(2)}</div>
        <div className="mb-2">
          <strong>Payable Amount:</strong> <span className="text-success fw-bold">₹{data.orderData?.payableAmount?.toLocaleString()}</span>
        </div>

        {/* User Info */}
        <div className="mb-2"><strong>Full Name:</strong> {data.fullName}</div>
        <div className="mb-2"><strong>Email:</strong> {data.email}</div>
        <div className="mb-2"><strong>Phone:</strong> {data.phone}</div>
        <div className="mb-2"><strong>Company:</strong> {data.companyName}</div>

        {/* GST Number with validation status */}
        <div className="mb-2">
          <strong>GST Number:</strong> {data.gstNo || "-"}{" "}
          {data.orderData?.gstValid !== undefined && (
            <span style={{ color: data.orderData.gstValid ? "green" : "red", fontWeight: 600 }}>
              {data.orderData.gstValid ? "✅ Valid" : "❌ Invalid"}
            </span>
          )}
        </div>

        {/* Address */}
        <div className="mb-2"><strong>Address:</strong> {data.address}</div>
        <div className="mb-2"><strong>City:</strong> {data.city}</div>
        <div className="mb-2"><strong>State:</strong> {data.state}</div>

        {/* Navigation */}
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-secondary fw-semibold px-4" onClick={back} disabled={loading}>Back</button>
          <button className="btn btn-success fw-semibold px-4" onClick={handleNext} disabled={loading}>
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3Review;
