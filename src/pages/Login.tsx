// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const LoginPage: React.FC = () => {
//   const { login, isAuthenticated } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = (location.state as any)?.from?.pathname || "/dashboard";

//   const [formData, setFormData] = useState({ email: "", password: "", rememberMe: true });
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // Redirect if already logged in
//   useEffect(() => {
//     if (isAuthenticated) navigate(from, { replace: true });
//   }, [isAuthenticated, navigate, from]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
//   };

//   const validateForm = () => {
//     const newErrors: { [key: string]: string } = {};
//     if (!formData.email) newErrors.email = "Email required";
//     if (!formData.password) newErrors.password = "Password required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     try {
//       // Replace with your real API call
//       const fakeResponse = {
//         token: "fake-token-123",
//         user: { id: 1, email: formData.email, name: "Test User", role: "user" },
//       };

//       login(fakeResponse.token, fakeResponse.user, formData.rememberMe);
//     } catch (err) {
//       setErrors({ general: "Login failed" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => setShowPassword(prev => !prev);

//   return (
//     <main
//       className="d-flex align-items-center justify-content-center p-3"
//       style={{ background: "rgb(249,241,230)", minHeight: "" }}
//     >
//       <div
//         className="card shadow-lg border-0"
//         style={{
//           maxWidth: "450px",
//           width: "100%",
//           borderRadius: "20px",
//           background: "rgba(255,255,255,0.95)",
//           marginTop: "px",
//         }}
//       >
//         <div
//           className="text-white text-center p-4 mb-5"
//           style={{ background: "#0B7456", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
//         >
//           <div
//             className="mx-auto mb-3 d-flex align-items-center justify-content-center"
//             style={{
//               width: "60px",
//               height: "60px",
//               background: "rgba(255,255,255,0.2)",
//               borderRadius: "15px",
//             }}
//           >
//             <i className="bi bi-shield-lock" style={{ fontSize: "2rem" }} />
//           </div>
//           <h2 className="mb-2">Login</h2>
//           <p className="mb-0 opacity-75">Access your Cheque services</p>
//         </div>

//         <form className="card-body p-4" onSubmit={handleLogin}>
//           {errors.general && <div className="alert alert-danger mb-4">{errors.general}</div>}

//           <div className="mb-3">
//             <label className="form-label fw-semibold text-dark">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               className={`form-control ${errors.email ? "is-invalid" : ""}`}
//               value={formData.email}
//               onChange={handleInputChange}
//               disabled={isLoading}
//               autoComplete="email"
//             />
//             {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-semibold text-dark">Password</label>
//             <div className="position-relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 className={`form-control ${errors.password ? "is-invalid" : ""}`}
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 autoComplete="current-password"
//               />
//               <button
//                 type="button"
//                 className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
//                 onClick={togglePasswordVisibility}
//               >
//                 <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} style={{ color: "#0B7456" }} />
//               </button>
//             </div>
//             {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
//           </div>

//           <div className="form-check mb-4">
//             <input
//               type="checkbox"
//               name="rememberMe"
//               className="form-check-input"
//               checked={formData.rememberMe}
//               onChange={handleInputChange}
//               disabled={isLoading}
//             />
//             <label className="form-check-label text-muted">Remember me (session only)</label>
//           </div>

//           <div className="d-grid mb-4">
//             <button
//               type="submit"
//               className="btn btn-lg text-white fw-semibold"
//               style={{ background: "#0B7456", borderRadius: "12px" }}
//               disabled={isLoading}
//             >
//               {isLoading ? "Authenticating..." : "Sign In Securely"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// };

// export default LoginPage;














































import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { USER_AUTH, ENDPOINTS } from "../utils/constant";

