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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%)' }}>
      <div className="container-fluid px-4">
        <ul className="nav nav-tabs bg-white rounded-top">
          {['dashboard','users','plans','transactions'].map(tab => (
            <li className="nav-item" key={tab}>
              <button className={`nav-link ${activeTab===tab?'active':''}`} onClick={()=>setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase()+tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <main className="container-fluid px-4 pb-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
          </div>
        ) : (
          <>
            {/* --- DASHBOARD TAB --- */}
            {activeTab==='dashboard' && (
              <div>
                <div className="row g-4 mb-4">
                  {/* Active Users */}
                  <div className="col-md-6 col-lg-3">
                    <div className="card stat-card">
                      <div className="card-body d-flex justify-content-between align-items-center p-4">
                        <div>
                          <p className="text-muted mb-2 small">Active Users</p>
                          <h2 className="fw-bold mb-0">{activeUsers}</h2>
                          <small className="text-muted">{users.length} total users</small>
                        </div>
                        <div className="stat-icon gradient-purple"><i className="bi bi-people"></i></div>
                      </div>
                    </div>
                  </div>
                  {/* Total Plans */}
                  <div className="col-md-6 col-lg-3">
                    <div className="card stat-card">
                      <div className="card-body d-flex justify-content-between align-items-center p-4">
                        <div>
                          <p className="text-muted mb-2 small">Total Plans</p>
                          <h2 className="fw-bold mb-0">{plans.length}</h2>
                          <small className="text-muted">Active subscriptions</small>
                        </div>
                        <div className="stat-icon gradient-pink"><i className="bi bi-credit-card"></i></div>
                      </div>
                    </div>
                  </div>
                  {/* Total Revenue */}
                  <div className="col-md-6 col-lg-3">
                    <div className="card stat-card">
                      <div className="card-body d-flex justify-content-between align-items-center p-4">
                        <div>
                          <p className="text-muted mb-2 small">Total Revenue</p>
                          <h2 className="fw-bold mb-0">₹{totalRevenue.toLocaleString()}</h2>
                          <small className="text-muted">GST: ₹{totalGST.toLocaleString()}</small>
                        </div>
                        <div className="stat-icon gradient-green"><i className="bi bi-currency-rupee"></i></div>
                      </div>
                    </div>
                  </div>
                  {/* Transactions */}
                  <div className="col-md-6 col-lg-3">
                    <div className="card stat-card">
                      <div className="card-body d-flex justify-content-between align-items-center p-4">
                        <div>
                          <p className="text-muted mb-2 small">Transactions</p>
                          <h2 className="fw-bold mb-0">{transactions.length}</h2>
                          <small className="text-muted">All payments</small>
                        </div>
                        <div className="stat-icon gradient-orange"><i className="bi bi-receipt"></i></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-header">Revenue & GST Trend</div>
                      <div className="card-body">
                        <Line data={revenueChartData} options={{ responsive:true, plugins:{ legend:{ position:'top' } } }} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-header">Plan Distribution</div>
                      <div className="card-body">
                        <Doughnut data={planChartData} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- USERS TAB --- */}
            {activeTab==='users' && (
              <div className="card p-3">
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Search user by name/email" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
                </div>
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
                        <td>{user.session}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary" onClick={()=>toggleUserStatus(user._id)}>Toggle Status</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* --- PLANS TAB --- */}
            {activeTab==='plans' && (
              <div>
                <div className="mb-3 d-flex justify-content-between">
                  <h5>Plans</h5>
                  <button className="btn btn-primary" onClick={()=>openPlanModal('create')}>Create Plan</button>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th><th>Price</th><th>Cheques</th><th>Duration</th><th>GST</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map(plan => (
                      <tr key={plan._id}>
                        <td>{plan.name}</td>
                        <td>₹{plan.price}</td>
                        <td>{plan.cheques}</td>
                        <td>{plan.durationDays} days</td>
                        <td>
                          <input type="number" className="form-control form-control-sm" defaultValue={plan.gstRate || 18} onBlur={e=>handleUpdateGST(plan._id, Number(e.target.value))} />
                        </td>
                        <td>
                          <button className="btn btn-sm btn-info me-1" onClick={()=>openPlanModal('edit', plan)}>Edit</button>
                          <button className="btn btn-sm btn-danger" onClick={()=>handleDeletePlan(plan._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* --- TRANSACTIONS TAB --- */}
            {activeTab==='transactions' && (
              <div className="card p-3">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>User</th><th>Plan</th><th>Amount</th><th>GST</th><th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(t => (
                      <tr key={t._id}>
                        <td>{t.userId?.fullName}</td>
                        <td>{t.planId?.name}</td>
                        <td>₹{t.amount}</td>
                        <td>₹{t.gstAmount}</td>
                        <td>{new Date(t.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>

      {/* --- PLAN MODAL --- */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalType==='edit'?'Edit Plan':'Create Plan'}</h5>
                <button type="button" className="btn-close" onClick={()=>setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-2">
                  <label>Name</label>
                  <input type="text" className="form-control" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
                </div>
                <div className="mb-2">
                  <label>Price</label>
                  <input type="number" className="form-control" value={formData.price} onChange={e=>setFormData({...formData,price:e.target.value})} />
                </div>
                <div className="mb-2">
                  <label>Cheques</label>
                  <input type="number" className="form-control" value={formData.cheques} onChange={e=>setFormData({...formData,cheques:e.target.value})} />
                </div>
                <div className="mb-2">
                  <label>Duration (days)</label>
                  <input type="number" className="form-control" value={formData.durationDays} onChange={e=>setFormData({...formData,durationDays:e.target.value})} />
                </div>
                <div className="mb-2">
                  <label>GST Rate</label>
                  <input type="number" className="form-control" value={formData.gstRate} onChange={e=>setFormData({...formData,gstRate:e.target.value})} />
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
  );
};

export default AdminDashboard;
