import React, { useState } from "react";
import { MapPin, Phone, Mail, Send, Clock, Globe, MessageSquare } from "lucide-react";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      content: "Level 1, SCO 539, Sector 70, SAS Nagar, Mohali, Punjab 160007",
      link: null,
      color: "primary"
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      content: "+91 98140 12477",
      link: "tel:+919814012477",
      color: "success"
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      content: "info@planningearth.com",
      link: "mailto:info@planningearth.com",
      color: "info"
    },
    {
      icon: <Clock size={24} />,
      title: "Business Hours",
      content: "Mon - Sat: 10:00 AM - 6:00 PM",
      link: null,
      color: "warning"
    }
  ];

  return (
    <div style={{ minHeight: "auto", background: "linear-gradient(135deg, #e7f3ff 0%, #f8f9fa 100%)" }}>
      {/* Hero Section */}
      <div className="bg-primary text-white position-relative overflow-hidden">
        <div className="container ">
          <div className="row justify-content-center text-center ">
            <div className="col-lg-8">
              <Globe className="mx-auto mb-4 mt-4" size={50} style={{ opacity: 0.9 }} />
              <h1 className="display fw-bold mb-4">Let's Connect</h1>
              <p className="lead">
                Have questions about our digital cheque service? Our team is ready to help you transform your networking experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row g-4 py-4">
          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-lg rounded-4 h-100">
              <div className="card-body p-4 p-lg-5">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-3">
                    <MessageSquare className="text-primary" size={32} />
                  </div>
                  <div>
                    <h2 className="h3 fw-bold mb-0">Send Message</h2>
                    <p className="text-muted mb-0 small">We respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="form-label fw-semibold">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="form-control form-control-lg rounded-3"
                    placeholder="Full Name"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="form-control form-control-lg rounded-3"
                    placeholder="Your Email"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="form-label fw-semibold">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="form-control form-control-lg rounded-3"
                    placeholder="How can we help?"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="form-label fw-semibold">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    className="form-control form-control-lg rounded-3"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary btn-lg w-100 rounded-3 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Contact Info & Map */}
          <div className="col-lg-6">
            {/* Contact Cards */}
            <div className="row g-3 mb-4">
              {contactInfo.map((info, i) => (
                <div key={i} className="col-sm-6">
                  <div className="card border-0 shadow-sm rounded-3 h-100 hover-lift" style={{ transition: "all 0.3s" }}>
                    <div className="card-body p-4">
                      <div className={`bg-${info.color} bg-opacity-10 p-3 rounded-3 d-inline-flex mb-3`}>
                        <div className={`text-${info.color}`}>
                          {info.icon}
                        </div>
                      </div>
                      <h5 className="fw-bold mb-2">{info.title}</h5>
                      {info.link ? (
                        <a
                          href={info.link}
                          className={`text-${info.color} text-decoration-none fw-medium small d-block`}
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-muted small mb-0">{info.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-header bg-light border-0 p-3">
                <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                  <MapPin className="text-primary" size={22} />
                  Our Location
                </h5>
              </div>
              <iframe
                title="Planning Earth Location"
                src="https://www.google.com/maps?q=SCO+539,+Sector+70,+Mohali,+Punjab+160007&output=embed"
                width="100%"
                height="380"
                loading="lazy"
                className="border-0"
                style={{ display: "block" }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;
        }
        
        .form-control:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
        }
        
        .bg-primary {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%) !important;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          border: none;
        }
        
        .btn-primary:hover {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
          transform: translateY(-2px);
          box-shadow: 0 0.5rem 1rem rgba(30, 64, 175, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ContactUs;