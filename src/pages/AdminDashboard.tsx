// import React, { useState, useEffect, useContext } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Line, Doughnut } from 'react-chartjs-2';
// import { USER_AUTH, ENDPOINTS, ADMIN } from "../utils/constant";
// import { AuthContext } from "../context/AuthContext";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// // Types
// interface User {
//   _id: string;
//   fullName: string;
//   email: string;
//   phone: string;
//   session: string;
//   plan?: { _id: string; name: string };
// }

// interface Plan {
//   _id: string;
//   name: string;
//   price: number;
//   cheques: number;
//   durationDays: number;
//   gstRate: number;
// }

// interface Transaction {
//   _id: string;
//   userId?: { fullName: string };
//   planId?: { name: string };
//   amount: number;
//   gstAmount: number;
//   createdAt: string;
// }

// interface MonthlyEarning {
//   _id: { year: number; month: number };
//   totalRevenue: number;
//   totalGST: number;
//   totalTransactions: number;
// }

// const AdminDashboard: React.FC = () => {
//   const { token } = useContext(AuthContext);

//   const [activeTab, setActiveTab] = useState<string>('dashboard');
//   const [users, setUsers] = useState<User[]>([]);
//   const [plans, setPlans] = useState<Plan[]>([]);
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [monthlyEarnings, setMonthlyEarnings] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [modalType, setModalType] = useState<'create' | 'edit'>('create');
//   const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     price: '',
//     cheques: '',
//     durationDays: '',
//     gstRate: '18'
//   });

//   // Auth helper
//   const authFetch = async (url: string, options: RequestInit = {}) => {
//     return fetch(url, {
//       ...options,
//       headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(options.headers || {}) },
//       credentials: 'include',
//     });
//   };

//   useEffect(() => {
//     fetchAllData();
//   }, [token]);

//   const fetchAllData = async () => {
//     setLoading(true);
//     try { await Promise.all([fetchUsers(), fetchPlans(), fetchTransactions(), fetchMonthlyEarnings()]); }
//     catch (error) { console.error('Error fetching data:', error); }
//     setLoading(false);
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await authFetch(`${ADMIN}${ENDPOINTS.GET_USER}`);
//       const data = await res.json();
//       if (data.success) setUsers(data.users);
//     } catch (error) { console.error('Error fetching users:', error); }
//   };

//   const fetchPlans = async () => {
//     try {
//       const res = await authFetch(`${ADMIN}${ENDPOINTS.GET_PLAN}`);
//       const data = await res.json();
//       if (data.success) setPlans(data.plans);
//     } catch (error) { console.error('Error fetching plans:', error); }
//   };

//   const fetchTransactions = async () => {
//     try {
//       const res = await authFetch(`${ADMIN}${ENDPOINTS.GST_TRANSACTION}`);
//       const data = await res.json();
//       if (data.success) setTransactions(data.transactions);
//     } catch (error) { console.error('Error fetching transactions:', error); }
//   };

//   const fetchMonthlyEarnings = async () => {
//     try {
//       const res = await authFetch(`${ADMIN}${ENDPOINTS.REVANUE}`);
//       const data = await res.json();
//       if (data.success) {
//         const formatted = data.earnings.map((item: MonthlyEarning) => ({
//           month: `${item._id.month}/${item._id.year}`,
//           revenue: item.totalRevenue,
//           gst: item.totalGST,
//           transactions: item.totalTransactions,
//         }));
//         setMonthlyEarnings(formatted);
//       }
//     } catch (error) { console.error('Error fetching monthly earnings:', error); }
//   };

//   const toggleUserStatus = async (userId: string) => {
//     try {
//       const res = await authFetch(`${ADMIN}${ENDPOINTS.USER_UPDATE.replace(':userId', userId)}`, { method: 'PUT' });
//       const data = await res.json();
//       if (data.success) fetchUsers();
//     } catch (error) { console.error('Error toggling user status:', error); }
//   };

