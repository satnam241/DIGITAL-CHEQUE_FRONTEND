import React, { useState } from "react";
import { 
  FileText, CreditCard, AlertTriangle, Scale, 
  CheckCircle, ShieldAlert, Ban, RefreshCw,
  Award, Users, Zap
} from "lucide-react";

const TermsOfService: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const terms = [
    {
      icon: <FileText size={28} />,
      title: "Use of Services",
      desc: "By using our website, you agree to follow all terms and provide accurate details during registration.",
      color: "primary",
      details: [
        "You must be at least 18 years old to use our services",
        "Provide accurate and complete information during registration",
        "Maintain the security of your account credentials",
        "Use the service only for lawful purposes",
        "Do not share, resell, or misuse digital card credentials",
        "Respect intellectual property rights of Planning Earth"
      ]
    },
    {
      icon: <CreditCard size={28} />,
      title: "Payments & Refunds",
      desc: "All transactions are processed securely through Razorpay. Refunds apply only for failed or duplicate transactions.",
      color: "success",
      details: [
        "All prices are in INR and include applicable taxes",
        "Payments processed securely through Razorpay gateway",
        "Refunds issued within 5-7 business days for failed transactions",
        "Custom design fees are non-refundable once work begins",
        "Contact support within 48 hours for payment issues"
      ]
    },
    {
      icon: <AlertTriangle size={28} />,
      title: "Liability Limitation",
      desc: "Planning Earth is not liable for indirect losses, gateway errors, or delays caused by third-party services.",
      color: "warning",
      details: [
        "Service provided 'as is' without warranties",
        "Not liable for third-party payment gateway issues",
        "Not responsible for shipping delays beyond our control",
        "No liability for indirect or consequential damages",
        "Maximum liability limited to amount paid for service",
        "Users responsible for backup of their data"
      ]
    },
    {
      icon: <Award size={28} />,
      title: "Intellectual Property",
      desc: "All content, designs, and materials on our platform are protected by copyright and trademark laws.",
      color: "info",
      details: [
        "Planning Earth owns all platform content and design",
        "Users retain ownership of their uploaded content",
        "Limited license granted for personal usage",
        "Cannot reproduce or distribute our designs commercially",
        "Respect for third-party intellectual property required",
        "Report any copyright violations to our team"
      ]
    },
    {
      icon: <Ban size={28} />,
      title: "Prohibited Activities",
      desc: "Certain activities are strictly prohibited to maintain service integrity and user safety.",
      color: "danger",
      details: [
        "No fraudulent or illegal activities permitted",
        "Prohibition on offensive or harmful content",
        "No automated data scraping or system attacks",
        "Cannot impersonate others or create fake profiles",
        "No spam or unsolicited commercial communications",
        "Violation may result in immediate account termination"
      ]
    },
    {
      icon: <RefreshCw size={28} />,
      title: "Service Modifications",
      desc: "We reserve the right to modify, suspend, or discontinue services with reasonable notice.",
      color: "secondary",
      details: [
        "Platform features may be updated or changed",
        "Advance notice provided for major changes",
        "Service may be temporarily unavailable for maintenance",
        "Pricing and plans subject to change with notice",
        "Right to refuse service for terms violations",
        "Continued use implies acceptance of modifications"
      ]
    },
    {
      icon: <Users size={28} />,
      title: "Account Termination",
      desc: "Either party may terminate the account relationship subject to these conditions.",
      color: "primary",
      details: [
        "Users can close accounts anytime from dashboard",
        "We may suspend accounts for terms violations",
        "30-day grace period for data retrieval after closure",
        "Outstanding payments must be settled before closure",
        "No refunds for unused subscription period",
        "Permanent data deletion after retention period"
      ]
    },
    {
      icon: <Scale size={28} />,
      title: "Dispute Resolution",
      desc: "Any disputes will be resolved through negotiation or legal proceedings in our jurisdiction.",
      color: "dark",
      details: [
        "Good faith negotiation attempted first",
        "Governed by laws of Punjab, India",
        "Exclusive jurisdiction of Mohali courts",
        "Arbitration option available for disputes",
        "No class action lawsuits permitted",
        "Legal costs borne by non-prevailing party"
      ]
    }
  ];

  const tabs = ["All Terms", "User Obligations", "Payments", "Legal"];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #e7f0ff 0%, #f8f9fa 100%)" }}>
      {/* Hero Section */}
      <div className="bg-primary text-white position-relative overflow-hidden">
        <div className="container ">
          <div className="row justify-content-center text-center py-5">
            <div className="col-lg-8">
              <Scale className="mx-auto mb-3" size={50} style={{ opacity: 0.9 }} />
              <h1 className="display fw-bold mb-3">Terms of Service</h1>
              <p className="lead mb-3">
                Know your rights and responsibilities while using our digital cheque platform
              </p>
              
              {/* Key Highlights */}
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {[
                  { icon: <ShieldAlert size={20} />, text: "User Protection" },
                  { icon: <Zap size={20} />, text: "Clear Guidelines" },
                  { icon: <CheckCircle size={20} />, text: "Fair Terms" }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="badge bg-white bg-opacity-25 text-white px-4 py-3 rounded-pill d-flex align-items-center gap-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Effective Date Banner */}
      <div className="container" style={{ marginTop: "-2rem", position: "relative", zIndex: 10 }}>
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-6 d-flex align-items-center gap-3">
                <FileText className="text-primary" size={30} />
                <div>
                  <p className="fw-bold mb-0">Effective Date: January 1, 2025</p>
                  <p className="text-muted mb-0 small">Last Updated: October 29, 2025</p>
                </div>
              </div>
              <div className="col-md-6 text-md-end mt-3 mt-md-0">
                <div className="d-flex align-items-center justify-content-md-end gap-2">
                  <CheckCircle className="text-success" size={20} />
                  <span className="text-muted small">By using our services, you agree to these terms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="container py-5">
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`btn btn-lg rounded-pill px-4 fw-semibold ${
                activeTab === i ? 'btn-primary' : 'btn-outline-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container pb-5">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-3">Understanding Our Terms</h2>
          <p className="lead text-muted">
            We've made our terms clear and transparent. Please read carefully to understand your rights
          </p>
        </div>

        <div className="row g-4">
          {terms.map((term, i) => (
            <div key={i} className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-4 h-100 hover-lift" style={{ transition: "all 0.3s" }}>
                <div className={`border-${term.color} border-top border-4 rounded-top`}></div>
                
                <div className="card-body p-4">
                  <div className="d-flex align-items-start gap-3 mb-4">
                    <div className={`bg-${term.color} bg-opacity-10 p-3 rounded-3 flex-shrink-0`}>
                      <div className={`text-${term.color}`}>
                        {term.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="fw-bold mb-2">{term.title}</h4>
                      <p className="text-muted mb-0 small">{term.desc}</p>
                    </div>
                  </div>

                  <ul className="list-unstyled mb-0">
                    {term.details.map((detail, idx) => (
                      <li key={idx} className="d-flex align-items-start gap-3 mb-3">
                        <CheckCircle className={`text-${term.color} flex-shrink-0 mt-1`} size={18} />
                        <span className="text-muted small">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agreement Section */}
      <div className="bg-primary text-white py-3">
        <div className="container ">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <Scale className="mx-auto mb-3" size={50} />
              <h2 className="display fw-bold mb-3">Agreement to Terms</h2>
              <p className="lead mb-3">
                By accessing or using Planning Earth's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <a
                  href="mailto:info@planningearth.com"
                  className="btn btn-light btn-lg px-3 py-2 rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2"
                >
                  <FileText size={20} />
                  Email Legal Team
                </a>
                <a
                  href="/privacy-policy"
                  className="btn btn-outline-light btn-lg px-3 py-2 rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2"
                >
                  <ShieldAlert size={20} />
                  View Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="container py-5 text-center">
        <div className="text-muted">
          <p className="mb-3">
            For questions regarding these terms, please contact us at{" "}
            <a href="mailto:info@planningearth.com" className="text-primary fw-semibold text-decoration-none">
              info@planningearth.com
            </a>
          </p>
          <p className="small">
            Planning Earth reserves the right to modify these terms at any time. Changes will be effective upon posting to the website.
          </p>
        </div>
      </div>

      <style>{`
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;
        }
        
        .bg-primary {
          background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%) !important;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
          border: none;
        }
        
        .btn-primary:hover {
          background: linear-gradient(135deg, #4338ca 0%, #4f46e5 100%);
          transform: translateY(-2px);
          box-shadow: 0 0.5rem 1rem rgba(79, 70, 229, 0.3);
        }
        
        .btn-outline-primary:hover {
          background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
          border-color: #4f46e5;
        }
      `}</style>
    </div>
  );
};

export default TermsOfService;