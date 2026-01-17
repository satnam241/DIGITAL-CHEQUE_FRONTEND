import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { USER_AUTH, ENDPOINTS } from "../utils/constant";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface RegisterResponse {
  token: string;
  user: User;
  message?: string;
}

interface ApiError {
  message: string;
  errors?: { [key: string]: string[] };
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (isRegistered && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isRegistered && countdown === 0) {
      navigate("/login");
    }
  }, [isRegistered, countdown]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email address";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${USER_AUTH}${ENDPOINTS.signup}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data: RegisterResponse | ApiError = await response.json();

      if (!response.ok) {
        const errorData = data as ApiError;
        if (errorData.errors) setErrors(errorData.errors as any);
        else setErrors({ general: errorData.message || "Registration failed" });
        return;
      }

      const registerData = data as RegisterResponse;

      // Save authentication data
      sessionStorage.setItem("token", registerData.token);
      sessionStorage.setItem("user", JSON.stringify(registerData.user));

      setUser(registerData.user);
      setIsRegistered(true);
      setCountdown(3);

    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ general: "Network error. Please check your connection and try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  const handleSkipCountdown = () => { setCountdown(0); navigate("/login"); };


  return (
    <>
      {/* Bootstrap CSS */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.1/font/bootstrap-icons.min.css"
        rel="stylesheet"
      />

      <div className="">
        {/* Main Content Area */}
        <main 
          className="flex-grow-1 d-flex align-items-center justify-content-center"
          style={{ 
            background: "rgb(249,241,230)"
          }}
        >
          {isRegistered && user ? (
            <div 
              className="card shadow-lg border-0" 
              style={{
                maxWidth: "500px",
                width: "100%",
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.95)"
              }}
            >
              <div className="card-body text-center p-5">
                {/* Success Animation */}
                <div 
                  className="mb-4 mx-auto d-flex align-items-center justify-content-center success-icon"
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    borderRadius: "50%"
                  }}
                >
                  <i className="bi bi-check-circle-fill text-white" style={{ fontSize: "2.5rem" }}></i>
                </div>
                
                <h3 className="text-success mb-3">Account Created Successfully! 🎉</h3>
                <p className="text-muted mb-4">
                  Welcome , <strong>{user.name}</strong>!
                </p>
                
                {/* Countdown Display */}
                <div className="alert alert-info mb-4" style={{ borderRadius: "12px" }}>
                  <i className="bi bi-info-circle me-2"></i>
                  Redirecting to login page in <strong className="text-primary">{countdown}</strong> seconds...
                </div>
                
                {/* Progress Bar */}
                <div className="progress mb-4" style={{ height: "8px", borderRadius: "10px" }}>
                  <div 
                    className="progress-bar bg-success progress-bar-animated" 
                    role="progressbar" 
                    style={{ 
                      width: `${((3 - countdown) / 3) * 100}%`,
                      borderRadius: "10px"
                    }}
                  ></div>
                </div>
                
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success btn-lg"
                    onClick={handleSkipCountdown}
                    style={{ borderRadius: "12px" }}
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Go to Login Now
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/cheque-printing")}
                    style={{ borderRadius: "12px" }}
                  >
                    <i className="bi bi-printer me-2"></i>
                    Skip to Cheque Printing
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Signup Form
            <div 
              className="card shadow-lg border-0 my-5 " 
              style={{
                maxWidth: "500px",
                width: "100%",
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.95)",
                
              }}
            >
              {/* Header */}
              <div 
                className="text-white text-center p-4"
                style={{
                  background: "#0B7456",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px"
                }}
              >
                <div 
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "15px"
                  }}
                >
                  <i className="bi bi-person-plus" style={{ fontSize: "2rem" }}></i>
                </div>
                <h2 className="mb-2">Create Account</h2>
                
              </div>

              {/* Form Body */}
              <div className="card-body p-4 " >
                {/* General Error Alert */}
                {errors.general && (
                  <div className="alert alert-danger mb-4 mt-5" style={{ borderRadius: "12px" }}>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {errors.general}
                  </div>
                )}

                {/* Full Name Field */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold text-dark">
                   
                  
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    disabled={isLoading}
                    style={{
                      borderRadius: "12px",
                      border: "2px solid e5e7eb",
                      padding: "12px 16px",
                      fontSize: "16px"
                    }}
                  />
                  {errors.name && (
                    <div className="invalid-feedback d-block">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold text-dark">
                   
                  
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                    style={{
                      borderRadius: "12px",
                      border: "2px solid #e5e7eb",
                      padding: "12px 16px",
                      fontSize: "16px"
                    }}
                  />
                  {errors.email && (
                    <div className="invalid-feedback d-block">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Phone Field */}
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label fw-semibold text-dark">
                   
                  
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                    disabled={isLoading}
                    style={{
                      borderRadius: "12px",
                      border: "2px solid #e5e7eb",
                      padding: "12px 16px",
                      fontSize: "16px"
                    }}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback d-block">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {errors.phone}
                    </div>
                  )}
                  <div className="form-text">
                   
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold text-dark">
                    
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a strong password"
                      disabled={isLoading}
                      style={{
                        borderRadius: "12px",
                        border: "2px solid #e5e7eb",
                        padding: "12px 50px 12px 16px",
                        fontSize: "16px"
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted"
                      onClick={togglePasswordVisibility}
                      disabled={isLoading}
                      style={{ zIndex: 10, border: "none" }}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                  {errors.password && (
                    <div className="invalid-feedback d-block">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label fw-semibold text-dark">
                    
                  </label>
                  <div className="position-relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      disabled={isLoading}
                      style={{
                        borderRadius: "12px",
                        border: "2px solid #e5e7eb",
                        padding: "12px 50px 12px 16px",
                        fontSize: "16px"
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted"
                      onClick={toggleConfirmPasswordVisibility}
                      disabled={isLoading}
                      style={{ zIndex: 10, border: "none" }}
                    >
                      <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="invalid-feedback d-block">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className={`form-check-input ${errors.agreeTerms ? 'is-invalid' : ''}`}
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      style={{
                        accentColor: "#0B7456",   
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        appearance: "none",
                      }} />
                  <label className="form-check-label text-muted" htmlFor="agreeTerms">
  I agree to the{" "}
  <a 
    href="terms-of-service" 
    className="text-decoration-none" 
    style={{ color: "#0B7456" }}
  >
    Terms of Service
  </a>{" "}
  and{" "}
  <a 
    href="/privacy-policy" 
    className="text-decoration-none" 
    style={{ color: "#0B7456" }}
  >
    Privacy Policy
  </a>
</label>

                  </div>
                  {errors.agreeTerms && (
                    <div className="text-danger small mt-1">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {errors.agreeTerms}
                    </div>
                  )}
                </div>

                {/* Signup Button */}
                <div className="d-grid mb-4">
                  <button
                    type="button"
                    onClick={handleSignup}
                    disabled={isLoading}
                    className="btn btn-lg text-white fw-semibold"
                    style={{
                      background: "#0B7456",
                      border: "none",
                      borderRadius: "12px",
                      padding: "14px 24px",
                      fontSize: "16px"
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span 
                          className="spinner-border spinner-border-sm me-2" 
                          role="status" 
                          aria-hidden="true"
                        ></span>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus me-2"></i>
                        Create Account
                      </>
                    )}
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-muted mb-0">
                    Already have an account?{" "}
                    <a
  href="#"
  className="text-decoration-none fw-semibold"
  style={{ color: "#0B7456" }}
  onClick={(e) => {
    e.preventDefault();
    navigate("/login");
  }}
>
  

                      Sign In Here
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Custom Styles */}
      <style>{`
      
        
        .navbar {
          position: sticky !important;
          top: 0;
          z-index: 1030;
        }
        
        .form-control:focus {
          border-color: #0B7456 !important;
          box-shadow: 0 0 0 0.2rem rgba(79, 70, 229, 0.25) !important;
        }
        
        .btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          transition: all 0.2s ease;
        }
        
        .card {
          backdrop-filter: blur(10px);
        }
        
        .btn-link:hover {
          color: #4f46e5 !important;
        }
        
        .navbar-brand:hover {
          color: #ffffff !important;
        }
        
     
        
        footer a:hover {
          color: #ffffff !important;
        }
        
        .spinner-border-sm {
          width: 1rem;
          height: 1rem;
        }
        
        main {
          min-height: calc(100vh - 200px);
          margin: 0;
          padding: 0;
        }
        
        .form-text {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .alert {
          font-size: 0.9rem;
        }
        
        input[type="tel"] {
          -moz-appearance: textfield;
        }
        
        input[type="tel"]::-webkit-outer-spin-button,
        input[type="tel"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        .success-icon {
          animation: successPulse 2s ease-in-out infinite;
        }
        
        @keyframes successPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .progress-bar {
          transition: width 1s ease-in-out;
        }
        
        .card {
          transition: transform 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
};

export default SignupPage;