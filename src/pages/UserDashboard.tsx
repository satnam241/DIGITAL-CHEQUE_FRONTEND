// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Navbar } from "../components/Navbar";
// // import { Printer, CreditCard, Calendar, CheckCircle, Clock } from "lucide-react";
// // import { USER_PROP, ENDPOINTS } from "../utils/constant";
// // import { Spinner } from "react-bootstrap";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // const UserDashboard = () => {
// //   const [activeTab, setActiveTab] = useState("overview");
// //   const [dashboardData, setDashboardData] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchDashboardData();
// //   }, []);

// //   const fetchDashboardData = async () => {
// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem("authToken");
// //       const res = await fetch(`${USER_PROP}${ENDPOINTS.USER_DASHBOARD}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       if (!res.ok) throw new Error("Failed to fetch dashboard");
// //       const data = await res.json();
// //       setDashboardData(data);
// //     } catch (err: any) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const goToCheckPrinting = () => {
// //     navigate("/cheque-printing");
// //   };

// //   // ✅ Function to calculate remaining time in DD:HH:MM format
// //   const getReverseCountdown = (endDate: string) => {
// //     if (!endDate) return "N/A";
// //     const diff = new Date(endDate).getTime() - new Date().getTime();
// //     if (diff <= 0) return "Expired";
// //     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
// //     const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
// //     const mins = Math.floor((diff / (1000 * 60)) % 60);
// //     return `${days}d ${hours}h ${mins}m left`;
// //   };

// //   if (loading)
// //     return (
// //       <div
// //         className="d-flex vh-100 justify-content-center align-items-center"
// //         style={{ background: "rgb(249 241 230)" }}
// //       >
// //         <div className="text-center">
// //           <Spinner
// //             animation="border"
// //             variant="light"
// //             style={{ width: "3rem", height: "3rem" }}
// //           />
// //           <h5 className="text-white mt-3">Loading your dashboard...</h5>
// //         </div>
// //       </div>
// //     );

// //   if (error)
// //     return (
// //       <div
// //         className="d-flex vh-100 justify-content-center align-items-center flex-column"
// //         style={{ background: "rgb(249 241 230)" }}
// //       >
// //         <div className="text-center p-5 rounded-4 bg-white shadow-lg">
// //           <h4 className="text-danger mb-3">Error Loading Dashboard</h4>
// //           <p className="text-muted">{error}</p>
// //           <button className="btn btn-primary px-4 py-2" onClick={fetchDashboardData}>
// //             Retry
// //           </button>
// //         </div>
// //       </div>
// //     );

// //   return (
// //     <>
// //       <Navbar />
// //       <div style={{ marginTop: "90px" }} className="min-vh-100">
// //         <div
// //           className="container py-4"
// //           style={{
// //             background: "rgb(249 241 230)",
// //             borderRadius: "20px",
// //             padding: "30px",
// //           }}
// //         >
// //           {/* Header */}
// //           <div className="d-flex justify-content-between align-items-center mb-4">
// //             <div>
// //               <h3 className="fw-bold text-black-30 mb-1">
// //                 Welcome, {dashboardData?.user?.name || "User"} 👋
// //               </h3>
// //               <p className="text-black-50 mb-0">
// //                 Manage your cheques, plans, and payments
// //               </p>
// //             </div>
// //             <button
// //               className="btn px-4 py-2 shadow-sm"
// //               onClick={goToCheckPrinting}
// //               style={{
// //                 background: "rgb(12 119 111)",
// //                 color: "rgb(249 241 230)",
// //                 border: "none",
// //                 borderRadius: "10px",
// //                 fontWeight: "500",
// //               }}
// //             >
// //               <Printer size={18} className="me-2" />
// //               Check Printing
// //             </button>
// //           </div>

