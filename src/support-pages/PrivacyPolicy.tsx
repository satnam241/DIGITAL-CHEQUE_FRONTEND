import React, { useState } from "react";
import { 
  Shield, Lock, Eye, Database, FileText, 
  CheckCircle, AlertCircle, Globe, Cookie 
} from "lucide-react";

const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const sections = [
 
    {
      icon: <Lock className="w-7 h-7" />,
      title: "Data Protection & Security",
      desc: "Sensitive data like passwords and transactions are encrypted using industry-grade security practices. We employ SSL/TLS encryption and secure authentication protocols to protect your information.",
      color: "success",
      details: [
        "End-to-end encryption for sensitive data",
        "Secure payment processing through Razorpay",
        "Regular security audits and updates",
        "Protected servers with firewall and monitoring"
      ]
    },
    {
      icon: <Eye className="w-7 h-7" />,
      title: "How We Use Your Data",
      desc: "Your information is used to provide and improve our services, process orders, send important updates, and personalize your experience with our digital card platform.",
      color: "info",
      details: [
        "Create and manage your digital business cards",
        "Process payments and send order confirmations",
        "Provide customer support and respond to inquiries",
        "Send service updates and promotional offers (with consent)"
      ]
    },
    {
      icon: <Database className="w-7 h-7" />,
      title: "Data Storage & Retention",
      desc: "We store your data securely on cloud servers with regular backups. Your information is retained as long as your account is active or as needed to provide services.",
      color: "warning",
      details: [
        "Secure cloud storage with regular backups",
        "Data retained while account is active",
        "Automatic deletion upon account closure (with 30-day grace period)",
        "Compliance with data protection regulations"
      ]
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: "Third-Party Services",
      desc: "We use trusted third-party services like Razorpay for payments, email providers for communications, and analytics tools to improve our platform.",
      color: "secondary",
      details: [
        "Razorpay for secure payment processing",
        "Email service providers for communications",
        "Analytics tools for service improvement",
        "NFC technology partners for card functionality"
      ]
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Your Privacy Rights",
      desc: "You can request access, modification, or deletion of your data anytime by contacting us at info@planningearth.com. You have full control over your information.",
      color: "danger",
      details: [
        "Access your personal data anytime",
        "Request corrections to inaccurate information",
        "Delete your account and associated data",
        "Opt-out of marketing communications"
      ]
    },
    {
      icon: <Cookie className="w-7 h-7" />,
      title: "Cookies & Tracking",
      desc: "We use cookies to improve your browsing experience, remember your preferences, and analyze site traffic. You can control cookie preferences in your browser.",
      color: "dark",
      details: [
        "Essential cookies for site functionality",
        "Analytics cookies for usage insights",
        "Preference cookies to remember your settings",
        "Full control through browser settings"
      ]
    },
    {
      icon: <FileText className="w-7 h-7" />,
      title: "Policy Updates",
      desc: "We may update this privacy policy periodically to reflect changes in our practices or legal requirements. We'll notify you of significant changes via email.",
      color: "primary",
      details: [
        "Regular reviews and updates as needed",
        "Email notifications for major changes",
        "Posted updates with effective dates",
        "Continued use implies acceptance of changes"
      ]
    }
  ];

  const highlights = [
    { icon: <CheckCircle className="w-5 h-5" />, text: "256-bit SSL Encryption", color: "success" },
    { icon: <CheckCircle className="w-5 h-5" />, text: "GDPR Compliant", color: "primary" },
    { icon: <CheckCircle className="w-5 h-5" />, text: "No Data Selling", color: "info" },
    { icon: <CheckCircle className="w-5 h-5" />, text: "Full Data Control", color: "warning" }
  ];

  return (
    <div style={{ minHeight: "auto", background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" }}>
      {/* Hero Section */}
      <div className="bg-primary text-white position-relative overflow-hidden">
        <div className="container ">
          <div className="row justify-content-center text-center py-5">
            <div className="col-lg-8">
              <Shield className="mx-auto mb-3" size={50} style={{ opacity: 0.9 }} />
              <h1 className="display fw-bold mb-4">Privacy Policy</h1>
              <p className="lead mb-3">
                Your privacy is our priority. Learn how we protect and manage your data
              </p>
              
              {/* Trust Badges */}
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                {highlights.map((item, i) => (
                  <div
                    key={i}
                    className={`badge bg-white bg-opacity-25 text-white px-4 py-3 rounded-pill d-flex align-items-center gap-2`}
                    style={{ fontSize: "0.9rem" }}
                  >
                    <span className={`text-${item.color}`}>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="container" style={{ marginTop: "-2rem", position: "relative", zIndex: 10 }}>
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-6 d-flex align-items-center gap-3">
                <AlertCircle className="text-primary" size={30} />
                <div>
                  <p className="fw-bold mb-0">Last Updated</p>
                  <p className="text-muted mb-0 small">October 29, 2025</p>
                </div>
              </div>
              <div className="col-md-6 text-md-end mt-3 mt-md-0">
                <p className="text-muted mb-0 small">Effective Date</p>
                <p className="fw-bold mb-0">January 1, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5 my-5">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-3">Understanding Our Privacy Practices</h2>
          <p className="lead text-muted">
            We believe in transparency. Here's exactly how we collect, use, and protect your information
          </p>
        </div>

        <div className="row g-4">
          {sections.map((sec, i) => (
            <div key={i} className="col-12">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden hover-lift" style={{ transition: "all 0.3s" }}>
                <div 
                  className="card-header bg-white border-0 p-4 cursor-pointer"
                  onClick={() => setActiveSection(activeSection === i ? null : i)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-start gap-4">
                    <div className={`bg-${sec.color} bg-opacity-10 p-3 rounded-3 flex-shrink-0`}>
                      <div className={`text-${sec.color}`}>
                        {sec.icon}
                      </div>
                    </div>
                    
                    <div className="flex-grow-1">
                      <h4 className="fw-bold mb-2">{sec.title}</h4>
                      <p className="text-muted mb-0">{sec.desc}</p>
                    </div>

                    <CheckCircle 
                      className={activeSection === i ? 'text-primary' : 'text-muted'} 
                      size={24}
                    />
                  </div>
                </div>

                {activeSection === i && (
                  <div className="card-body bg-light border-top p-4">
                    <h6 className="fw-bold mb-3">Key Points:</h6>
                    <ul className="list-unstyled mb-0">
                      {sec.details.map((detail, idx) => (
                        <li key={idx} className="d-flex align-items-start gap-3 mb-3">
                          <CheckCircle className="text-success flex-shrink-0 mt-1" size={20} />
                          <span className="text-muted">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-primary text-white ">
        <div className="container py-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="display-3fw-bold mb-4">
                Questions About Your Privacy?
              </h2>
              <p className="lead mb-3">
                We're here to help. Reach out to our privacy team anytime
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <a
                  href="mailto:info@planningearth.com"
                  className="btn btn-light btn-lg px-3 py-2 rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2"
                >
                  <FileText size={20} />
                  Email Privacy Team
                </a>
                <a
                  href="/contact-us"
                  className="btn btn-outline-light btn-lg px-3 py-2 rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2"
                >
                  <Shield size={20} />
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;
        }
        
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;