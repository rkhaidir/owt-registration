import { Link } from "react-router-dom";

export default function Navbar({ t, language, setLanguage }) {
  const toggleLanguage = () => {
    const nextLanguage = language === "id" ? "en" : "id";
    setLanguage(nextLanguage);
  };

  return (
    <nav className="navbar fixed-top modern-navbar">
      <div className="container">
        <div className="navbar-shell w-100 d-flex align-items-center justify-content-between px-3 px-lg-4 py-3">
          <Link
            className="navbar-brand brand-wrap d-flex align-items-center gap-3 m-0 text-decoration-none"
            to="/"
          >
            <span className="brand-mark">
              <span className="brand-mark-inner">SR</span>
            </span>

            <span className="brand-copy">
              <span className="brand-title d-block">{t.brand}</span>
              <span className="brand-subtitle d-block">Sim Racing Event</span>
            </span>
          </Link>

          <button
            type="button"
            className="language-toggle-btn flex-shrink-0"
            onClick={toggleLanguage}
          >
            <span className={`lang-chip ${language === "id" ? "active" : ""}`}>
              ID
            </span>
            <span className={`lang-chip ${language === "en" ? "active" : ""}`}>
              EN
            </span>
            <span
              className={`lang-slider ${language === "en" ? "right" : ""}`}
            ></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
