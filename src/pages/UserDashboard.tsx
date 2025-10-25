// import React, { useEffect, useState, useMemo } from "react";
// import { User, CreditCard, TrendingUp, Calendar, Clock, Activity, Zap, Star, Award, BarChart3, Sparkles, Target, Gauge, Crown, AlertTriangle, CheckCircle } from "lucide-react";

// import {USER_AUTH,ENDPOINTS, USER_PROP } from "../utils/constant";
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   plan: string;
//   totalCheques: number;
//   usedCheques: number;
//   status: string;
//   joinDate: string;
// }

// interface UsageStats {
//   lastDay: number;
//   last3Days: number;
//   last30Days: number;
//   efficiency: number;
//   trend: string;
//   averageDaily: number;
//   peakHour: number;
//   totalThisMonth: number;
// }

// interface DashboardData {
//   user: User;
//   usage: UsageStats;
//   config: {
//     theme: string;
//     showAnimations: boolean;
//     refreshInterval: number;
//     timeFormat: string;
//     locale: string;
//     currency: string;
//   };
// }

// const PLAN_CONFIGS = {
//   basic: { icon: Target, gradient: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)', features: ['Basic Support', '100 Cheques/month'] },
//   pro: { icon: Award, gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', features: ['Priority Support', '500 Cheques/month'] },
//   premium: { icon: Star, gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', features: ['24/7 Support', 'Unlimited Cheques'] },
//   enterprise: { icon: Crown, gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', features: ['Dedicated Manager', 'Custom Limits'] }
// };

// const STATUS_CONFIGS = {
//   active: { color: '#22c55e', label: 'Online', icon: '●' },
//   inactive: { color: '#6b7280', label: 'Away', icon: '○' },
//   suspended: { color: '#ef4444', label: 'Suspended', icon: '⚠' }
// };

// const THEMES = {
//   default: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', cardBg: 'rgba(255,255,255,0.1)', text: '#ffffff', textSecondary: '#e5e7eb' },
//   dark: { bg: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)', cardBg: 'rgba(31,41,55,0.8)', text: '#f9fafb', textSecondary: '#9ca3af' },
//   light: { bg: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)', cardBg: 'rgba(255,255,255,0.9)', text: '#1f2937', textSecondary: '#6b7280' }
// };

// // Dynamic data generators
// const generateRandomUser = (): User => {
//   const names = ['Alex Johnson', 'Sarah Chen', 'Mike Davis', 'Emma Wilson', 'James Brown'];
//   const plans = ['basic', 'pro', 'premium', 'enterprise'];
//   const statuses = ['active', 'inactive'];
//   const totalCheques = [100, 500, 1000, 2000][Math.floor(Math.random() * 4)];
  
//   return {
//     id: Math.random().toString(36).substr(2, 9),
//     name: names[Math.floor(Math.random() * names.length)],
//     email: `user${Math.floor(Math.random() * 999)}@company.com`,
//     plan: plans[Math.floor(Math.random() * plans.length)],
//     totalCheques,
//     usedCheques: Math.floor(Math.random() * totalCheques * 0.8),
//     status: statuses[Math.floor(Math.random() * statuses.length)],
//     joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
//   };
// };

// const generateRandomUsage = (): UsageStats => {
//   const lastDay = Math.floor(Math.random() * 50) + 1;
//   const last3Days = lastDay + Math.floor(Math.random() * 100);
//   const last30Days = last3Days + Math.floor(Math.random() * 500);
  
//   return {
//     lastDay,
//     last3Days,
//     last30Days,
//     efficiency: Math.floor(Math.random() * 40) + 60,
//     trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)],
//     averageDaily: Math.floor(last30Days / 30),
//     peakHour: Math.floor(Math.random() * 24),
//     totalThisMonth: Math.floor(Math.random() * 300) + 50
//   };
// };

// const generateDynamicConfig = () => ({
//   theme: ['default', 'dark', 'light'][Math.floor(Math.random() * 3)],
//   showAnimations: Math.random() > 0.3,
//   refreshInterval: [30000, 60000, 120000][Math.floor(Math.random() * 3)],
//   timeFormat: Math.random() > 0.5 ? '12h' : '24h',
//   locale: ['en-US', 'en-GB', 'de-DE', 'fr-FR'][Math.floor(Math.random() * 4)],
//   currency: ['USD', 'EUR', 'GBP', 'INR'][Math.floor(Math.random() * 4)]
// });

// export default function UserDashboard() {
//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [animateCounters, setAnimateCounters] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [retryCount, setRetryCount] = useState(0);
//   const [autoRefresh, setAutoRefresh] = useState(true);

//  // Real API call
// const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
  
//       const res = await fetch(`${USER_PROP}${ENDPOINTS.USER_DASHBOARD}`); // ✅ your backend endpoint
//       if (!res.ok) {
//         throw new Error("Failed to fetch dashboard data");
//       }
  
