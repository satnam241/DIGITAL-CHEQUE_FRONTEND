// import React, { useState } from 'react';
// import { StepIndicator } from './common/StepIndicator';
// import { NavigationControls } from './common/NavigationControls'
// import { PersonalInfoStep } from './steps/PersonalInfoStep';
// import { AddressBusinessStep } from './steps/AddressBusinessStep';
// import { PlanReviewStep } from './steps/PlanReviewStep';
// import { ReviewPaymentStep } from './steps/ReviewPaymentStep';
// import { WizardData } from '../types';
// import '../App.css';

// const STEPS = [
//   { id: 1, title: 'Personal Info', component: PersonalInfoStep },
//   { id: 2, title: 'Address & Business', component: AddressBusinessStep },
//   { id: 3, title: 'Plan Review', component: PlanReviewStep },
//   { id: 4, title: 'Review & Payment', component: ReviewPaymentStep },
// ];

// export const PaymentWizard: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [wizardData, setWizardData] = useState<WizardData>({
//     personalInfo: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: ''
//     },
//     addressBusiness: {
//       address: '',
//       city: '',
//       state: '',
//       zipCode: '',
//       businessName: '',
//       businessType: ''
//     },
//     planReview: {
//       selectedPlan: '',
//       addOns: [],
//       totalAmount: 0
//     },
//     reviewPayment: {
//       paymentMethod: '',
//       cardNumber: '',
//       expiryDate: '',
//       cvv: '',
//       billingAddress: ''
//     }
//   });

//   const updateWizardData = (stepData: Partial<WizardData>) => {
//     setWizardData(prev => ({ ...prev, ...stepData }));
//   };

//   const handleNext = () => {
//     if (currentStep < STEPS.length) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleStepClick = (step: number) => {
//     setCurrentStep(step);
//   };

//   const handleSubmit = async () => {
//     try {
//       // Handle final submission
//       console.log('Submitting wizard data:', wizardData);
//       // Add your submission logic here
//     } catch (error) {
//       console.error('Submission error:', error);
//     }
//   };

//   const CurrentStepComponent = STEPS[currentStep - 1].component;

//   return (
//     <div className="payment-wizard">
//       <div className="wizard-container">
//         <StepIndicator
//           steps={STEPS}
//           currentStep={currentStep}
//           onStepClick={handleStepClick}
//         />

//         <div className="step-content">
//           <CurrentStepComponent
//             data={wizardData}
//             onUpdate={updateWizardData}
//           />
//         </div>

//         <NavigationControls
//           currentStep={currentStep}
//           totalSteps={STEPS.length}
//           onNext={handleNext}
//           onPrevious={handlePrevious}
//           onSubmit={handleSubmit}
//         />
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isAuthenticated = sessionStorage.getItem('authToken');

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          PaymentWizard
        </Link>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/plans" 
            className={`nav-link ${isActive('/plans')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Plans
          </Link>
          <Link 
            to="/cheque-printing" 
            className={`nav-link ${isActive('/cheque-printing')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Cheque Printing
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/payment-wizard" 
                className={`nav-link ${isActive('/payment-wizard')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Payment Wizard
              </Link>
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="nav-link logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`nav-link ${isActive('/login')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className={`nav-link signup-btn ${isActive('/signup')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
        
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};