// //           {/* Overview Cards */}
// //           <div className="row g-4 mb-5">
// //             {/* ✅ Current Plan */}
// //             <div className="col-md-4">
// //               <div className="card border-0 shadow-lg h-100" style={{ borderRadius: "20px" }}>
// //                 <div className="card-body p-4">
// //                   <h6 className="text-black-50 mb-2">Current Plan</h6>
// //                   <h3 className="fw-bold mb-2">
// //                     {dashboardData?.user?.plan || "N/A"}
// //                   </h3>
// //                   <CreditCard size={24} className="mt-2 opacity-75" />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* ✅ Days Remaining */}
// //             <div className="col-md-4">
// //               <div className="card border-0 shadow-lg h-100" style={{ borderRadius: "20px" }}>
// //                 <div className="card-body p-4">
// //                   <h6 className="text-black-50 mb-2">Days Remaining</h6>
// //                   <h3 className="fw-bold mb-2">{dashboardData?.countdown ?? "N/A"}</h3>
// //                   <Calendar size={24} className="mt-2 opacity-75" />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* ✅ Cheques Used */}
           
// //           </div>

// //           {/* ✅ NEW SECTION: Plan Dates & Reverse Counter */}
// //           <div className="card border-0 shadow-lg mb-5" style={{ borderRadius: "20px" }}>
// //             <div className="card-body p-4">
// //               <h5 className="fw-bold mb-3" style={{ color: "#0c776f" }}>
// //                 Plan Details
// //               </h5>
// //               <p><strong>Plan Start Date:</strong> {dashboardData?.user?.planStart ? new Date(dashboardData.user.planStart).toLocaleDateString("en-IN") : "N/A"}</p>
// //               <p><strong>Plan Expiry Date:</strong> {dashboardData?.user?.planEnd ? new Date(dashboardData.user.planEnd).toLocaleDateString("en-IN") : "N/A"}</p>
// //               <p className="text-danger">
// //                 <Clock size={18} className="me-1" />
// //                 <strong>Time Left:</strong> {getReverseCountdown(dashboardData?.user?.planEnd)}
// //               </p>
// //             </div>
// //           </div>

// //           {/* Tabs */}
// //           {/* (Your existing tab code remains unchanged ✅) */}
// //         </div>
// //       </div>
// //     </>
// //   );
// // };
// // {/* ✅ Transaction History Section */}
// // <div className="card border-0 shadow-lg mb-5" style={{ borderRadius: "20px" }}>
// //   <div className="card-body p-4">
// //     <h5 className="fw-bold mb-3" style={{ color: "#0c776f" }}>
// //       Transaction History
// //     </h5>
// //     {dashboardData?.transactions?.length > 0 ? (
// //       <div className="table-responsive">
// //         <table className="table table-bordered text-center align-middle">
// //           <thead className="table-light">
// //             <tr>
// //               <th>Date</th>
// //               <th>Plan</th>
// //               <th>Amount (₹)</th>
// //               <th>Status</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {dashboardData.transactions.map((t: any, i: number) => (
// //               <tr key={i}>
// //                 <td>{new Date(t.createdAt).toLocaleDateString("en-IN")}</td>
// //                 <td>{t.planId?.name || "—"}</td>
// //                 <td>{t.amount}</td>
// //                 <td>
// //                   <span
// //                     className={`badge bg-${
// //                       t.status === "success"
// //                         ? "success"
// //                         : t.status === "failed"
// //                         ? "danger"
// //                         : "warning"
// //                     }`}
// //                   >
// //                     {t.status.toUpperCase()}
// //                   </span>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     ) : (
// //       <p className="text-muted">No transactions found.</p>
// //     )}
// //   </div>
// // </div>

// // {/* ✅ Password Update Section */}
// // <div className="card border-0 shadow-lg mb-5" style={{ borderRadius: "20px" }}>
// //   <div className="card-body p-4">
// //     <h5 className="fw-bold mb-3" style={{ color: "#0c776f" }}>
// //       Update Password
// //     </h5>
// //     <form
// //       onSubmit={async (e) => {
// //         e.preventDefault();
// //         const oldPassword = (e.target as any).oldPassword.value;
// //         const newPassword = (e.target as any).newPassword.value;