//   const handleCreatePlan = async (planData: any) => {
//     try {
//       const res = await authFetch(`${USER_AUTH}${ENDPOINTS.CREATE_PLAN}`, {
//         method: 'POST',
//         body: JSON.stringify(planData)
//       });
//       const data = await res.json();
//       if (data._id || data.success) { fetchPlans(); setShowModal(false); resetForm(); }
//     } catch (error) { console.error('Error creating plan:', error); }
//   };

//   const handleUpdatePlan = async (planData: any) => {
//     if (!selectedPlan) return;
//     try {
//       const res = await authFetch(`${USER_AUTH}${ENDPOINTS.GET_PLAN_ID.replace(':id', selectedPlan._id)}`, {
//         method: 'PUT',
//         body: JSON.stringify(planData),
//         headers: { 'Content-Type': 'application/json' }
//       });
//       const data = await res.json();
//       if (data.success || data.plan) { fetchPlans(); setShowModal(false); resetForm(); }
//     } catch (error) { console.error('Error updating plan:', error); }
//   };

//   const handleDeletePlan = async (planId: string) => {
//     if (!window.confirm('Are you sure you want to delete this plan?')) return;
//     try {
//       const res = await authFetch(`${USER_AUTH}${ENDPOINTS.DELETE_PLAN.replace(':id', planId)}`, { method: 'DELETE' });
//       const data = await res.json();
//       if (data.success) fetchPlans();
//     } catch (error) { console.error('Error deleting plan:', error); }
//   };

//   const handleUpdateGST = async (planId: string, gstRate: number) => {
//     try {
//       const res = await authFetch(`${ADMIN}${ENDPOINTS.GST_UPDATE.replace(':planId', planId)}`, {
//         method: 'PUT',
//         body: JSON.stringify({ gstRate }),
//         headers: { 'Content-Type': 'application/json' }
//       });
//       const data = await res.json();
//       if (data.success) fetchPlans();
//     } catch (error) { console.error('Error updating GST:', error); }
//   };

//   const openPlanModal = (type: 'create' | 'edit', plan?: Plan) => {
//     setModalType(type);
//     if (type === 'edit' && plan) {
//       setSelectedPlan(plan);
//       setFormData({
//         name: plan.name,
//         price: plan.price.toString(),
//         cheques: plan.cheques.toString(),
//         durationDays: plan.durationDays.toString(),
//         gstRate: (plan.gstRate || 18).toString()
//       });
//     } else resetForm();
//     setShowModal(true);
//   };

//   const resetForm = () => {
//     setFormData({ name: '', price: '', cheques: '', durationDays: '', gstRate: '18' });
//     setSelectedPlan(null);
//   };

//   // Stats
//   const totalRevenue = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
//   const totalGST = transactions.reduce((sum, t) => sum + (t.gstAmount || 0), 0);
//   const activeUsers = users.filter(u => u.session !== 'inactive').length;
//   const filteredUsers = users.filter(user =>
//     (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
//   );
//   const planDistribution = plans.map(plan => ({
//     name: plan.name,
//     value: users.filter(u => u.plan && u.plan._id === plan._id).length
//   }));

//   const revenueChartData = {
//     labels: monthlyEarnings.map(e => e.month),
//     datasets: [
//       { label: 'Revenue', data: monthlyEarnings.map(e => e.revenue), borderColor: '#667eea', backgroundColor: 'rgba(102, 126, 234,0.1)', borderWidth: 3, tension: 0.4, fill: true },
//       { label: 'GST', data: monthlyEarnings.map(e => e.gst), borderColor: '#f5576c', backgroundColor: 'rgba(245,87,108,0.1)', borderWidth: 3, tension: 0.4, fill: true }
//     ]
//   };

//   const planChartData = {
//     labels: planDistribution.map(p => p.name),
//     datasets: [{ data: planDistribution.map(p => p.value), backgroundColor: ['#667eea','#f5576c','#4facfe','#fa709a','#fee140'], borderWidth: 0 }]
//   };

