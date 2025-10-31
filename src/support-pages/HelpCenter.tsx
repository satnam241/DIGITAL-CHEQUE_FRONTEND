import React from "react";
import { HelpCircle, CreditCard, FileText, ShieldCheck, Mail, MessageCircle, RefreshCcw } from "lucide-react";

const HelpCenter: React.FC = () => {
  const helpTopics = [
    {
      icon: <CreditCard size={40} />,
      title: "Payments & Billing",
      desc: "All payments are processed securely via Razorpay. If a transaction fails but the amount is deducted, it will be refunded automatically within 5–7 business days.",
      color: "primary",
    },
    {
      icon: <FileText size={40} />,
      title: "Cheque Creation Help",
      desc: "After successful payment and verification, you can instantly start creating digital cheques from your dashboard. Each cheque is securely linked with your registered account.",
      color: "success",
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "Security & Verification",
      desc: "Every digital cheque is digitally signed and verified before activation. We ensure end-to-end encryption for all cheque data and signatures.",
      color: "warning",
    },
    {
      icon: <RefreshCcw size={40} />,
      title: "Refunds & Cancellations",
      desc: "If you cancel your cheque plan before usage, refunds will be processed within 5–7 working days as per our refund policy.",
      color: "danger",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #f1f7ff 0%, #ffffff 100%)" }}>
      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5">
        <div className="container">
          <HelpCircle className="mx-auto mb-3 mt-3" size={60} style={{ opacity: 0.9 }} />
          <h1 className="fw-bold mb-3">Help Center</h1>
          <p className="lead">
            Find answers and support for your Digital Cheque account, payments, and services.
          </p>
        </div>
      </div>

      {/* Help Topics */}
      <div className="container py-5">
        <div className="row g-4">
          {helpTopics.map((topic, i) => (
            <div key={i} className="col-lg-3 col-md-6">
              <div
                className="card border-0 shadow-sm rounded-4 h-100 hover-lift p-4"
                style={{
                  transition: "all 0.3s ease",
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                <div className="card-body text-center">
                  <div className={`bg-${topic.color} bg-opacity-10 d-inline-flex p-4 rounded-3 mb-4`}>
                    <div className={`text-${topic.color}`}>{topic.icon}</div>
                  </div>
                  <h3 className="h6 fw-bold mb-3">{topic.title}</h3>
                  <p className="text-muted small mb-0">{topic.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center py-5">
          <h5 className="fw-bold mb-3">Need more help?</h5>
          <p className="text-muted mb-4">Our support team is available 24/7 to assist you with any cheque or payment issues.</p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a
              href="mailto:support@digitalcheque.in"
              className="btn btn-outline-primary rounded-pill d-flex align-items-center gap-2"
            >
              <Mail size={18} /> Email Support
            </a>

            <a
              href="https://wa.me/918572060282?text=Hi%2C%20I%20need%20help%20with%20my%20Digital%20Cheque%20account"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success rounded-pill d-flex align-items-center gap-2"
            >
              <MessageCircle size={18} /> WhatsApp Chat
            </a>

            <a
              href="/contact-us"
              className="btn btn-primary rounded-pill d-flex align-items-center gap-2"
            >
              <HelpCircle size={18} /> Contact Form
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 1rem 2rem rgba(0,0,0,.15) !important;
        }
        .bg-primary {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%) !important;
        }
      `}</style>
    </div>
  );
};

export default HelpCenter;
