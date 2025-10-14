// import React from "react";

// interface Props {
//   currentStep: number;
//   steps?: string[];
//   className?: string;
// }

// const StepIndicator: React.FC<Props> = ({
//   currentStep,
//   steps = ["Personal Info", "Contact Details", "Preferences", "Confirmation"],
//   className = "",
// }) => {

//   const getStepClasses = (stepNumber: number) => {
//     if (currentStep > stepNumber) return "bg-success text-white"; // completed
//     if (currentStep === stepNumber) return "bg-primary text-white"; // current
//     return "bg-light text-muted"; // pending
//   };

//   const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100;

//   return (
//     <div className={`container py-4 ${className}`}>
//       <div className="position-relative">
       

//         <div className="d-flex justify-content-center  " style={{ gap: "25px" }}>
//           {steps.map((label, index) => {
//             const stepNumber = index + 1;
//             const isCompleted = currentStep > stepNumber;

//             return (
//               <div key={stepNumber} className="d-flex flex-column align-items-center text-center" style={{ width: "max-content" }}>
//                 <div className={`rounded-circle d-flex align-items-center justify-content-center mb-2 ${getStepClasses(stepNumber)}`} style={{ width: "50px", height: "50px", fontWeight: 600, fontSize: "1rem", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
//                   {isCompleted ? (
//                     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
//                     </svg>
//                   ) : (
//                     <span>{stepNumber}</span>
//                   )}
//                 </div>
//                 <div className={`small ${isCompleted ? "text-success" : currentStep === stepNumber ? "text-primary fw-semibold" : "text-muted"}`} style={{ maxWidth: "80px", wordWrap: "break-word" }}>
//                   {label}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StepIndicator;


// import React from "react";

// const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
//   const steps = ["Order", "Details", "Review", "Payment"];
//   return (
//     <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
//       {steps.map((s, i) => (
//         <div key={s} style={{ padding: 8, borderRadius: 8, background: currentStep === i + 1 ? "#ddd" : "#f7f7f7" }}>
//           {i + 1}. {s}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StepIndicator;


import React from "react";

interface Props {
  currentStep: number;
}

const StepIndicator: React.FC<Props> = ({ currentStep }) => {
  const steps = ["Order", "Details", "Review", "Payment"];

  const getStepClasses = (stepNumber: number) => {
    if (currentStep > stepNumber) return "bg-success text-white"; // completed
    if (currentStep === stepNumber) return "bg-primary text-white"; // current
    return "bg-light text-muted"; // pending
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-center" style={{ gap: "25px" }}>
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;

          return (
            <div
              key={stepNumber}
              className="d-flex flex-column align-items-center text-center"
              style={{ width: "max-content" }}
            >
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center mb-2 ${getStepClasses(stepNumber)}`}
                style={{
                  width: "50px",
                  height: "50px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                {isCompleted ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
              <div
                className={`small ${
                  isCompleted
                    ? "text-success"
                    : currentStep === stepNumber
                    ? "text-primary fw-semibold"
                    : "text-muted"
                }`}
                style={{ maxWidth: "80px", wordWrap: "break-word" }}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
