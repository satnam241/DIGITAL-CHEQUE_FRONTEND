import React, { useState, useEffect } from "react";
import StepIndicator from "./StepIndicator";
import OrderDetailsPage from "./OrderDetailsPage"; // Reuse your first step component
import Step2Address from "./Step2Address";
import Step3Review from "./Step3Review";
import Step4Payment from "./Step4Payment";

const WizardForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
  });

  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  useEffect(() => {
    const storedPlan = sessionStorage.getItem("selectedPlan");
    if (storedPlan) setSelectedPlan(JSON.parse(storedPlan));
  }, []);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateForm = (data: Partial<typeof formData>) =>
    setFormData({ ...formData, ...data });

  if (!selectedPlan) {
    return <p>Loading selected plan...</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        <StepIndicator currentStep={step} />

        {step === 1 && (
          <OrderDetailsPage
            plan={selectedPlan}
            next={nextStep}
          />
        )}
        {step === 2 && (
          <Step2Address
            data={formData}
            updateForm={updateForm}
            next={nextStep}
            back={prevStep}
          />
        )}
        {step === 3 && (
          <Step3Review data={formData} next={nextStep} back={prevStep} />
        )}
        {step === 4 && <Step4Payment back={prevStep} />}
      </div>
    </div>
  );
};

export default WizardForm;