//       const data: DashboardData = await res.json();
//       setDashboardData(data);
//       setRetryCount(0);
//       setTimeout(() => setAnimateCounters(true), 300);
  
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to load dashboard");
//       if (retryCount < 3) {
//         setRetryCount(prev => prev + 1);
//         setTimeout(() => fetchDashboardData(), 2000 * (retryCount + 1));
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
  

//  // Auto-refresh
// useEffect(() => {
//     if (!autoRefresh || !dashboardData) return;
  
//     const interval = setInterval(() => {
//       fetchDashboardData(); 
//     }, dashboardData.config.refreshInterval);
  
//     return () => clearInterval(interval);
//   }, [dashboardData?.config.refreshInterval, autoRefresh]);
  
//   // Dynamic time updates
//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Dynamic metrics calculation
//   const metrics = useMemo(() => {
//     if (!dashboardData) return null;
    
//     const { user, usage } = dashboardData;
//     const remainingCheques = user.totalCheques - user.usedCheques;
//     const usagePercentage = (user.usedCheques / user.totalCheques) * 100;
//     const healthScore = Math.max(0, Math.min(100, 100 - usagePercentage + (usage.efficiency * 0.5)));
//     const burnRate = usage.averageDaily;
//     const daysRemaining = remainingCheques / Math.max(burnRate, 1);
    
//     return {
//       remainingCheques,
//       usagePercentage,
//       healthScore: Math.round(healthScore),
//       burnRate,
//       daysRemaining: Math.ceil(daysRemaining),
//       isLowStock: remainingCheques < user.totalCheques * 0.2,
//       isCritical: remainingCheques < user.totalCheques * 0.1,
//       trendDirection: usage.trend,
//       efficiencyRating: usage.efficiency > 80 ? 'excellent' : usage.efficiency > 60 ? 'good' : 'poor'
//     };
//   }, [dashboardData]);

//   // Dynamic greeting and time formatting
//   const getTimeBasedGreeting = () => {
//     const hour = currentTime.getHours();
//     const greetings = [
//       { range: [5, 12], emoji: '🌅', text: 'Good morning' },
//       { range: [12, 17], emoji: '☀️', text: 'Good afternoon' },
//       { range: [17, 22], emoji: '🌆', text: 'Good evening' },
//       { range: [22, 5], emoji: '🌙', text: 'Good night' }
//     ];
//     return greetings.find(g => hour >= g.range[0] && hour < g.range[1]) || greetings[3];
//   };

//   const formatTime = (date: Date) => {
//     if (!dashboardData) return date.toLocaleTimeString();
//     return date.toLocaleTimeString(dashboardData.config.locale, {
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: dashboardData.config.timeFormat === '12h'
//     });
//   };

//   const formatCurrency = (amount: number) => {
//     if (!dashboardData) return amount.toString();
//     return new Intl.NumberFormat(dashboardData.config.locale, {
//       style: 'currency',
//       currency: dashboardData.config.currency,
//       minimumFractionDigits: 0
//     }).format(amount);
//   };

