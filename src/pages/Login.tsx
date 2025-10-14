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
  errors?: { [key: string]: string[] };
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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [activeRole, setActiveRole] = useState<"user" | "admin">("user");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(activeRole === "admin" ? "/admin/dashboard" : "/dashboard");
    }
  }, [isAuthenticated, navigate, activeRole]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
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
        credentials: "include",
      });

      const data: { user?: User; token?: string; message?: string } | ApiError =
        await response.json();

      if (!response.ok) {
        const err = data as ApiError;
        setErrors({ general: err.message || "Login failed" });
        return;
      }

      if (data.user && (data as any).token) {
        const token = (data as any).token;
        login(token, data.user);

        localStorage.setItem("token", token);
        navigate(activeRole === "admin" ? "/admin/dashboard" : "/dashboard");
      } else {
        setErrors({ general: data.message || "Login failed" });
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
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
        {/* Header */}
        <div
          className="text-white text-center p-4"
          style={{
            background: "#0B7456",
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
            {activeRole === "admin" ? "Admin Login" : "User Login"}
          </h2>
          <p className="mb-0 opacity-75">
            {activeRole === "admin"
              ? "Access your Admin Dashboard securely"
              : "Access your Cheque services securely"}
          </p>
        </div>

        {/* Role Toggle Tabs */}
        <div className="d-flex justify-content-center mt-3">
          <div className="btn-group" role="group" aria-label="Role selection">
            <button
              type="button"
              className={`btn ${
                activeRole === "user" ? "btn-success text-white" : "btn-outline-success"
              }`}
              onClick={() => setActiveRole("user")}
              disabled={isLoading}
            >
              User Login
            </button>
            <button
              type="button"
              className={`btn ${
                activeRole === "admin" ? "btn-success text-white" : "btn-outline-success"
              }`}
              onClick={() => setActiveRole("admin")}
              disabled={isLoading}
            >
              Admin Login
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form className="card-body p-4" onSubmit={handleLogin}>
          {errors.general && (
            <div className="alert alert-danger mb-4">{errors.general}</div>
          )}

          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">Email Address</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.email && (
              <div className="invalid-feedback d-block">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <button
                type="button"
                className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  style={{ color: "#0B7456" }}
                />
              </button>
            </div>
            {errors.password && (
              <div className="invalid-feedback d-block">{errors.password}</div>
            )}
          </div>

          <div className="form-check mb-4">
            <input
              type="checkbox"
              name="rememberMe"
              className="form-check-input"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <label className="form-check-label text-muted">
              Remember me (session only)
            </label>
          </div>

          <div className="d-grid mb-4">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-lg text-white fw-semibold"
              style={{
                background: "#0B7456",
                borderRadius: "12px",
              }}
            >
              {isLoading
                ? "Authenticating..."
                : activeRole === "admin"
                ? "Login as Admin"
                : "Login as User"}
            </button>
          </div>
        </form>
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