//   return (
//     <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%)' }}>
//       <div className="container-fluid px-4">
//         <ul className="nav nav-tabs bg-white rounded-top">
//           {['dashboard','users','plans','transactions'].map(tab => (
//             <li className="nav-item" key={tab}>
//               <button className={`nav-link ${activeTab===tab?'active':''}`} onClick={()=>setActiveTab(tab)}>
//                 {tab.charAt(0).toUpperCase()+tab.slice(1)}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <main className="container-fluid px-4 pb-4">
//         {loading ? (
//           <div className="text-center py-5">
//             <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
//           </div>
//         ) : (
//           <>
//             {/* --- DASHBOARD TAB --- */}
//             {activeTab==='dashboard' && (
//               <div>
//                 <div className="row g-4 mb-4">
//                   {/* Active Users */}
//                   <div className="col-md-6 col-lg-3">
//                     <div className="card stat-card">
//                       <div className="card-body d-flex justify-content-between align-items-center p-4">
//                         <div>
//                           <p className="text-muted mb-2 small">Active Users</p>
//                           <h2 className="fw-bold mb-0">{activeUsers}</h2>
//                           <small className="text-muted">{users.length} total users</small>
//                         </div>
//                         <div className="stat-icon gradient-purple"><i className="bi bi-people"></i></div>
//                       </div>
//                     </div>
//                   </div>
//                   {/* Total Plans */}
//                   <div className="col-md-6 col-lg-3">
//                     <div className="card stat-card">
//                       <div className="card-body d-flex justify-content-between align-items-center p-4">
//                         <div>
//                           <p className="text-muted mb-2 small">Total Plans</p>
//                           <h2 className="fw-bold mb-0">{plans.length}</h2>
//                           <small className="text-muted">Active subscriptions</small>
//                         </div>
//                         <div className="stat-icon gradient-pink"><i className="bi bi-credit-card"></i></div>
//                       </div>
//                     </div>
//                   </div>
//                   {/* Total Revenue */}
//                   <div className="col-md-6 col-lg-3">
//                     <div className="card stat-card">
//                       <div className="card-body d-flex justify-content-between align-items-center p-4">
//                         <div>
//                           <p className="text-muted mb-2 small">Total Revenue</p>
//                           <h2 className="fw-bold mb-0">₹{totalRevenue.toLocaleString()}</h2>
//                           <small className="text-muted">GST: ₹{totalGST.toLocaleString()}</small>
//                         </div>
//                         <div className="stat-icon gradient-green"><i className="bi bi-currency-rupee"></i></div>
//                       </div>
//                     </div>
//                   </div>
//                   {/* Transactions */}
//                   <div className="col-md-6 col-lg-3">
//                     <div className="card stat-card">
//                       <div className="card-body d-flex justify-content-between align-items-center p-4">
//                         <div>
//                           <p className="text-muted mb-2 small">Transactions</p>
//                           <h2 className="fw-bold mb-0">{transactions.length}</h2>
//                           <small className="text-muted">All payments</small>
//                         </div>
//                         <div className="stat-icon gradient-orange"><i className="bi bi-receipt"></i></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row g-4 mb-4">
//                   <div className="col-md-8">
//                     <div className="card">
//                       <div className="card-header">Revenue & GST Trend</div>
//                       <div className="card-body">
//                         <Line data={revenueChartData} options={{ responsive:true, plugins:{ legend:{ position:'top' } } }} />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="card">
//                       <div className="card-header">Plan Distribution</div>
//                       <div className="card-body">
//                         <Doughnut data={planChartData} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* --- USERS TAB --- */}
//             {activeTab==='users' && (
//               <div className="card p-3">
//                 <div className="mb-3">
//                   <input type="text" className="form-control" placeholder="Search user by name/email" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
//                 </div>
//                 <table className="table table-hover">
//                   <thead>
//                     <tr>
//                       <th>Name</th><th>Email</th><th>Phone</th><th>Plan</th><th>Status</th><th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredUsers.map(user => (
//                       <tr key={user._id}>
//                         <td>{user.fullName}</td>
//                         <td>{user.email}</td>
//                         <td>{user.phone}</td>
//                         <td>{user.plan?.name || '-'}</td>
//                         <td>{user.session}</td>
//                         <td>
//                           <button className="btn btn-sm btn-outline-primary" onClick={()=>toggleUserStatus(user._id)}>Toggle Status</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {/* --- PLANS TAB --- */}
//             {activeTab==='plans' && (
//               <div>
//                 <div className="mb-3 d-flex justify-content-between">
//                   <h5>Plans</h5>
//                   <button className="btn btn-primary" onClick={()=>openPlanModal('create')}>Create Plan</button>
//                 </div>
//                 <table className="table table-hover">
//                   <thead>
//                     <tr>
//                       <th>Name</th><th>Price</th><th>Cheques</th><th>Duration</th><th>GST</th><th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {plans.map(plan => (
//                       <tr key={plan._id}>
//                         <td>{plan.name}</td>
//                         <td>₹{plan.price}</td>
//                         <td>{plan.cheques}</td>
//                         <td>{plan.durationDays} days</td>
//                         <td>
//                           <input type="number" className="form-control form-control-sm" defaultValue={plan.gstRate || 18} onBlur={e=>handleUpdateGST(plan._id, Number(e.target.value))} />
//                         </td>
//                         <td>
//                           <button className="btn btn-sm btn-info me-1" onClick={()=>openPlanModal('edit', plan)}>Edit</button>
//                           <button className="btn btn-sm btn-danger" onClick={()=>handleDeletePlan(plan._id)}>Delete</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {/* --- TRANSACTIONS TAB --- */}
//             {activeTab==='transactions' && (
//               <div className="card p-3">
//                 <table className="table table-hover">
//                   <thead>
//                     <tr>
//                       <th>User</th><th>Plan</th><th>Amount</th><th>GST</th><th>Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {transactions.map(t => (
//                       <tr key={t._id}>
//                         <td>{t.userId?.fullName}</td>
//                         <td>{t.planId?.name}</td>
//                         <td>₹{t.amount}</td>
//                         <td>₹{t.gstAmount}</td>
//                         <td>{new Date(t.createdAt).toLocaleString()}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </>
//         )}
//       </main>