//   if (loading) {
//     return (
//       <div style={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}>
//         <div className="text-center text-white">
//           <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'spin 2s linear infinite' }}>
//             <Sparkles size={64} />
//           </div>
//           <h2>{retryCount > 0 ? `Retrying... (${retryCount}/3)` : 'Loading Dashboard'}</h2>
//           <p style={{ opacity: 0.8 }}>
//             {retryCount > 0 ? 'Connection issues detected' : 'Fetching your personalized data...'}
//           </p>
//           <div style={{ 
//             width: '300px', 
//             height: '4px', 
//             background: 'rgba(255,255,255,0.2)', 
//             borderRadius: '2px',
//             margin: '20px auto',
//             overflow: 'hidden'
//           }}>
//             <div style={{
//               width: '100%',
//               height: '100%',
//               background: 'linear-gradient(90deg, transparent, white, transparent)',
//               animation: 'shimmer 1.5s infinite'
//             }}></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !dashboardData) {
//     return (
//       <div style={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}>
//         <div style={{
//           background: 'rgba(255,255,255,0.1)',
//           backdropFilter: 'blur(15px)',
//           borderRadius: '20px',
//           padding: '2rem',
//           textAlign: 'center',
//           border: '1px solid rgba(255,255,255,0.2)'
//         }}>
//           <AlertTriangle size={64} color="white" style={{ marginBottom: '1rem' }} />
//           <h3 style={{ color: 'white', marginBottom: '1rem' }}>Dashboard Unavailable</h3>
//           <p style={{ color: '#fed7d7', marginBottom: '1.5rem' }}>{error || 'Unable to load dashboard data'}</p>
//           <button 
//             onClick={() => {
//               setRetryCount(0);
//               setError(null);
//               fetchDashboardData();
//             }}
//             style={{
//               background: 'white',
//               border: 'none',
//               borderRadius: '10px',
//               padding: '12px 24px',
//               cursor: 'pointer',
//               fontWeight: 'bold'
//             }}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const { user, usage, config } = dashboardData;
//   const planConfig = PLAN_CONFIGS[user.plan.toLowerCase() as keyof typeof PLAN_CONFIGS] || PLAN_CONFIGS.basic;
//   const statusConfig = STATUS_CONFIGS[user.status as keyof typeof STATUS_CONFIGS];
//   const theme = THEMES[config.theme as keyof typeof THEMES];
//   const greeting = getTimeBasedGreeting();

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: theme.bg,
//       padding: '2rem',
//       transition: 'all 0.5s ease'
//     }}>
//       {/* Dynamic Header */}
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: '2rem',
//         flexWrap: 'wrap'
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <span style={{ fontSize: '3rem', marginRight: '1rem' }}>{greeting.emoji}</span>
//           <div>
//             <h1 style={{ 
//               color: theme.text, 
//               margin: 0, 
//               fontSize: '2.5rem',
//               background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent'
//             }}>
//               {greeting.text}, {user.name.split(' ')[0]}!
//             </h1>
//             <p style={{ color: theme.textSecondary, margin: '0.5rem 0' }}>
//               {metrics?.isCritical ? '🚨 Critical: Immediate action needed' :
//                metrics?.isLowStock ? '⚠️ Running low on cheques' : 
//                metrics?.trendDirection === 'up' ? '📈 Usage trending up' : 
//                '✅ Everything looks great'}
//             </p>
//           </div>
//         </div>
        
//         <div style={{ textAlign: 'right', color: theme.text }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
//             <button
//               onClick={() => setAutoRefresh(!autoRefresh)}
//               style={{
//                 background: autoRefresh ? '#22c55e' : '#6b7280',
//                 border: 'none',
//                 borderRadius: '50%',
//                 width: '40px',
//                 height: '40px',
//                 color: 'white',
//                 cursor: 'pointer'
//               }}
//             >
//               {autoRefresh ? <CheckCircle size={20} /> : <Clock size={20} />}
//             </button>
//             <div>
//               <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{formatTime(currentTime)}</div>
//               <div style={{ fontSize: '0.875rem', color: theme.textSecondary }}>
//                 {currentTime.toLocaleDateString(config.locale)} • {config.locale}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Dynamic Stats Grid */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
//         {/* Main Cheques Card */}
//         <div style={{
//           background: theme.cardBg,
//           backdropFilter: 'blur(15px)',
//           borderRadius: '20px',
//           padding: '2rem',
//           border: '1px solid rgba(255,255,255,0.2)',
//           transform: animateCounters && config.showAnimations ? 'scale(1.02)' : 'scale(1)',
//           transition: 'all 0.3s ease'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//             <div style={{
//               width: '50px',
//               height: '50px',
//               background: metrics?.isCritical ? '#ef4444' : metrics?.isLowStock ? '#f59e0b' : '#22c55e',
//               borderRadius: '15px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginRight: '1rem'
//             }}>
//               <CreditCard size={24} color="white" />
//             </div>
//             <div>
//               <h3 style={{ color: theme.text, margin: 0 }}>Available Cheques</h3>
//               <small style={{ color: metrics?.isLowStock ? '#f59e0b' : '#22c55e' }}>
//                 ~{metrics?.daysRemaining} days remaining
//               </small>
//             </div>
//           </div>
          
//           <div style={{
//             fontSize: '3rem',
//             fontWeight: 'bold',
//             color: metrics?.isCritical ? '#ef4444' : metrics?.isLowStock ? '#f59e0b' : '#22c55e',
//             marginBottom: '1rem',
//             animation: animateCounters && config.showAnimations ? 'bounce 0.6s ease-out' : 'none'
//           }}>
//             {metrics?.remainingCheques.toLocaleString(config.locale)}
//           </div>
          
//           <div style={{
//             width: '100%',
//             height: '8px',
//             background: 'rgba(255,255,255,0.2)',
//             borderRadius: '4px',
//             overflow: 'hidden',
//             marginBottom: '1rem'
//           }}>
//             <div style={{
//               width: animateCounters ? `${metrics?.usagePercentage}%` : '0%',
//               height: '100%',
//               background: metrics?.isLowStock ? 
//                 'linear-gradient(90deg, #f59e0b, #dc2626)' : 
//                 'linear-gradient(90deg, #22c55e, #4ade80)',
//               transition: 'width 1.5s ease'
//             }}></div>
//           </div>
          
