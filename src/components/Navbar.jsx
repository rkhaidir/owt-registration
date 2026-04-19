import { Link, useLocation } from "react-router-dom";

export default function Navbar({ t, language, setLanguage }) {
  const location = useLocation();

  const toggleLanguage = () => {
    const nextLanguage = language === "id" ? "en" : "id";
    setLanguage(nextLanguage);
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav className="navbar navbar-expand-lg fixed-top modern-navbar">
      <div className="container">
        <div className="navbar-shell w-100 d-flex align-items-center justify-content-between px-3 px-lg-4 py-2">
          <Link
            className="navbar-brand d-flex align-items-center gap-3 m-0"
            to="/"
          >
            <span className="brand-mark">
              <span className="brand-mark-inner">97</span>
            </span>
            <span>
              <span className="brand-title d-block">{t.brand}</span>
              <span className="brand-subtitle d-block">Sim Racing Event</span>
            </span>
          </Link>

          <button
            className="navbar-toggler modern-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="mainNavbar"
          >
            <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 ms-auto mt-3 mt-lg-0">
              <button
                type="button"
                className="language-toggle-btn"
                onClick={toggleLanguage}
              >
                <span
                  className={`lang-chip ${language === "id" ? "active" : ""}`}
                >
                  ID
                </span>
                <span
                  className={`lang-chip ${language === "en" ? "active" : ""}`}
                >
                  EN
                </span>
                <span
                  className={`lang-slider ${language === "en" ? "right" : ""}`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