// //         try {
// //           const token = localStorage.getItem("authToken");
// //           const res = await fetch(`${USER_PROP}${ENDPOINTS.UPDATE_PASSWORD}`, {
// //             method: "PUT",
// //             headers: {
// //               "Content-Type": "application/json",
// //               Authorization: `Bearer ${token}`,
// //             },
// //             body: JSON.stringify({ oldPassword, newPassword }),
// //           });

// //           const data = await res.json();
// //           if (res.ok) alert("✅ " + data.message);
// //           else alert("❌ " + data.message);
// //         } catch (err) {
// //           alert("Server error. Try again later.");
// //         }
// //       }}
// //     >
// //       <div className="mb-3">
// //         <label className="form-label">Old Password</label>
// //         <input
// //           type="password"
// //           name="oldPassword"
// //           className="form-control"
// //           required
// //         />
// //       </div>
// //       <div className="mb-3">
// //         <label className="form-label">New Password</label>
// //         <input
// //           type="password"
// //           name="newPassword"
// //           className="form-control"
// //           required
// //         />
// //       </div>
// //       <button
// //         type="submit"
// //         className="btn px-4"
// //         style={{
// //           background: "#0c776f",
// //           color: "white",
// //           borderRadius: "10px",
// //         }}
// //       >
// //         Update Password
// //       </button>
// //     </form>
// //   </div>
// // </div>

// // export default UserDashboard;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Navbar } from "../components/Navbar";
// import { Printer, CreditCard, Calendar, Clock } from "lucide-react";
// import { USER_PROP, ENDPOINTS } from "../utils/constant";
// import { Spinner } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const UserDashboard: React.FC = () => {
//   const [dashboardData, setDashboardData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("authToken");
//       const res = await fetch(`${USER_PROP}${ENDPOINTS.USER_DASHBOARD}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to fetch dashboard");
//       const data = await res.json();
//       setDashboardData(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const goToCheckPrinting = () => navigate("/cheque-printing");

//   const getReverseCountdown = (endDate: string) => {
//     if (!endDate) return "N/A";
//     const diff = new Date(endDate).getTime() - new Date().getTime();
//     if (diff <= 0) return "Expired";
//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//     const mins = Math.floor((diff / (1000 * 60)) % 60);
//     return `${days}d ${hours}h ${mins}m left`;
//   };

//   if (loading)
//     return (
//       <div
//         className="d-flex vh-100 justify-content-center align-items-center"
//         style={{ background: "rgb(249 241 230)" }}
//       >
//         <div className="text-center">
//           <Spinner animation="border" variant="dark" style={{ width: "3rem", height: "3rem" }} />
//           <h5 className="mt-3">Loading your dashboard...</h5>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div
//         className="d-flex vh-100 justify-content-center align-items-center flex-column"
//         style={{ background: "rgb(249 241 230)" }}
//       >
//         <div className="text-center p-5 rounded-4 bg-white shadow-lg">
//           <h4 className="text-danger mb-3">Error Loading Dashboard</h4>
//           <p className="text-muted">{error}</p>
//           <button className="btn btn-primary px-4 py-2" onClick={fetchDashboardData}>
//             Retry
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <>
//       <Navbar />
//       <div style={{ marginTop: "90px" }} className="min-vh-100">
//         <div
//           className="container py-4"
//           style={{
//             background: "rgb(249 241 230)",
//             borderRadius: "20px",
//             padding: "30px",
//           }}
//         >
//           {/* HEADER */}
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <div>
//               <h3 className="fw-bold text-black mb-1">
//                 Welcome, {dashboardData?.user?.name || "User"} 👋
//               </h3>
//               <p className="text-black-50 mb-0">
//                 Manage your cheques, plans, and payments
//               </p>
//             </div>
//             <button
//               className="btn px-4 py-2 shadow-sm"
//               onClick={goToCheckPrinting}
//               style={{
//                 background: "rgb(12 119 111)",
//                 color: "rgb(249 241 230)",
//                 border: "none",
//                 borderRadius: "10px",
//                 fontWeight: "500",
//               }}
//             >
//               <Printer size={18} className="me-2" />
//               Check Printing
//             </button>
//           </div>