interface ApiError {
  message: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);

  const [activeRole, setActiveRole] = useState<"user" | "admin">("user");
  const [activeTab, setActiveTab] = useState<"login" | "forgot" | "reset">("login");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [resetData, setResetData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(activeRole === "admin" ? "/admin/dashboard" : "/dashboard");
    }
  }, [isAuthenticated, navigate, activeRole]);

  /** 🔹 Handle input changes */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (activeTab === "login") {
      setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    } else {
      setResetData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /** 🔹 Validations */
  const validateLogin = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 chars";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForgot = () => {
    const newErrors: { [key: string]: string } = {};
    if (!resetData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetData.email)) newErrors.email = "Invalid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateReset = () => {
    const newErrors: { [key: string]: string } = {};
    if (!resetData.otp.trim()) newErrors.otp = "OTP is required";
    if (!resetData.newPassword.trim()) newErrors.newPassword = "New password required";
    else if (resetData.newPassword.length < 6) newErrors.newPassword = "Password min 6 chars";
    if (resetData.newPassword !== resetData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** 🔹 Handle Login */
  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateLogin()) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMsg("");

    try {
      // Determine endpoint by role
      const endpoint =
        activeRole === "admin"
          ? `${USER_AUTH}${ENDPOINTS.loginAdmin}`
          : `${USER_AUTH}${ENDPOINTS.loginUser}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include", // include cookies for JWT
      });

      const data: { user?: User; token?: string; message?: string } | ApiError =
        await response.json();

      if (!response.ok) {
        if (response.status === 403 && data.message?.toLowerCase().includes("plan")) {
          setErrors({ general: data.message });
        } else {
          setErrors({ general: data.message || "Login failed" });
        }
        return;
      }

      // ✅ Successful login
      if ((data as any).user) {
        const token = (data as any).token || "";
        login(token, (data as any).user);
        navigate(activeRole === "admin" ? "/admin/dashboard" : "/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  /** 🔹 Forgot Password */
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForgot()) return;
    setIsLoading(true);
    setErrors({});
    setSuccessMsg("");

    try {
      const response = await fetch(`${USER_AUTH}${ENDPOINTS.forgotPassword}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetData.email }),
      });
      const data: ApiError = await response.json();
      if (!response.ok) return setErrors({ general: data.message || "Failed" });
      setSuccessMsg("OTP sent to your email!");
      setActiveTab("reset");
    } catch (err) {
      console.error(err);
      setErrors({ general: "Network error" });
    } finally {
      setIsLoading(false);
    }
  };

  /** 🔹 Reset Password */
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateReset()) return;
    setIsLoading(true);
    setErrors({});
    setSuccessMsg("");

    try {
      const response = await fetch(`${USER_AUTH}${ENDPOINTS.RESET_PASSWORD_OTP}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: resetData.email,
          otp: resetData.otp,
          newPassword: resetData.newPassword,
        }),
      });

      const data: ApiError = await response.json();
      if (!response.ok) return setErrors({ general: data.message || "Reset failed" });

      setSuccessMsg("Password reset successfully! Redirecting to login...");
      setTimeout(() => setActiveTab("login"), 3000);
    } catch (err) {
      console.error(err);
      setErrors({ general: "Network error" });
    } finally {
      setIsLoading(false);
    }
  };

  /** 🔹 Render Form */
  const renderForm = () => {
    switch (activeTab) {
      case "login":
        return (
          <form className="card-body p-4" onSubmit={handleLogin}>
            {errors.general && <div className="alert alert-danger">{errors.general}</div>}
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                disabled={isLoading}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label>Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                </button>
              </div>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="d-grid mb-2">
              <button type="submit" className="btn btn-success" disabled={isLoading}>
                {isLoading ? "Authenticating..." : "Login"}
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setActiveTab("forgot")}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        );

      case "forgot":
        return (
          <form className="card-body p-4" onSubmit={handleForgot}>
            {errors.general && <div className="alert alert-danger">{errors.general}</div>}
            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={resetData.email}
                onChange={handleInputChange}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                disabled={isLoading}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="d-grid mb-2">
              <button type="submit" className="btn btn-success" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send OTP"}
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setActiveTab("login")}
              >
                Back to Login
              </button>
            </div>
          </form>
        );

      case "reset":
        return (
          <form className="card-body p-4" onSubmit={handleReset}>
            {errors.general && <div className="alert alert-danger">{errors.general}</div>}
            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            <div className="mb-3">
              <label>OTP</label>
              <input
                type="text"
                name="otp"
                value={resetData.otp}
                onChange={handleInputChange}
                className={`form-control ${errors.otp ? "is-invalid" : ""}`}
                disabled={isLoading}
              />
              {errors.otp && <div className="invalid-feedback">{errors.otp}</div>}
            </div>
            <div className="mb-3">
              <label>New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={resetData.newPassword}
                onChange={handleInputChange}
                className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                disabled={isLoading}
              />
              {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
            </div>
            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={resetData.confirmPassword}
                onChange={handleInputChange}
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>
            <div className="d-grid mb-2">
              <button type="submit" className="btn btn-success" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setActiveTab("login")}
              >
                Back to Login
              </button>
            </div>
          </form>
        );
    }
  };

  return (
    <main
      className="d-flex align-items-center justify-content-center p-3"
      style={{ background: "rgb(249,241,230)", minHeight: "100vh" }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          maxWidth: "450px",
          width: "100%",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <div
          className="text-white text-center p-4"
          style={{
            background: "#0b7456",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        >
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: "60px",
              height: "60px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "15px",
            }}
          >
            <i className="bi bi-shield-lock" style={{ fontSize: "2rem" }} />
          </div>
          <h2 className="mb-2">
            {activeTab === "login"
              ? activeRole === "admin"
                ? "Admin Login"
                : "User Login"
              : activeTab === "forgot"
              ? "Forgot Password"
              : "Reset Password"}
          </h2>
          <p className="mb-0 opacity-75">
            {activeTab === "login"
              ? "Access securely"
              : activeTab === "forgot"
              ? "Enter email to receive OTP"
              : "Enter OTP & new password"}
          </p>
        </div>

        {activeTab === "login" && (
          <div className="d-flex justify-content-center mt-3">
            <div className="btn-group">
              <button
                type="button"
                className={`btn ${
                  activeRole === "user" ? "btn-success text-white" : "btn-outline-success"
                }`}
                onClick={() => setActiveRole("user")}
              >
                User
              </button>
              <button
                type="button"
                className={`btn ${
                  activeRole === "admin" ? "btn-success text-white" : "btn-outline-success"
                }`}
                onClick={() => setActiveRole("admin")}
              >
                Admin
              </button>
            </div>
          </div>
        )}

        {renderForm()}
      </div>
    </main>
  );
};

export default LoginPage;


// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const LoginPage: React.FC = () => {
//   const { login, isAuthenticated } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = (location.state as any)?.from?.pathname || "/dashboard";

//   const [formData, setFormData] = useState({ email: "", password: "", rememberMe: true });
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(false);

//   // Redirect if already logged in
//   useEffect(() => {
//     if (isAuthenticated) navigate(from, { replace: true });
//   }, [isAuthenticated, navigate, from]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
//   };

//   const validateForm = () => {
//     const newErrors: { [key: string]: string } = {};
//     if (!formData.email) newErrors.email = "Email required";
//     if (!formData.password) newErrors.password = "Password required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     try {
//       // Replace with your API call
//       const fakeResponse = {
//         token: "fake-token-123",
//         user: { id: 1, email: formData.email, name: "Test User", role: "user" },
//       };

//       login(fakeResponse.token, fakeResponse.user, formData.rememberMe);
//     } catch (err) {
//       setErrors({ general: "Login failed" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       {errors.general && <p>{errors.general}</p>}
//       <input name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
//       {errors.email && <p>{errors.email}</p>}

//       <input name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" type="password" />
//       {errors.password && <p>{errors.password}</p>}

//       <label>
//         <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} />
//         Remember Me
//       </label>

//       <button type="submit" disabled={isLoading}>
//         {isLoading ? "Logging in..." : "Login"}
//       </button>
//     </form>
//   );
// };

// export default LoginPage;