//           <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
//             <span style={{ color: theme.textSecondary }}>
//               Burn Rate: {metrics?.burnRate}/day
//             </span>
//             <span style={{ color: theme.text }}>
//               {Math.round(metrics?.usagePercentage || 0)}% used
//             </span>
//           </div>
//         </div>

//         {/* Health Score Card */}
//         <div style={{
//           background: theme.cardBg,
//           backdropFilter: 'blur(15px)',
//           borderRadius: '20px',
//           padding: '2rem',
//           border: '1px solid rgba(255,255,255,0.2)'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//             <Gauge size={24} color="#3b82f6" style={{ marginRight: '1rem' }} />
//             <span style={{ color: theme.text, fontWeight: 'bold' }}>Health Score</span>
//           </div>
          
//           <div style={{
//             fontSize: '2.5rem',
//             fontWeight: 'bold',
//             color: '#3b82f6',
//             animation: animateCounters && config.showAnimations ? 'bounce 0.6s ease-out' : 'none'
//           }}>
//             {metrics?.healthScore}%
//           </div>
          
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             marginTop: '1rem',
//             color: theme.textSecondary
//           }}>
//             <span style={{ color: statusConfig.color, marginRight: '0.5rem' }}>
//               {statusConfig.icon}
//             </span>
//             {statusConfig.label}
//           </div>
//         </div>

//         {/* Plan Card */}
//         <div style={{
//           background: planConfig.gradient,
//           borderRadius: '20px',
//           padding: '2rem',
//           color: 'white',
//           position: 'relative',
//           overflow: 'hidden'
//         }}>
//           {config.showAnimations && (
//             <Sparkles 
//               size={24} 
//               style={{ 
//                 position: 'absolute',
//                 top: '1rem',
//                 right: '1rem',
//                 animation: 'bounce 2s infinite'
//               }} 
//             />
//           )}
          
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//             <planConfig.icon size={32} style={{ marginRight: '1rem' }} />
//             <div>
//               <h3 style={{ margin: 0, textTransform: 'capitalize' }}>{user.plan}</h3>
//               <small style={{ opacity: 0.8 }}>
//                 Since {new Date(user.joinDate).getFullYear()}
//               </small>
//             </div>
//           </div>
          
//           <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
//             {planConfig.features.map((feature, i) => (
//               <div key={i} style={{ marginBottom: '0.25rem' }}>• {feature}</div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Usage Analytics */}
//       <div style={{
//         background: theme.cardBg,
//         backdropFilter: 'blur(15px)',
//         borderRadius: '20px',
//         padding: '2rem',
//         border: '1px solid rgba(255,255,255,0.2)'
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
//           <BarChart3 size={32} color="#3b82f6" style={{ marginRight: '1rem' }} />
//           <div>
//             <h3 style={{ color: theme.text, margin: 0 }}>Usage Analytics</h3>
//             <p style={{ color: theme.textSecondary, margin: '0.5rem 0' }}>
//               Peak: {usage.peakHour}:00 • Trend: {usage.trend} • Efficiency: {usage.efficiency}%
//             </p>
//           </div>
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
//           {[
//             { period: "Last 24h", value: usage.lastDay, color: "#3b82f6", icon: Clock },
//             { period: "Last 3 Days", value: usage.last3Days, color: "#f59e0b", icon: Calendar },
//             { period: "Last 30 Days", value: usage.last30Days, color: "#22c55e", icon: TrendingUp }
//           ].map((stat, index) => (
//             <div key={index} style={{
//               background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}40)`,
//               borderRadius: '15px',
//               padding: '1.5rem',
//               border: `1px solid ${stat.color}40`
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//                 <stat.icon size={20} color={stat.color} />
//                 <span style={{ 
//                   fontSize: '1.5rem', 
//                   fontWeight: 'bold', 
//                   color: stat.color,
//                   marginLeft: '1rem',
//                   animation: animateCounters && config.showAnimations ? 'bounce 0.6s ease-out' : 'none'
//                 }}>
//                   {stat.value.toLocaleString(config.locale)}
//                 </span>
//               </div>
//               <h6 style={{ color: theme.text, margin: 0 }}>{stat.period}</h6>
//             </div>
//           ))}
//         </div>

//         <div style={{
//           marginTop: '2rem',
//           padding: '1rem',
//           background: 'rgba(0,0,0,0.2)',
//           borderRadius: '10px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           flexWrap: 'wrap',
//           gap: '1rem'
//         }}>
//           <div style={{ color: theme.text }}>
//             <strong>Monthly Total:</strong> {usage.totalThisMonth}
//           </div>
//           <div style={{ color: theme.text }}>
//             <strong>Avg Daily:</strong> {usage.averageDaily}
//           </div>
//           <div style={{ color: theme.text }}>
//             <strong>Estimated Cost:</strong> {formatCurrency(usage.totalThisMonth * 0.5)}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
//         @keyframes bounce {
//           0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
//           40%, 43% { transform: translateY(-10px); }
//           70% { transform: translateY(-5px); }
//         }
//       `}</style>
//     </div>
//   );
// // }
// import React, { useEffect, useState, useMemo } from "react";
// import { CreditCard, TrendingUp, Calendar, Clock, BarChart3, Gauge, CheckCircle, AlertTriangle, Sparkles, RefreshCw } from "lucide-react";
// import { USER_PROP, ENDPOINTS } from "../utils/constant";