//       {/* --- PLAN MODAL --- */}
//       {showModal && (
//         <div className="modal show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">{modalType==='edit'?'Edit Plan':'Create Plan'}</h5>
//                 <button type="button" className="btn-close" onClick={()=>setShowModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-2">
//                   <label>Name</label>
//                   <input type="text" className="form-control" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
//                 </div>
//                 <div className="mb-2">
//                   <label>Price</label>
//                   <input type="number" className="form-control" value={formData.price} onChange={e=>setFormData({...formData,price:e.target.value})} />
//                 </div>
//                 <div className="mb-2">
//                   <label>Cheques</label>
//                   <input type="number" className="form-control" value={formData.cheques} onChange={e=>setFormData({...formData,cheques:e.target.value})} />
//                 </div>
//                 <div className="mb-2">
//                   <label>Duration (days)</label>
//                   <input type="number" className="form-control" value={formData.durationDays} onChange={e=>setFormData({...formData,durationDays:e.target.value})} />
//                 </div>
//                 <div className="mb-2">
//                   <label>GST Rate</label>
//                   <input type="number" className="form-control" value={formData.gstRate} onChange={e=>setFormData({...formData,gstRate:e.target.value})} />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button className="btn btn-secondary" onClick={()=>setShowModal(false)}>Cancel</button>
//                 <button className="btn btn-primary" onClick={()=>{
//                   const planData = {
//                     name: formData.name,
//                     price: Number(formData.price),
//                     cheques: Number(formData.cheques),
//                     durationDays: Number(formData.durationDays),
//                     gstRate: Number(formData.gstRate)
//                   };
//                   modalType==='edit'?handleUpdatePlan(planData):handleCreatePlan(planData);
//                 }}>
//                   {modalType==='edit'?'Update Plan':'Create Plan'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Line, Doughnut } from 'react-chartjs-2';
import { USER_AUTH, ENDPOINTS, ADMIN } from "../utils/constant";
import { AuthContext } from "../context/AuthContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Types
interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  session: string;
  plan?: { _id: string; name: string };
}

