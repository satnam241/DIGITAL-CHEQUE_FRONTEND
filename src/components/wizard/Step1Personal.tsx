import { useState } from "react";
import OrderDetailsPage from "./OrderDetailsPage";
import Step4Payment from "./Step4Payment";

/* -------------------- Types -------------------- */

interface Plan {
  _id: string;
  name: string;
  price: number;
}

interface OrderData {
  taxableAmount?: number;
  gst?: number;
  payableAmount?: number;
}

interface WizardData {
  plan: Plan;
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

interface Props {
  data: WizardData;
  updateForm: (data: Partial<WizardData>) => void;
  next: () => void;
}

/* -------------------- Component -------------------- */

const Step1Personal = ({ data, updateForm }: Props) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prev => prev + 1);
  // const prevStep = () => setStep(prev => prev - 1);

  return (
    <>
      {/* STEP 1: Order Details */}
      {step === 1 && (
        <OrderDetailsPage
          plan={data.plan}
          next={nextStep}
          updateOrderData={orderData =>
            updateForm({ orderData })
          }
        />
      )}

      {/* STEP 2: Payment */}
      {step === 2 && (
        <Step4Payment
          planId={data.plan._id}
          payableAmount={
            data.orderData?.payableAmount ?? data.plan.price
          }
          userDetails={{
            userId: data.userId,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            companyName: data.companyName,
            gstNo: data.gstNo,
            address: data.address,
            city: data.city,
            state: data.state,
          }}
        />
      )}
    </>
  );
};

export default Step1Personal;