// interface User {
//   id: string;
//   name: string;
//   email: string;
//   plan: string;
//   totalCheques: number;
//   usedCheques: number;
//   status: string;
//   joinDate: string;
// }

// interface UsageStats {
//   lastDay: number;
//   last3Days: number;
//   last30Days: number;
//   efficiency: number;
//   trend: string;
//   averageDaily: number;
//   peakHour: number;
//   totalThisMonth: number;
// }

// interface DashboardData {
//   user: User;
//   usage: UsageStats;
//   config: {
//     theme: string;
//     showAnimations: boolean;
//     refreshInterval: number;
//     timeFormat: string;
//     locale: string;
//     currency: string;
//   };
// }

// const PLAN_CONFIGS = {
//   basic: { gradient: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)', features: ['Basic Support', '100 Cheques/month'] },
//   pro: { gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', features: ['Priority Support', '500 Cheques/month'] },
//   premium: { gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', features: ['24/7 Support', 'Unlimited Cheques'] },
//   enterprise: { gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', features: ['Dedicated Manager', 'Custom Limits'] }
// };

// const STATUS_CONFIGS = {
//   active: { color: '#22c55e', label: 'Online', icon: '●' },
//   inactive: { color: '#6b7280', label: 'Away', icon: '○' },
//   suspended: { color: '#ef4444', label: 'Suspended', icon: '⚠' }
// };

// const THEMES = {
//   default: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', cardBg: 'rgba(255,255,255,0.1)', text: '#ffffff', textSecondary: '#e5e7eb' },
//   dark: { bg: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)', cardBg: 'rgba(31,41,55,0.8)', text: '#f9fafb', textSecondary: '#9ca3af' },
//   light: { bg: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)', cardBg: 'rgba(255,255,255,0.9)', text: '#1f2937', textSecondary: '#6b7280' }
// };

// export default function UserDashboard() {
//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [animateCounters, setAnimateCounters] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [retryCount, setRetryCount] = useState(0);
//   const [autoRefresh, setAutoRefresh] = useState(true);
//   const refreshInterval  = dashboardData?.refreshInterval ?? 30000; 
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("No token found, please login again");
//       }

//       const res = await fetch(`${USER_PROP}${ENDPOINTS.USER_DASHBOARD}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         }
//       });

//       if (res.status === 401) {
//         throw new Error("Unauthorized - Please login again");
//       }

//       if (!res.ok) {
//         throw new Error(`Error: ${res.status} ${res.statusText}`);
//       }

//       const data: DashboardData = await res.json();
//       setDashboardData(data);
//       setRetryCount(0);
//       setTimeout(() => setAnimateCounters(true), 300);

//     } catch (err) {
//       const message = err instanceof Error ? err.message : "Failed to load dashboard";
//       console.error("Dashboard fetch error:", message);
//       setError(message);

//       if (retryCount < 3) {
//         setRetryCount(prev => prev + 1);
//         setTimeout(() => fetchDashboardData(), 2000 * (retryCount + 1));
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchDashboardData(); }, []);