interface Plan {
  _id: string;
  name: string;
  price: number;
  cheques: number;
  durationDays: number;
  gstRate: number;
}

interface Transaction {
  _id: string;
  userId?: { fullName: string };
  planId?: { name: string };
  amount: number;
  gstAmount: number;
  createdAt: string;
}

interface MonthlyEarning {
  _id: { year: number; month: number };
  totalRevenue: number;
  totalGST: number;
  totalTransactions: number;
}

const AdminDashboard: React.FC = () => {
  const { token } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [users, setUsers] = useState<User[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyEarnings, setMonthlyEarnings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    cheques: '',
    durationDays: '',
    gstRate: '18'
  });

  // Auth helper
  const authFetch = async (url: string, options: RequestInit = {}) => {
    return fetch(url, {
      ...options,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(options.headers || {}) },
      credentials: 'include',
    });
  };

  useEffect(() => {
    fetchAllData();
  }, [token]);

  const fetchAllData = async () => {
    setLoading(true);
    try { await Promise.all([fetchUsers(), fetchPlans(), fetchTransactions(), fetchMonthlyEarnings()]); }
    catch (error) { console.error('Error fetching data:', error); }
    setLoading(false);
  };

  const fetchUsers = async () => {
    try {
      const res = await authFetch(`${ADMIN}${ENDPOINTS.GET_USER}`);
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (error) { console.error('Error fetching users:', error); }
  };

  const fetchPlans = async () => {
    try {
      const res = await authFetch(`${ADMIN}${ENDPOINTS.GET_PLAN}`);
      const data = await res.json();
      if (data.success) setPlans(data.plans);
    } catch (error) { console.error('Error fetching plans:', error); }
  };

  const fetchTransactions = async () => {
    try {
      const res = await authFetch(`${ADMIN}${ENDPOINTS.GST_TRANSACTION}`);
      const data = await res.json();
      if (data.success) setTransactions(data.transactions);
    } catch (error) { console.error('Error fetching transactions:', error); }
  };

  const fetchMonthlyEarnings = async () => {
    try {
      const res = await authFetch(`${ADMIN}${ENDPOINTS.REVANUE}`);
      const data = await res.json();
      if (data.success) {
        const formatted = data.earnings.map((item: MonthlyEarning) => ({
          month: `${item._id.month}/${item._id.year}`,
          revenue: item.totalRevenue,
          gst: item.totalGST,
          transactions: item.totalTransactions,
        }));
        setMonthlyEarnings(formatted);
      }
    } catch (error) { console.error('Error fetching monthly earnings:', error); }
  };

  const toggleUserStatus = async (userId: string) => {
    try {
      const res = await authFetch(`${ADMIN}${ENDPOINTS.USER_UPDATE.replace(':userId', userId)}`, { method: 'PUT' });
      const data = await res.json();
      if (data.success) fetchUsers();
    } catch (error) { console.error('Error toggling user status:', error); }
  };

  const handleCreatePlan = async (planData: any) => {
    try {
      const res = await authFetch(`${USER_AUTH}${ENDPOINTS.CREATE_PLAN}`, {
        method: 'POST',
        body: JSON.stringify(planData)
      });
      const data = await res.json();
      if (data._id || data.success) { fetchPlans(); setShowModal(false); resetForm(); }
    } catch (error) { console.error('Error creating plan:', error); }
  };

  const handleUpdatePlan = async (planData: any) => {
    if (!selectedPlan) return;
    try {
      const res = await authFetch(`${USER_AUTH}${ENDPOINTS.GET_PLAN_ID.replace(':id', selectedPlan._id)}`, {
        method: 'PUT',
        body: JSON.stringify(planData),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success || data.plan) { fetchPlans(); setShowModal(false); resetForm(); }
    } catch (error) { console.error('Error updating plan:', error); }
  };

  const handleDeletePlan = async (planId: string) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;
    try {
      const res = await authFetch(`${USER_AUTH}${ENDPOINTS.DELETE_PLAN.replace(':id', planId)}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchPlans();
    } catch (error) { console.error('Error deleting plan:', error); }
  };

  const handleUpdateGST = async (planId: string, gstRate: number) => {
    try {
      const res = await authFetch(`${ADMIN}${ENDPOINTS.GST_UPDATE.replace(':planId', planId)}`, {
        method: 'PUT',
        body: JSON.stringify({ gstRate }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) fetchPlans();
    } catch (error) { console.error('Error updating GST:', error); }
  };

  const openPlanModal = (type: 'create' | 'edit', plan?: Plan) => {
    setModalType(type);
    if (type === 'edit' && plan) {
      setSelectedPlan(plan);
      setFormData({
        name: plan.name,
        price: plan.price.toString(),
        cheques: plan.cheques.toString(),
        durationDays: plan.durationDays.toString(),
        gstRate: (plan.gstRate || 18).toString()
      });
    } else resetForm();
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', cheques: '', durationDays: '', gstRate: '18' });
    setSelectedPlan(null);
  };

  // Stats
  const totalRevenue = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalGST = transactions.reduce((sum, t) => sum + (t.gstAmount || 0), 0);
  const activeUsers = users.filter(u => u.session !== 'inactive').length;
  const filteredUsers = users.filter(user =>
    (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const planDistribution = plans.map(plan => ({
    name: plan.name,
    value: users.filter(u => u.plan && u.plan._id === plan._id).length
  }));

  const revenueChartData = {
    labels: monthlyEarnings.map(e => e.month),
    datasets: [
      { label: 'Revenue', data: monthlyEarnings.map(e => e.revenue), borderColor: '#667eea', backgroundColor: 'rgba(102, 126, 234,0.1)', borderWidth: 3, tension: 0.4, fill: true },
      { label: 'GST', data: monthlyEarnings.map(e => e.gst), borderColor: '#f5576c', backgroundColor: 'rgba(245,87,108,0.1)', borderWidth: 3, tension: 0.4, fill: true }
    ]
  };

  const planChartData = {
    labels: planDistribution.map(p => p.name),
    datasets: [{ data: planDistribution.map(p => p.value), backgroundColor: ['#667eea','#f5576c','#4facfe','#fa709a','#fee140'], borderWidth: 0 }]
  };

  return (
    <>
      <style>{`
        @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }

        .dashboard-container {
          min-height: 100vh;
          background: #f9f1e6;
          padding: 2rem 0;
        }

        .dashboard-header {
          background: #f9f1e6;
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .nav-tabs {
          border: none;
          gap: 0.5rem;
        }

        .nav-tabs .nav-link {
          border: none;
          color: #6c757d;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: transparent;
        }

        .nav-tabs .nav-link:hover {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          transform: translateY(-2px);
        }

        .nav-tabs .nav-link.active {
          background: #0c776f;
          color: white;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .stat-card {
          border: none;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
          background: white;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          position: relative;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: #0c776f;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        

        .gradient-purple { background: #0c776f }
        .gradient-pink { background: #0c776f }
        .gradient-green { background: #0c776f }
        .gradient-orange { background: #0c776f; }

        .card {
          border: none;
          border-radius: 20px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          background: white;
        }

        .card-header {
          background: #0c776f;
          color: white;
          font-weight: 600;
          padding: 1rem 1.5rem;
          border: none;
        }

        .table {
          margin-bottom: 0;
        }

        .table thead th {
          background: #0c776f;
          color: white;
          border: none;
          font-weight: 600;
          padding: 1rem;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }

        .table tbody tr {
          transition: all 0.2s ease;
          border-bottom: 1px solid #f0f0f0;
        }

        .table tbody tr:hover {
          background: #0c776f;
          transform: scale(1.01);
        }

        .table tbody td {
          padding: 1rem;
          vertical-align: middle;
        }

        .btn {
          border-radius: 10px;
          padding: 0.5rem 1.25rem;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
        }

        .btn-primary {
          background: #0c776f;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-outline-primary {
          border: 2px solid #667eea;
          color: #667eea;
          background: transparent;
        }

        .btn-outline-primary:hover {
          background: #0c776f;
          color: white;
          transform: translateY(-2px);
        }

        .btn-info {
          background:#0c776f;
          color: white;
        }

        .btn-danger {
          background: #0c776f;
          color: white;
        }

        .form-control {
          border-radius: 10px;
          border: 2px solid #e0e0e0;
          padding: 0.75rem;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }

        .modal-content {
          border-radius: 20px;
          border: none;
          overflow: hidden;
        }

        .modal-header {
          background: #0c776f;
          color: white;
          border: none;
          padding: 1.5rem;
        }

        .modal-title {
          font-weight: 700;
        }

        .modal-body {
          padding: 2rem;
        }

        .modal-footer {
          border: none;
          padding: 1.5rem;
          background: #f8f9fa;
        }

        .btn-close {
          filter: brightness(0) invert(1);
        }

        .spinner-border {
          width: 3rem;
          height: 3rem;
          border-width: 0.3rem;
        }

        label {
          font-weight: 600;
          color: #495057;
          margin-bottom: 0.5rem;
        }

        .form-control-sm {
          border-radius: 8px;
          border: 2px solid #e0e0e0;
        }

        .badge {
          padding: 0.5rem 1rem;
          border-radius: 10px;
          font-weight: 600;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-card, .card {
          animation: fadeIn 0.5s ease-out;
        }

        .search-wrapper {
          position: relative;
        }

        .search-wrapper input {
          padding-left: 3rem;
        }

        .search-wrapper::before {
          content: '🔍';
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2rem;
        }
      `}</style>

      <div className="dashboard-container">
        <div className="container-fluid px-4">
          <div className="dashboard-header">
            <ul className="nav nav-tabs">
              {['dashboard','users','plans','transactions'].map(tab => (
                <li className="nav-item" key={tab}>
                  <button className={`nav-link ${activeTab===tab?'active':''}`} onClick={()=>setActiveTab(tab)}>
                    {tab.charAt(0).toUpperCase()+tab.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <main className="container-fluid px-4 pb-4">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div>
            </div>
          ) : (
            <>
              {/* --- DASHBOARD TAB --- */}
              {activeTab==='dashboard' && (
                <div>
                  <div className="row g-4 mb-4">
                    <div className="col-md-6 col-lg-3">
                      <div className="card stat-card">
                        <div className="card-body d-flex justify-content-center align-items-center p-4">
                          <div>
                            <p className="text-muted mb-2 small">Active Users</p>
                            <h2 className="fw-bold mb-0">{activeUsers}</h2>
                            <small className="text-muted">{users.length} total users</small>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <div className="card stat-card">
                        <div className="card-body d-flex justify-content-center align-items-center p-4">
                          <div>
                            <p className="text-muted mb-2 small">Total Plans</p>
                            <h2 className="fw-bold mb-0">{plans.length}</h2>
                            <small className="text-muted">Active subscriptions</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <div className="card stat-card">
                        <div className="card-body d-flex justify-content-center align-items-center p-4">
                          <div>
                            <p className="text-muted mb-2 small">Total Revenue</p>
                            <h2 className="fw-bold mb-0">₹{totalRevenue.toLocaleString()}</h2>
                            <small className="text-muted">GST: ₹{totalGST.toLocaleString()}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <div className="card stat-card">
                        <div className="card-body d-flex justify-content-center align-items-center p-4">
                          <div>
                            <p className="text-muted mb-2 small">Transactions</p>
                            <h2 className="fw-bold mb-0">{transactions.length}</h2>
                            <small className="text-muted">All payments</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row g-4 mb-4">
                    <div className="col-md-8">
                      <div className="card">
                        <div className="card-header">Revenue & GST Trend</div>
                        <div className="card-body p-4">
                          <Line data={revenueChartData} options={{ responsive:true, plugins:{ legend:{ position:'top' } } }} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card">
                        <div className="card-header">Plan Distribution</div>
                        <div className="card-body p-4">
                          <Doughnut data={planChartData} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- USERS TAB --- */}
              {activeTab==='users' && (
                <div className="card p-4">
                  <div className="mb-4 search-wrapper">
                    <input type="text" className="form-control" placeholder="Search user by name or email..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th><th>Email</th><th>Phone</th><th>Plan</th><th>Status</th><th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map(user => (
                          <tr key={user._id}>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.plan?.name || '-'}</td>
                            <td><span className={`badge ${user.session === 'inactive' ? 'bg-danger' : 'bg-success'}`}>{user.session}</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary" onClick={()=>toggleUserStatus(user._id)}>Toggle Status</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* --- PLANS TAB --- */}
              {activeTab==='plans' && (
                <div className="card p-4">
                  <div className="mb-4 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">Subscription Plans</h5>
                    <button className="btn btn-primary" onClick={()=>openPlanModal('create')}>
                      <i className="bi bi-plus-circle me-2"></i>Create Plan
                    </button>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th><th>Price</th><th>Cheques</th><th>Duration</th><th>GST Rate</th><th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plans.map(plan => (
                          <tr key={plan._id}>
                            <td className="fw-bold">{plan.name}</td>
                            <td>₹{plan.price.toLocaleString()}</td>
                            <td>{plan.cheques}</td>
                            <td>{plan.durationDays} days</td>
                            <td>
                              <input type="number" className="form-control form-control-sm" style={{width: '80px'}} defaultValue={plan.gstRate || 18} onBlur={e=>handleUpdateGST(plan._id, Number(e.target.value))} />
                            </td>
                            <td>
                              <button className="btn btn-sm btn-info me-2" onClick={()=>openPlanModal('edit', plan)}>
                                <i className="bi bi-pencil"></i> Edit
                              </button>
                              <button className="btn btn-sm btn-danger" onClick={()=>handleDeletePlan(plan._id)}>
                                <i className="bi bi-trash"></i> Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* --- TRANSACTIONS TAB --- */}
              {activeTab==='transactions' && (
  <div className="card p-4">
    <h5 className="mb-4 fw-bold">Transaction History</h5>
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>User</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>GST</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.length ? (
            transactions.map(t => (
              <tr key={t._id}>
                <td>{t.userId?.fullName || 'N/A'}</td>
                <td>{t.planId?.name || '-'}</td>
                <td className="fw-bold text-success">
                  ₹{t.amount != null ? t.amount.toLocaleString() : '0'}
                </td>
                <td>
                  ₹{t.gstAmount != null ? t.gstAmount.toLocaleString() : '0'}
                </td>
                <td>
                  {t.createdAt ? new Date(t.createdAt).toLocaleString() : '-'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

            </>
          )}
        </main>

        {/* --- PLAN MODAL --- */}
        {showModal && (
          <div className="modal show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.6)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{modalType==='edit'?'Edit Plan':'Create New Plan'}</h5>
                  <button type="button" className="btn-close" onClick={()=>setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label>Plan Name</label>
                    <input type="text" className="form-control" placeholder="Enter plan name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label>Price (₹)</label>
                    <input type="number" className="form-control" placeholder="Enter price" value={formData.price} onChange={e=>setFormData({...formData,price:e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label>Number of Cheques</label>
                    <input type="number" className="form-control" placeholder="Enter number of cheques" value={formData.cheques} onChange={e=>setFormData({...formData,cheques:e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label>Duration (days)</label>
                    <input type="number" className="form-control" placeholder="Enter duration in days" value={formData.durationDays} onChange={e=>setFormData({...formData,durationDays:e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label>GST Rate (%)</label>
                    <input type="number" className="form-control" placeholder="Enter GST rate" value={formData.gstRate} onChange={e=>setFormData({...formData,gstRate:e.target.value})} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={()=>setShowModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={()=>{
                    const planData = {
                      name: formData.name,
                      price: Number(formData.price),
                      cheques: Number(formData.cheques),
                      durationDays: Number(formData.durationDays),
                      gstRate: Number(formData.gstRate)
                    };
                    modalType==='edit'?handleUpdatePlan(planData):handleCreatePlan(planData);
                  }}>
                    {modalType==='edit'?'Update Plan':'Create Plan'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;