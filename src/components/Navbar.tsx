import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPath(location.pathname);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const isActive = (path: string) =>
    currentPath === path
      ? "bg-white text-dark fw-semibold shadow-sm"
      : "text-dark";

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{
          height: "72px",
          background: "linear-gradient(135deg, #f9f1e6, #f5eadc)",
          boxShadow: "0 10px 32px rgba(0,0,0,0.22)",
          zIndex: 1020,
        }}
      >
        <div className="container">
          {/* BRAND */}
          <Link
            to="/"
            className="navbar-brand fw-bold fs-3 d-flex align-items-center"
            style={{
              letterSpacing: "1px",
              color: "#0c776f",
              textShadow: "1px 1px 3px rgba(0,0,0,0.25)",
            }}
          >
            <img
              src="/logo.avif"
              alt="logo"
              style={{ width: "190px", height: "55px", objectFit: "contain" }}
            />
          </Link>

          {/* HAMBURGER (RIGHT) */}
          <button
            className="navbar-toggler border-0 d-lg-none"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            style={{
              background: "rgba(255,255,255,0.55)",
              borderRadius: "12px",
              padding: "8px 12px",
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* DESKTOP MENU */}
          <div className="collapse navbar-collapse d-none d-lg-flex">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item me-2">
                <Link to="/" className={`nav-link px-3 py-2 rounded-pill ${isActive("/")}`}>
                  Home
                </Link>
              </li>

              {!isAuthenticated && (
                <li className="nav-item me-2">
                  <Link
                    to="/plans"
                    className={`nav-link px-3 py-2 rounded-pill ${isActive("/plans")}`}
                  >
                    Buy Now
                  </Link>
                </li>
              )}

              {isAuthenticated && user?.role === "user" && (
                <li className="nav-item me-3">
                  <Link
                    to="/dashboard"
                    className={`nav-link px-3 py-2 rounded-pill ${isActive("/dashboard")}`}
                    style={{ background: "rgba(0,0,0,0.15)" }}
                  >
                    Hi, {user.fullName}
                  </Link>
                </li>
              )}

              {isAuthenticated && user?.role === "admin" && (
                <li className="nav-item me-3">
                  <Link
                    to="/admin/dashboard"
                    className={`nav-link px-3 py-2 rounded-pill ${isActive(
                      "/admin/dashboard"
                    )}`}
                    style={{ background: "rgba(0,0,0,0.15)" }}
                  >
                    Admin Panel
                  </Link>
                </li>
              )}

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="btn btn-dark btn-sm px-4 py-2 rounded-pill fw-semibold"
                  style={{
                    background: "linear-gradient(135deg, #0c776f, #095f58)",
                    border: "none",
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-outline-dark btn-sm px-4 py-2 rounded-pill fw-semibold me-2"
                    style={{ background: "rgba(255,255,255,0.45)" }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-dark btn-sm px-4 py-2 rounded-pill fw-semibold"
                    style={{
                      background: "linear-gradient(135deg, #0c776f, #095f58)",
                      border: "none",
                    }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
{isMenuOpen && (
  <>
    {/* BACKDROP (soft dim) */}
    <div
      onClick={() => setIsMenuOpen(false)}
      className="position-fixed top-0 start-0 w-100 h-100"
      style={{
        background: "rgba(0,0,0,0.25)",
        zIndex: 1040,
      }}
    />

    {/* RIGHT SLIDE PANEL */}
    <div
      className="position-fixed top-0 end-0 h-100"
      style={{
        width: "40vw",
        maxWidth: "320px",
        minWidth: "240px",
        background:
          "linear-gradient(180deg, rgba(249,241,230,0.98), rgba(243,230,213,0.96))",
        backdropFilter: "blur(10px)",
        boxShadow: "-12px 0 40px rgba(0,0,0,0.35)",
        borderTopLeftRadius: "24px",
        borderBottomLeftRadius: "24px",
        borderLeft: "1px solid rgba(255,255,255,0.6)",
        zIndex: 1050,
        paddingTop: "20px",
      }}
    >
      <div className="px-4 d-flex flex-column gap-3">
        {/* CLOSE BUTTON */}
        <div className="d-flex justify-content-end">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="btn btn-sm"
            style={{
              background: "rgba(0,0,0,0.08)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
            }}
          >
            ✕
          </button>
        </div>

        {/* LINKS */}
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="fw-semibold px-3 py-2 rounded"
          style={{
            transition: "0.25s ease",
            background: "rgba(255,255,255,0.6)",
          }}
        >
          Home
        </Link>

        {!isAuthenticated && (
          <Link
            to="/plans"
            onClick={() => setIsMenuOpen(false)}
            className="px-3 py-2 rounded"
            style={{ background: "rgba(255,255,255,0.45)" }}
          >
            Buy Now
          </Link>
        )}

        {isAuthenticated && user?.role === "user" && (
          <Link
            to="/dashboard"
            onClick={() => setIsMenuOpen(false)}
            className="px-3 py-2 rounded"
            style={{ background: "rgba(255,255,255,0.45)" }}
          >
            Dashboard
          </Link>
        )}

        {isAuthenticated && user?.role === "admin" && (
          <Link
            to="/admin/dashboard"
            onClick={() => setIsMenuOpen(false)}
            className="px-3 py-2 rounded"
            style={{ background: "rgba(255,255,255,0.45)" }}
          >
            Admin Panel
          </Link>
        )}

        <hr />

        {/* AUTH ACTIONS */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="btn btn-dark btn-sm rounded-pill fw-semibold"
            style={{
              background: "linear-gradient(135deg, #0c776f, #095f58)",
              border: "none",
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-outline-dark btn-sm rounded-pill"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn btn-dark btn-sm rounded-pill"
              style={{
                background: "linear-gradient(135deg, #0c776f, #095f58)",
                border: "none",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  </>
)}

    </>
  );
};
