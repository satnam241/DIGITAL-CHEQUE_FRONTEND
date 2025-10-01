
import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  return (
    <div className="payment-success-container">
      <div className="success-card">
        <div className="success-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#10B981" />
            <path d="m9 12 2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Your payment has been processed successfully.</p>
        
        <div className="success-details">
          <p>You will receive a confirmation email shortly with your subscription details.</p>
          <p>You can now access all the features of your selected plan.</p>
        </div>
        
        <div className="success-actions">
          <Link to="/dashboard" className="btn-primary">
            Go to Dashboard
          </Link>
          <Link to="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;