//           {/* OVERVIEW CARDS */}
//           <div className="row g-4 mb-5">
//             {/* Current Plan */}
//             <div className="col-md-4">
//               <div className="card border-0 shadow-lg h-100" style={{ borderRadius: "20px" }}>
//                 <div className="card-body p-4">
//                   <h6 className="text-black-50 mb-2">Current Plan</h6>
//                   <h3 className="fw-bold mb-2">{dashboardData?.user?.plan || "N/A"}</h3>
//                   <CreditCard size={24} className="mt-2 opacity-75" />
//                 </div>
//               </div>
//             </div>

//             {/* Days Remaining */}
//             <div className="col-md-4">
//               <div className="card border-0 shadow-lg h-100" style={{ borderRadius: "20px" }}>
//                 <div className="card-body p-4">
//                   <h6 className="text-black-50 mb-2">Days Remaining</h6>
//                   <h3 className="fw-bold mb-2">{dashboardData?.countdown ?? "N/A"}</h3>
//                   <Calendar size={24} className="mt-2 opacity-75" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* PLAN DETAILS */}
//           <div className="card border-0 shadow-lg mb-5" style={{ borderRadius: "20px" }}>
//             <div className="card-body p-4">
//               <h5 className="fw-bold mb-3" style={{ color: "#0c776f" }}>
//                 Plan Details
//               </h5>
//               <p>
//                 <strong>Plan Start:</strong>{" "}
//                 {dashboardData?.user?.planStart
//                   ? new Date(dashboardData.user.planStart).toLocaleDateString("en-IN")
//                   : "N/A"}
//               </p>
//               <p>
//                 <strong>Plan Expiry:</strong>{" "}
//                 {dashboardData?.user?.planEnd
//                   ? new Date(dashboardData.user.planEnd).toLocaleDateString("en-IN")
//                   : "N/A"}
//               </p>
//               <p className="text-danger">
//                 <Clock size={18} className="me-1" />
//                 <strong>Time Left:</strong>{" "}
//                 {getReverseCountdown(dashboardData?.user?.planEnd)}
//               </p>
//             </div>
//           </div>

//           {/* TRANSACTION HISTORY */}
//           <div className="card border-0 shadow-lg mb-5" style={{ borderRadius: "20px" }}>
//             <div className="card-body p-4">
//               <h5 className="fw-bold mb-3" style={{ color: "#0c776f" }}>
//                 Transaction History
//               </h5>
//               {dashboardData?.payments?.length > 0 ? (
//                 <div className="table-responsive">
//                   <table className="table table-bordered text-center align-middle">
//                     <thead className="table-light">
//                       <tr>
//                         <th>Date</th>
//                         <th>Plan</th>
//                         <th>Amount (₹)</th>
//                         <th>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {dashboardData.payments.map((t: any, i: number) => (
//                         <tr key={i}>
//                           <td>{new Date(t.date).toLocaleDateString("en-IN")}</td>
//                           <td>{t.planName}</td>
//                           <td>{t.amount}</td>
//                           <td>
//                             <span
//                               className={`badge bg-${
//                                 t.status === "success"
//                                   ? "success"
//                                   : t.status === "failed"
//                                   ? "danger"
//                                   : "warning"
//                               }`}
//                             >
//                               {t.status.toUpperCase()}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <p className="text-muted">No transactions found.</p>
//               )}
//             </div>
//           </div>

//           {/* PASSWORD UPDATE SECTION */}
//           <div className="card border-0 shadow-lg mb-5" style={{ borderRadius: "20px" }}>
//             <div className="card-body p-4">
//               <h5 className="fw-bold mb-3" style={{ color: "#0c776f" }}>
//                 Update Password
//               </h5>
//               <form
//                 onSubmit={async (e) => {
//                   e.preventDefault();
//                   const oldPassword = (e.target as any).oldPassword.value;
//                   const newPassword = (e.target as any).newPassword.value;