//   useEffect(() => {
//     if (!autoRefresh || !dashboardData) return;
//     const interval = setInterval(fetchDashboardData, dashboardData.config.refreshInterval);
//     return () => clearInterval(interval);
//   }, [dashboardData?.config.refreshInterval,autoRefresh]);

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const metrics = useMemo(() => {
//     if (!dashboardData) return null;
//     const { user, usage } = dashboardData;
//     const remainingCheques = user.totalCheques - user.usedCheques;
//     const usagePercentage = (user.usedCheques / user.totalCheques) * 100;
//     const healthScore = Math.max(0, Math.min(100, 100 - usagePercentage + (usage.efficiency * 0.5)));
//     const burnRate = usage.averageDaily;
//     const daysRemaining = remainingCheques / Math.max(burnRate, 1);
    

    
//     return {
//       remainingCheques,
//       usagePercentage,
//       healthScore: Math.round(healthScore),
//       burnRate,
//       daysRemaining: Math.ceil(daysRemaining),
//       isLowStock: remainingCheques < user.totalCheques * 0.2,
//       isCritical: remainingCheques < user.totalCheques * 0.1,
//       trendDirection: usage.trend
//     };
//   }, [dashboardData]);

//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString(dashboardData?.config.locale || 'en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: dashboardData?.config.timeFormat === '12h'
//     });
//   };

//   if (loading) {
//     return (
//       <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <div style={{ textAlign: 'center', color: 'white' }}>
//           <Sparkles size={64} style={{ animation: 'spin 2s linear infinite', margin: '0 auto 1rem' }} />
//           <h2>{retryCount > 0 ? `Retrying... (${retryCount}/3)` : 'Loading Dashboard'}</h2>
//           <p style={{ opacity: 0.8 }}>{retryCount > 0 ? 'Connection issues detected' : 'Fetching your data...'}</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !dashboardData) {
//     return (
//       <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
//         <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(15px)', borderRadius: '20px', padding: '2rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)', maxWidth: '500px' }}>
//           <AlertTriangle size={64} color="white" style={{ marginBottom: '1rem' }} />
//           <h3 style={{ color: 'white', marginBottom: '1rem' }}>Dashboard Unavailable</h3>
//           <p style={{ color: '#fed7d7', marginBottom: '1.5rem' }}>{error || 'Unable to load dashboard data'}</p>
//           <button onClick={() => { setRetryCount(0); setError(null); fetchDashboardData(); }} style={{ background: 'white', border: 'none', borderRadius: '10px', padding: '12px 24px', cursor: 'pointer', fontWeight: 'bold' }}>
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const { user, usage, config } = dashboardData;
//   const planConfig = PLAN_CONFIGS[user.plan.toLowerCase() as keyof typeof PLAN_CONFIGS] || PLAN_CONFIGS.basic;
//   const statusConfig = STATUS_CONFIGS[user.status as keyof typeof STATUS_CONFIGS];
//   const theme = THEMES[config.theme as keyof typeof THEMES];

//   return (
//     <div style={{ minHeight: '100vh', background: theme.bg, padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
//       {/* Header */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
//         <div>
//           <h1 style={{ color: theme.text, margin: 0, fontSize: '2rem' }}>Welcome, {user.name.split(' ')[0]}!</h1>
//           <p style={{ color: theme.textSecondary, margin: '0.5rem 0' }}>
//             {metrics?.isCritical ? '🚨 Critical: Low cheques' : metrics?.isLowStock ? '⚠️ Running low' : '✅ Everything looks great'}
//           </p>
//         </div>
//         <div style={{ textAlign: 'right', color: theme.text }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//             <button onClick={() => setAutoRefresh(!autoRefresh)} style={{ background: autoRefresh ? '#22c55e' : '#6b7280', border: 'none', borderRadius: '50%', width: '40px', height: '40px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               {autoRefresh ? <CheckCircle size={20} /> : <Clock size={20} />}
//             </button>
//             <div>
//               <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{formatTime(currentTime)}</div>
//               <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>{currentTime.toLocaleDateString(config.locale)}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
//         {/* Cheques Card */}
//         <div style={{ background: theme.cardBg, backdropFilter: 'blur(15px)', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.2)' }}>
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//             <div style={{ width: '50px', height: '50px', background: metrics?.isCritical ? '#ef4444' : metrics?.isLowStock ? '#f59e0b' : '#22c55e', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}>
//               <CreditCard size={24} color="white" />
//             </div>
//             <div>
//               <h3 style={{ color: theme.text, margin: 0, fontSize: '1rem' }}>Available Cheques</h3>
//               <small style={{ color: theme.textSecondary }}>~{metrics?.daysRemaining} days left</small>
//             </div>
//           </div>
//           <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: metrics?.isCritical ? '#ef4444' : metrics?.isLowStock ? '#f59e0b' : '#22c55e', marginBottom: '1rem' }}>
//             {metrics?.remainingCheques.toLocaleString(config.locale)}
//           </div>
//           <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
//             <div style={{ width: `${metrics?.usagePercentage}%`, height: '100%', background: metrics?.isLowStock ? 'linear-gradient(90deg, #f59e0b, #dc2626)' : 'linear-gradient(90deg, #22c55e, #4ade80)', transition: 'width 1s ease' }}></div>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
//             <span style={{ color: theme.textSecondary }}>Burn: {metrics?.burnRate}/day</span>
//             <span style={{ color: theme.text }}>{Math.round(metrics?.usagePercentage || 0)}% used</span>
//           </div>
//         </div>

//         {/* Health Score */}
//         <div style={{ background: theme.cardBg, backdropFilter: 'blur(15px)', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.2)' }}>
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//             <Gauge size={24} color="#3b82f6" style={{ marginRight: '1rem' }} />
//             <span style={{ color: theme.text, fontWeight: 'bold' }}>Health Score</span>
//           </div>
//           <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6' }}>{metrics?.healthScore}%</div>
//           <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem', color: theme.textSecondary }}>
//             <span style={{ color: statusConfig.color, marginRight: '0.5rem' }}>{statusConfig.icon}</span>
//             {statusConfig.label}
//           </div>
//         </div>

//         {/* Plan Card */}
//         <div style={{ background: planConfig.gradient, borderRadius: '20px', padding: '2rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
//           <Sparkles size={24} style={{ position: 'absolute', top: '1rem', right: '1rem', opacity: 0.5 }} />
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//             <CreditCard size={32} style={{ marginRight: '1rem' }} />
//             <div>
//               <h3 style={{ margin: 0, textTransform: 'capitalize' }}>{user.plan}</h3>
//               <small style={{ opacity: 0.8 }}>Since {new Date(user.joinDate).getFullYear()}</small>
//             </div>
//           </div>
//           <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
//             {planConfig.features.map((feature, i) => (
//               <div key={i} style={{ marginBottom: '0.25rem' }}>• {feature}</div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Usage Analytics */}
//       <div style={{ background: theme.cardBg, backdropFilter: 'blur(15px)', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.2)' }}>
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap' }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <BarChart3 size={32} color="#3b82f6" style={{ marginRight: '1rem' }} />
//             <div>
//               <h3 style={{ color: theme.text, margin: 0 }}>Usage Analytics</h3>
//               <p style={{ color: theme.textSecondary, margin: '0.5rem 0', fontSize: '0.875rem' }}>
//                 Peak: {usage.peakHour}:00 • Trend: {usage.trend} • Efficiency: {usage.efficiency}%
//               </p>
//             </div>
//           </div>
//           <button onClick={fetchDashboardData} style={{ background: 'rgba(59,130,246,0.2)', border: '1px solid #3b82f6', borderRadius: '10px', padding: '8px 16px', color: theme.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//             <RefreshCw size={16} />
//             Refresh
//           </button>
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
//           {[
//             { period: "Last 24h", value: usage.lastDay, color: "#3b82f6", icon: Clock },
//             { period: "Last 3 Days", value: usage.last3Days, color: "#f59e0b", icon: Calendar },
//             { period: "Last 30 Days", value: usage.last30Days, color: "#22c55e", icon: TrendingUp }
//           ].map((stat, index) => (
//             <div key={index} style={{ background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}40)`, borderRadius: '15px', padding: '1.5rem', border: `1px solid ${stat.color}40` }}>
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//                 <stat.icon size={20} color={stat.color} />
//                 <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: stat.color, marginLeft: '1rem' }}>
//                   {stat.value.toLocaleString(config.locale)}
//                 </span>
//               </div>
//               <h6 style={{ color: theme.text, margin: 0 }}>{stat.period}</h6>
//             </div>
//           ))}
//         </div>

//         <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem' }}>
//           <div style={{ color: theme.text }}><strong>Monthly Total:</strong> {usage.totalThisMonth}</div>
//           <div style={{ color: theme.text }}><strong>Avg Daily:</strong> {usage.averageDaily}</div>
//           <div style={{ color: theme.text }}><strong>Status:</strong> {user.status}</div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar"; // ✅ Import your navbar
import {
  Printer,
  TrendingUp,
  CreditCard,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { USER_PROP, ENDPOINTS } from "../utils/constant";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  const goToCheckPrinting = () => {
    navigate("/cheque-printing");
  };

  if (loading)
    return (
      <div
        className="d-flex vh-100 justify-content-center align-items-center"
        style={{
          background: "rgb(249 241 230)",
        }}
      >
        <div className="text-center">
          <Spinner
            animation="border"
            variant="light"
            style={{ width: "3rem", height: "3rem" }}
          />
          <h5 className="text-white mt-3">Loading your dashboard...</h5>
        </div>
      </div>
    );

  if (error)
    return (
      <div
        className="d-flex vh-100 justify-content-center align-items-center flex-column"
        style={{
          background: "rgb(249 241 230)",
        }}
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
      {/* ✅ Use your Navbar at the top */}
      <Navbar />

      {/* ✅ Add top spacing because Navbar is fixed */}
      <div style={{ marginTop: "90px" }} className="min-vh-100">
        <div
          className="container py-4"
          style={{
            background: "rgb(249 241 230)",
            borderRadius: "20px",
            padding: "30px",
          }}
        >
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="fw-bold text-black-30 mb-1">
                Welcome, {dashboardData?.user?.name || "User"} 👋
              </h3>
              <p className="text-black-50 mb-0">
                Manage your cheques, plans, and payments
              </p>
            </div>
            <button
              className="btn px-4 py-2 shadow-sm"
              onClick={goToCheckPrinting}
              style={{
                background:
                  "rgb(12 119 111)",
                color: "rgb(249 241 230)",
                border: "none",
                borderRadius: "10px",
                fontWeight: "500",
              }}
            >
              <Printer size={18} className="me-2" />
              Check Printing
            </button>
          </div>

          {/* Overview Cards */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div
                className="card border-0 shado-lg h-100 text-black-30"
                style={{
                  background: "white",
                  borderRadius: "20px",
                }}
              >
                <div className="card-body p-4 shadow-sm opacity-100">
                  <h6 className="text-black-50 mb-2">Active Plan</h6>
                  <h3 className="fw-bold mb-0">
                    {dashboardData?.user?.plan || "Free"}
                  </h3>
                  <TrendingUp size={24} className="mt-3 opacity-100" />
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card border-0 shadow-lg h-100 text-black-30"
                style={{
                  background: "white",
                  borderRadius: "20px",
                }}
              >
                <div className="card-body p-4 shadow-sm">
                  <h6 className="text-black-50 mb-2">Days Remaining</h6>
                  <h3 className="fw-bold mb-0">
                    {dashboardData?.countdown ?? "N/A"}
                  </h3>
                  <Calendar size={24} className="mt-3 opacity-75" />
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card border-0 shadow-lg h-100 text-black-30"
                style={{
                  background: "white",
                  borderRadius: "20px",
                }}
              >
                <div className="card-body p-4 shadow-sm">
                  <h6 className="text-black-50 mb-2">Cheques Used</h6>
                  <h3 className="fw-bold mb-0">
                    {dashboardData?.cheques?.used || 0} /{" "}
                    {dashboardData?.cheques?.total || 0}
                  </h3>
                  <CheckCircle size={24} className="mt-3 opacity-75" />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="card border-0 shadow-lg" style={{ borderRadius: "20px" }}>
            <div className="card-body p-0">
              <ul className="nav nav-pills p-4 pb-0">
                {["overview", "cheques", "payments", "settings"].map((tab) => (
                  <li className="nav-item" key={tab}>
                    <button
                      className={`nav-link px-4 py-2 fw-semibold ${
                        activeTab === tab ? "" : ""
                      }`}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        background:
                          activeTab === tab
                            ? "rgb(12 119 111)"
                            : "transparent",
                        color: activeTab === tab ? "rgb(249 241 230)" : "#6c757d",
                        border: "none",
                        borderRadius: "12px",
                        marginRight: "8px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Tab Content */}
              <div className="p-4">
                {activeTab === "overview" && (
                  <div>
                    <h5 className="fw-bold mb-4" style={{ color: "#0c776f" }}>
                      Account Overview
                    </h5>
                    <p>
                      <strong>Current Plan:</strong>{" "}
                      {dashboardData?.user?.plan || "Free"}
                    </p>
                    <p>
                      <strong>Days Remaining:</strong>{" "}
                      {dashboardData?.countdown ?? "N/A"}
                    </p>
                    <p>
                      <strong>Cheques Used:</strong>{" "}
                      {dashboardData?.cheques?.used || 0} /{" "}
                      {dashboardData?.cheques?.total || 0}
                    </p>
                  </div>
                )}

                {activeTab === "cheques" && (
                  <div>
                    <h5 className="fw-bold mb-4" style={{ color: "#0c776f" }}>
                      Cheque History
                    </h5>
                    {dashboardData?.cheques?.history?.length ? (
                      <ul className="list-group list-group-flush">
                        {dashboardData.cheques.history.map((item: any, i: number) => (
                          <li
                            key={i}
                            className="list-group-item border-0 py-3"
                            style={{
                              background: i % 2 === 0 ? "#f8f9fa" : "white",
                            }}
                          >
                            <CheckCircle size={16} className="me-2 text-success" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-5">
                        <p className="text-muted">No cheque history available.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "payments" && (
                  <div>
                    <h5 className="fw-bold mb-4" style={{ color: "#0c776f" }}>
                      Payment History
                    </h5>
                    {dashboardData?.payments?.length ? (
                      <ul className="list-group list-group-flush">
                        {dashboardData.payments.map((p: any, i: number) => (
                          <li
                            key={i}
                            className="list-group-item border-0 py-3"
                            style={{
                              background: i % 2 === 0 ? "#f8f9fa" : "white",
                            }}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h6 className="mb-1">₹{p.amount}</h6>
                                <small className="text-muted">
                                  {new Date(p.createdAt).toLocaleDateString()}
                                </small>
                              </div>
                              <span
                                className={`badge ${
                                  p.status === "completed"
                                    ? "bg-success"
                                    : "bg-warning"
                                }`}
                              >
                                {p.status}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-5">
                        <p className="text-muted">No payments found.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "settings" && (
                  <div>
                    <h5 className="fw-bold mb-4" style={{ color: "#0c776f" }}>
                      Settings
                    </h5>
                    <p className="text-muted mb-0">
                      Password update form coming soon...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
