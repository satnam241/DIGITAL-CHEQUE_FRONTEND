// import React, { useState, useEffect } from "react";
// import StepIndicator from "./StepIndicator";
// import OrderDetailsPage from "./OrderDetailsPage";
// import Step2Address from "./Step2Address";
// import Step3Review from "./Step3Review";
// import Step4Payment from "./Step4Payment";

// const WizardForm: React.FC = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState<any>({});
//   const [selectedPlan, setSelectedPlan] = useState<any>(null);

//   // Load plan from sessionStorage
//   useEffect(() => {
//     const storedPlan = sessionStorage.getItem("selectedPlan");
//     if (storedPlan) setSelectedPlan(JSON.parse(storedPlan));
//   }, []);

//   const nextStep = () => setStep(prev => prev + 1);
//   const prevStep = () => setStep(prev => prev - 1);

//   const updateForm = (data: Partial<any>) => {
//     setFormData(prev => ({ ...prev, ...data }));
//   };

//   if (!selectedPlan) return <p>Loading plan...</p>;

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
//       <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
//         <StepIndicator currentStep={step} />

//         {/* Step 1: Order Details */}
//         {step === 1 && (
//           <OrderDetailsPage
//             plan={selectedPlan}
//             next={nextStep}
//             updateOrderData={(orderData: any) => updateForm({ orderData })}
//           />
//         )}

//         {/* Step 2: Address & User Details */}
//         {step === 2 && (
//           <Step2Address
//             data={{ ...formData, plan: selectedPlan }} // pass selected plan
//             updateForm={updateForm}
//             next={nextStep}
//             back={prevStep}
//           />
//         )}

//         {/* Step 3: Review */}
//         {step === 3 && (
//           <Step3Review
//             data={{ ...formData, plan: selectedPlan }} // pass plan + orderData
//             next={nextStep}
//             back={prevStep}
//           />
//         )}

       
// {step === 4 && (
//   <Step4Payment
//     planId={selectedPlan._id}
//     payableAmount={formData.orderData?.payableAmount || 0}
//     userDetails={{
//       userId: formData.userId,   // ✅ Ensure this comes from login/session
//       fullName: formData.fullName,
//       email: formData.email,
//       phone: formData.phone,
//       companyName: formData.companyName,
//       gstNo: formData.gstNo,
//       address: formData.address,
//       city: formData.city,
//       state: formData.state,
//     }}
//   />
// )}

//       </div>
//     </div>
//   );
// };

// export default WizardForm;

import { useEffect, useState } from "react";
import StepIndicator from "./StepIndicator";
import OrderDetailsPage from "./OrderDetailsPage";
import type { OrderData } from "./OrderDetailsPage";
import Step2Address from "./Step2Address";
import Step3Review from "./Step3Review";
import Step4Payment from "./Step4Payment";

/* -------------------- Types -------------------- */

interface SelectedPlan {
  _id: string;
  price: number;
  name: string;
}

interface WizardFormData {
  orderData?: OrderData;

  userId?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  gstNo?: string;
  address?: string;
  city?: string;
  state?: string;
}

/* -------------------- Component -------------------- */

const WizardForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>({});
  const [selectedPlan, setSelectedPlan] =
    useState<SelectedPlan | null>(null);

  useEffect(() => {
    const p = sessionStorage.getItem("selectedPlan");
    if (p) {
      setSelectedPlan(JSON.parse(p));
    }
  }, []);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const updateForm = (data: Partial<WizardFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data,
    }));
  };

  if (!selectedPlan) return <p>Loading plan...</p>;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <div style={{ padding: 16 }}>
        <StepIndicator currentStep={step} />

        {/* STEP 1 */}
        {step === 1 && (
          <OrderDetailsPage
            plan={selectedPlan}
            next={nextStep}
            updateOrderData={d => updateForm({ orderData: d })}
          />
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <Step2Address
            data={{ ...formData, plan: selectedPlan }}
            updateForm={updateForm}
            next={nextStep}
            back={prevStep}
          />
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <Step3Review
            data={{ ...formData, plan: selectedPlan }}
            back={prevStep}
            next={nextStep}
          />
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <Step4Payment
            planId={selectedPlan._id}
            payableAmount={
              formData.orderData?.payableAmount ??
              selectedPlan.price
            }
            userDetails={{
              userId: formData.userId,
              fullName: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              companyName: formData.companyName,
              gstNo: formData.gstNo,
              address: formData.address,
              city: formData.city,
              state: formData.state,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default WizardForm;