//                   try {
//                     const token = localStorage.getItem("authToken");
//                     const res = await fetch(`${USER_PROP}${ENDPOINTS.UPDATE_PASSWORD}`, {
//                       method: "PUT",
//                       headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                       },
//                       body: JSON.stringify({ oldPassword, newPassword }),
//                     });
//                     const data = await res.json();
//                     if (res.ok) alert("✅ " + data.message);
//                     else alert("❌ " + data.message);
//                   } catch {
//                     alert("Server error. Try again later.");
//                   }
//                 }}
//               >
//                 <div className="mb-3">
//                   <label className="form-label">Old Password</label>
//                   <input type="password" name="oldPassword" className="form-control" required />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">New Password</label>
//                   <input type="password" name="newPassword" className="form-control" required />
//                 </div>
//                 <button
//                   type="submit"
//                   className="btn px-4"
//                   style={{
//                     background: "#0c776f",
//                     color: "white",
//                     borderRadius: "10px",
//                   }}
//                 >
//                   Update Password
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserDashboard;
// import React, { useState, useEffect, useContext } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { AuthContext } from "../context/AuthContext";
// import { USER_AUTH, ENDPOINTS } from "../utils/constant";

// interface User {
//   _id: string;
//   fullName: string;
//   email: string;
//   phone: string;
//   session: string;
//   plan?: { name: string; price: number; durationDays: number };
// }

// interface Transaction {
//   _id: string;
//   planId?: { name: string };
//   amount: number;
//   gstAmount: number;
//   createdAt: string;
// }

// const UserDashboard: React.FC = () => {
//   const { token } = useContext(AuthContext);
//   const [activeTab, setActiveTab] = useState<string>("profile");
//   const [userDetails, setUserDetails] = useState<User | null>(null);
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   // 🔹 Auth Fetch
//   const authFetch = async (url: string, options: RequestInit = {}) => {
//     return fetch(url, {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//         ...(options.headers || {}),
//       },
//       credentials: "include",
//     });
//   };

