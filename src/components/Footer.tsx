import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer
      className="text-white py-5"
      style={{ backgroundColor: "#002141" }}
    >
      <div className="container">
        <div className="row">
          {/* Logo + Tagline */}
          <div className="col-lg-3 col-md-6 mb-4">
            <Link
              to="/"
              className="navbar-brand fw-bold fs-3"
              style={{
                letterSpacing: '0.5px',
                color: "#0c776f"
              }}
            >
              <span className="me-2">
                <img
                  src="/logo.avif"
                  alt="card icon"
                  style={{ width: "200px", height: "60px" }}
                />
              </span>
            </Link>
            <p className="text-white mt-2">
              Simplify cheque payments with our intelligent wizard — secure, swift,
              and designed to empower your business growth.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h4 className="h5 mb-3">Quick Links</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/plans" className="text-white text-decoration-none">Plans</Link>
              </li>
              <li className="mb-2">
                <Link to="/cheque-printing" className="text-white text-decoration-none">Cheque Printing</Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="text-white text-decoration-none">Login</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h4 className="h5 mb-3">Support</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/help-center" className="text-white text-decoration-none">Help Center</a>
              </li>
              <li className="mb-2">
                <a href="/contact-us" className="text-white text-decoration-none">Contact Us</a>
              </li>
              <li className="mb-2">
                <a href="/privacy-policy" className="text-white text-decoration-none">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <a href="/terms-of-service" className="text-white text-decoration-none">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h4 className="h5 mb-3">Contact Details</h4>
            <ul className="list-unstyled text-white">
              <li className="mb-2">
                <strong>Address:</strong><br />
                Level 1, SCO 539, Sector 70,<br />
                SAS Nagar, Mohali, Punjab 160007
              </li>
              <li className="mb-2">
                <strong>Phone:</strong><br />
                <a href="tel:9814012477" className="text-white text-decoration-none">
                  +91 98140 12477
                </a>
              </li>
              <li className="mb-2">
                <strong>Email:</strong><br />
                <a href="mailto:info@planningearth.com" className="text-white text-decoration-none">
                  info@planningearth.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        {/* Bottom Line */}
        <div className="row">
          <div className="col-12">
            <div className="text-center text-white">
              <p className="mb-0">
                &copy; 2025 PlanningEarth ChequeService. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
