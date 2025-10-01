
    import React, { useState, useEffect } from "react";
    import { useNavigate } from "react-router-dom";
    
import {USER_AUTH,ENDPOINTS } from "../utils/constant";
    import "../App.css";

    interface Plan {
      _id: string;
      name: string;
      price: number;
      cheques: number | string;
      durationDays: number;
    }

    const Plans: React.FC = () => {
      const [plans, setPlans] = useState<Plan[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const navigate = useNavigate();

      useEffect(() => {
        fetchPlans();
      }, []);


      const fetchPlans = async () => {
        try {
          const response = await fetch(`${USER_AUTH}${ENDPOINTS.GET_PLAN}`);
          if (!response.ok) throw new Error("Failed to fetch plans");
          const data = await response.json();
          setPlans(data);
        } catch (err: any) {
          setError(err.message);
          console.error("Error fetching plans:", err);
        } finally {
          setLoading(false);
        }
      };

      const handlePlanSelect = (planId: string) => {
        const plan = plans.find((p) => p._id === planId);
        if (plan) {
          sessionStorage.setItem("selectedPlan", JSON.stringify(plan));
          navigate("/payment-wizard"); 
        }
      };

      if (loading) {
        return (
          <div className="plans-loading">
            <div className="spinner"></div>
            <p>Loading plans...</p>
          </div>
        );
      }

      if (error) {
        return (
          <div className="plans-error">
            <p>Error: {error}</p>
          </div>
        );
      }

      return (
        <div className="plans-container">
          <header className="plans-header">
            <h1>Choose Your Plan</h1>
            <p>Select the perfect plan for your needs</p>
          </header>

          <div className="plans-grid">
            {plans.length === 0 ? (
              <p>No plans available at the moment.</p>
            ) : (
              plans.map((plan) => (
                <div key={plan._id} className="plan-card">
                  <div className="plan-header">
                    <h3>{plan.name}</h3>
                    <div className="plan-price">
                      <span className="currency">Rs:</span>
                      <span className="amount">{plan.price}</span>
                      <span className="duration">
                        {plan.durationDays >= 30
                          ? ` / ${plan.durationDays / 30} Month`
                          : ` / ${plan.durationDays} Days`}
                      </span>
                    </div>
                  </div>

                  <ul className="plan-features">
                    <li>
                      <span className="checkmark">✓</span>
                      {plan.cheques} cheques allowed
                    </li>
                    <li>
                      <span className="checkmark">✓</span>
                      Valid for {plan.durationDays} days
                    </li>
                  </ul>

                  <button
                    className="select-plan-btn"
                    onClick={() => handlePlanSelect(plan._id)}
                  >
                    Select Plan
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      );
    };

    export default Plans;