//   // 🔹 Fetch user details
//   const fetchUser = async () => {
//     try {
//       const res = await authFetch(`${USER_AUTH}${ENDPOINTS.USER_DETAILS}`);
//       const data = await res.json();
//       if (data.success) setUserDetails(data.user);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   // 🔹 Fetch transactions
//   const fetchTransactions = async () => {
//     try {
//       const res = await authFetch(`${USER_AUTH}${ENDPOINTS.USER_TRANSACTIONS}`);
//       const data = await res.json();
//       if (data.success) setTransactions(data.transactions);
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     Promise.all([fetchUser(), fetchTransactions()]).finally(() =>
//       setLoading(false)
//     );
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css');

//         body {
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           min-height: 100vh;
//         }

//         .dashboard-container {
//           background: #f9f1e6;
//           min-height: 100vh;
//           padding: 2rem 0;
//         }

//         .nav-tabs {
//           border: none;
//           gap: 0.5rem;
//         }

//         .nav-tabs .nav-link {
//           border: none;
//           color: #6c757d;
//           font-weight: 600;
//           padding: 0.75rem 1.5rem;
//           border-radius: 12px;
//           transition: all 0.3s ease;
//           background: transparent;
//         }

//         .nav-tabs .nav-link:hover {
//           background: rgba(12, 119, 111, 0.1);
//           color: #0c776f;
//           transform: translateY(-2px);
//         }

//         .nav-tabs .nav-link.active {
//           background: #0c776f;
//           color: white;
//           box-shadow: 0 5px 15px rgba(12, 119, 111, 0.3);
//         }

//         .card {
//           border: none;
//           border-radius: 20px;
//           box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
//           overflow: hidden;
//           background: white;
//         }

//         .card-header {
//           background: #0c776f;
//           color: white;
//           font-weight: 600;
//         }

//         .btn-primary {
//           background: #0c776f;
//           border: none;
//           border-radius: 10px;
//           padding: 0.5rem 1.25rem;
//         }

//         .btn-primary:hover {
//           background: #095c56;
//           transform: translateY(-2px);
//         }

//         .table thead th {
//           background: #0c776f;
//           color: white;
//           border: none;
//         }

//         .badge {
//           padding: 0.5rem 1rem;
//           border-radius: 10px;
//           font-weight: 600;
//         }
//       `}</style>

//       <div className="dashboard-container">
//         <div className="container-fluid px-4">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <h3 className="fw-bold text-dark">Welcome, {userDetails?.fullName || "User"} 👋</h3>
//             <button
//               className="btn btn-primary"
//               onClick={() => alert("Logout functionality here")}
//             >
//               <i className="bi bi-box-arrow-right me-2"></i> Logout
//             </button>
//           </div>

//           <ul className="nav nav-tabs">
//             {["profile", "myplan", "transactions", "help"].map((tab) => (
//               <li className="nav-item" key={tab}>
//                 <button
//                   className={`nav-link ${activeTab === tab ? "active" : ""}`}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               </li>
//             ))}
//           </ul>

//           <div className="mt-4">
//             {loading ? (
//               <div className="text-center py-5">
//                 <div
//                   className="spinner-border text-success"
//                   style={{ width: "3rem", height: "3rem" }}
//                 ></div>
//               </div>
//             ) : (
//               <>
//                 {activeTab === "profile" && (
//                   <div className="card p-4">
//                     <h5 className="fw-bold mb-3">Profile Details</h5>
//                     {userDetails ? (
//                       <ul className="list-group list-group-flush">
//                         <li className="list-group-item">
//                           <b>Name:</b> {userDetails.fullName}
//                         </li>
//                         <li className="list-group-item">
//                           <b>Email:</b> {userDetails.email}
//                         </li>
//                         <li className="list-group-item">
//                           <b>Phone:</b> {userDetails.phone}
//                         </li>
//                         <li className="list-group-item">
//                           <b>Status:</b>{" "}
//                           <span
//                             className={`badge ${
//                               userDetails.session === "active"
//                                 ? "bg-success"
//                                 : "bg-danger"
//                             }`}
//                           >
//                             {userDetails.session}
//                           </span>
//                         </li>
//                       </ul>
//                     ) : (
//                       <p>No user details found.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "myplan" && (
//                   <div className="card p-4">
//                     <h5 className="fw-bold mb-3">My Plan</h5>
//                     {userDetails?.plan ? (
//                       <div>
//                         <p>
//                           <b>Plan Name:</b> {userDetails.plan.name}
//                         </p>
//                         <p>
//                           <b>Price:</b> ₹{userDetails.plan.price}
//                         </p>
//                         <p>
//                           <b>Duration:</b> {userDetails.plan.durationDays} days
//                         </p>
//                       </div>
//                     ) : (
//                       <p>
//                         You don’t have an active plan.{" "}
//                         <button className="btn btn-primary btn-sm">
//                           Buy Plan
//                         </button>
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "transactions" && (
//                   <div className="card p-4">
//                     <h5 className="fw-bold mb-3">Transaction History</h5>
//                     <div className="table-responsive">
//                       <table className="table table-hover">
//                         <thead>
//                           <tr>
//                             <th>Plan</th>
//                             <th>Amount</th>
//                             <th>GST</th>
//                             <th>Date</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {transactions?.length ? (
//                             transactions.map((t) => (
//                               <tr key={t._id}>
//                                 <td>{t.planId?.name || "-"}</td>
//                                 <td className="fw-bold text-success">
//                                   ₹{t.amount.toLocaleString()}
//                                 </td>
//                                 <td>₹{t.gstAmount.toLocaleString()}</td>
//                                 <td>
//                                   {new Date(t.createdAt).toLocaleDateString()}
//                                 </td>
//                               </tr>
//                             ))
//                           ) : (
//                             <tr>
//                               <td colSpan={4} className="text-center">
//                                 No transactions yet.
//                               </td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === "help" && (
//                   <div className="card p-4 text-center">
//                     <h5 className="fw-bold mb-3">Help & Support</h5>
//                     <p>
//                       For payment or login issues, contact us at{" "}
//                       <b>support@digitalcheque.com</b>
//                     </p>
//                     <button className="btn btn-primary mt-3">
//                       <i className="bi bi-envelope me-2"></i> Contact Support
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserDashboard;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Printer, CreditCard, Calendar, Clock } from "lucide-react";
import { USER_PROP, ENDPOINTS } from "../utils/constant";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const UserDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "settings">("overview");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${USER_PROP}${ENDPOINTS.USER_DASHBOARD}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch dashboard");
      const data = await res.json();
      setDashboardData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goToCheckPrinting = () => navigate("/cheque-printing");

  const getReverseCountdown = (endDate: string) => {
    if (!endDate) return "N/A";
    const diff = new Date(endDate).getTime() - new Date().getTime();
    if (diff <= 0) return "Expired";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    return `${days}d ${hours}h ${mins}m left`;
  };

  if (loading)
    return (
      <div
        className="d-flex vh-100 justify-content-center align-items-center"
        style={{ background: "#f9f1e6" }}
      >
        <div className="text-center">
          <Spinner animation="border" variant="dark" style={{ width: "3rem", height: "3rem" }} />
          <h5 className="mt-3">Loading your dashboard...</h5>
        </div>
      </div>
    );

  if (error)
    return (
      <div
        className="d-flex vh-100 justify-content-center align-items-center flex-column"
        style={{ background: "#f9f1e6" }}
      >
        <div className="text-center p-5 rounded-4 bg-white shadow-lg">
          <h4 className="text-danger mb-3">Error Loading Dashboard</h4>
          <p className="text-muted">{error}</p>
          <button className="btn btn-primary px-4 py-2" onClick={fetchDashboardData}>
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "90px", background: "#f9f1e6", minHeight: "100vh" }}>
        <div className="container py-4">
          {/* ----------- TAB BUTTONS ----------- */}
          <div
            className="d-flex justify-content-start gap-3 px-3 py-2 shadow-sm"
            style={{
              background: "#f9f1e6",
              borderRadius: "20px",
              marginBottom: "30px",
            }}
          >
            {["overview", "transactions", "settings"].map((tab) => (
              <button
                key={tab}
                className={`btn px-4 py-2 fw-semibold ${
                  activeTab === tab ? "text-white" : "text-secondary"
                }`}
                style={{
                  background: activeTab === tab ? "#0c776f" : "transparent",
                  border: "none",
                  borderRadius: "15px",
                  boxShadow: activeTab === tab ? "0px 4px 6px rgba(0,0,0,0.1)" : "none",
                  transition: "0.3s",
                }}
                onClick={() => setActiveTab(tab as any)}
              >
                {tab === "overview"
                  ? "Overview"
                  : tab === "transactions"
                  ? "Transactions"
                  : "Settings"}
              </button>
            ))}
          </div>

          {/* ----------- TAB CONTENT ----------- */}
          {activeTab === "overview" && (
            <>
              {/* HEADER */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="fw-bold text-black mb-1">
                    Welcome, {dashboardData?.user?.name || "User"} 👋
                  </h3>
                  <p className="text-black-50 mb-0">Manage your cheques, plans, and payments</p>
                </div>
                <button
                  className="btn px-4 py-2 shadow-sm"
                  onClick={goToCheckPrinting}
                  style={{
                    background: "#0c776f",
                    color: "#f9f1e6",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: "500",
                  }}
                >
                  <Printer size={18} className="me-2" />
                  Check Printing
                </button>
              </div>

              {/* CARDS */}
              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <div className="card border-0 shadow-lg h-100" style={{ borderRadius: "20px" }}>
                    <div className="card-body p-4">
                      <h6 className="text-black-50 mb-2">Current Plan</h6>
                      <h3 className="fw-bold mb-2">{dashboardData?.user?.plan || "N/A"}</h3>
                      <CreditCard size={24} className="mt-2 opacity-75" />
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card border-0 shadow-lg h-100" style={{ borderRadius: "20px" }}>
                    <div className="card-body p-4">
                      <h6 className="text-black-50 mb-2">Days Remaining</h6>
                      <h3 className="fw-bold mb-2">{dashboardData?.countdown ?? "N/A"}</h3>
                      <Calendar size={24} className="mt-2 opacity-75" />
                    </div>
                  </div>
                </div>
              </div>

              {/* PLAN DETAILS */}
              <div className="card border-0 shadow-lg mb-5" style={{ borderRadius: "20px" }}>
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3" style={{ color: "#0c776f" }}>
                    Plan Details
                  </h5>
                  <p>
                    <strong>Plan Start:</strong>{" "}
                    {dashboardData?.user?.planStart
                      ? new Date(dashboardData.user.planStart).toLocaleDateString("en-IN")
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Plan Expiry:</strong>{" "}
                    {dashboardData?.user?.planEnd
                      ? new Date(dashboardData.user.planEnd).toLocaleDateString("en-IN")
                      : "N/A"}
                  </p>
                  <p className="text-danger">
                    <Clock size={18} className="me-1" />
                    <strong>Time Left:</strong> {getReverseCountdown(dashboardData?.user?.planEnd)}
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === "transactions" && (
            <div
              className="shadow-lg mx-auto"
              style={{
                background: "white",
               
                overflow: "hidden",
                width: "90%",
                maxWidth: "1100px",
              }}
            >
              {/* Header */}
              <div
                style={{
                  background: "",
                  color: "black",
                  textAlign: "center",
                  padding: "15px 0",
                }}
              >
                <h5 className="fw-bold mb-0">Transaction History</h5>
              </div>
          
              {/* Table */}
              <div className="table-responsive">
                {dashboardData?.payments?.length > 0 ? (
                  <table className="table align-middle mb-0">
                    <thead>
                      <tr
                        style={{
                          background: "#0c776f",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        <th>USER</th>
                        <th>PLAN</th>
                        <th>AMOUNT</th>
                        <th>DATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.payments.map((t: any, i: number) => (
                        <tr key={i} style={{ textAlign: "center" }}>
                          <td>{t.userName || "N/A"}</td>
                          <td>{t.planName || "N/A"}</td>
                          <td className="fw-semibold" style={{ color: "#0c776f" }}>
                            ₹{t.amount?.toLocaleString("en-IN")}
                          </td>
                          <td>{new Date(t.date).toLocaleString("en-IN")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-5 text-muted">No transactions found.</div>
                )}
              </div>
            </div>
          )}
           
          {activeTab === "settings" && (
            <div className="d-flex justify-content-center">
              <div
                className="shadow-lg"
                style={{
                  background: "white",
                  width: "420px",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    background: "#0c776f",
                    color: "white",
                    textAlign: "center",
                    padding: "25px 15px",
                  }}
                >
                  <div
                    className="d-flex justify-content-center align-items-center mb-2"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.2)",
                      margin: "0 auto",
                    }}
                  >
                    <i className="bi bi-shield-lock" style={{ fontSize: "28px" }}></i>
                  </div>
                  <h4 className="fw-bold mb-1">Update Password</h4>
                  <p className="mb-0" style={{ fontSize: "14px", opacity: 0.9 }}>
                    Secure your account
                  </p>
                </div>
          
                {/* Form */}
                <div className="p-4">
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const oldPassword = (e.target as any).oldPassword.value;
                      const newPassword = (e.target as any).newPassword.value;
          
                      try {
                        const token = localStorage.getItem("authToken");
                        const res = await fetch(`${USER_PROP}${ENDPOINTS.UPDATE_PASSWORD}`, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({ oldPassword, newPassword }),
                        });
                        const data = await res.json();
                        if (res.ok) alert("✅ " + data.message);
                        else alert("❌ " + data.message);
                      } catch {
                        alert("Server error. Try again later.");
                      }
                    }}
                  >
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Old Password</label>
                      <input
                        type="password"
                        name="oldPassword"
                        className="form-control"
                        placeholder="Enter old password"
                        style={{
                          borderRadius: "10px",
                          border: "1px solid #ccc",
                          padding: "10px 12px",
                        }}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-semibold">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        className="form-control"
                        placeholder="Enter new password"
                        style={{
                          borderRadius: "10px",
                          border: "1px solid #ccc",
                          padding: "10px 12px",
                        }}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn w-100 fw-semibold"
                      style={{
                        background: "#0c776f",
                        color: "white",
                        borderRadius: "10px",
                        padding: "10px 0",
                        fontSize: "16px",
                      }}
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          
                  )}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;


