import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPath(location.pathname); // Update currentPath on route change
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path: string) =>
    currentPath === path ? 'bg-white text-dark fw-semibold' : 'text-black';

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        height: '72px',
        background: 'rgb(249,241,230)',
        boxShadow: '0 9px 30px rgba(0, 0, 0, 0.2)',
        zIndex: 1020,
        backdropFilter: 'blur(6px)',
      }}
    >
      <div className="container">
        <Link
          to="/"
          className="navbar-brand fw-bold fs-3"
          style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: '1px',
            color: '#0c776f',
          }}
        >
          <span className="me-2">
            <img src="/logo.avif" alt="card icon" style={{ width: '200px', height: '60px' }} />
          </span>
          ChequeServices
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '8px 12px' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-2">
              <Link
                to="/"
                className={`nav-link px-3 py-2 rounded-pill transition-all ${isActive('/')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            {!isAuthenticated && (
              <li className="nav-item me-2">
                <Link
                  to="/plans"
                  className={`nav-link px-3 py-2 rounded-pill transition-all ${isActive('/plans')}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Buy Now
                </Link>
              </li>
            )}

            {isAuthenticated && user?.role === 'user' && (
              <li className="nav-item me-3">
                <Link
                  to="/dashboard"
                  className={`nav-link px-3 py-2 rounded-pill transition-all ${isActive('/dashboard')}`}
                  style={{ background: 'rgba(0,0,0,0.2)' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                 Hi, {user.fullName}

                </Link>
              </li>
            )}

            {isAuthenticated && user?.role === 'admin' && (
              <li className="nav-item me-3">
                <Link
                  to="/admin/dashboard"
                  className={`nav-link px-3 py-2 rounded-pill transition-all ${isActive('/admin/dashboard')}`}
                  style={{ background: 'rgba(0,0,0,0.2)' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              </li>
            )}

            {isAuthenticated ? (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light btn-sm px-4 py-2 rounded-pill fw-semibold text-black"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link
                    to="/login"
                    className="btn btn-outline-light btn-sm px-4 py-2 rounded-pill fw-semibold text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className="btn btn-light btn-sm px-4 py-2 rounded-pill fw-bold text-dark"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
