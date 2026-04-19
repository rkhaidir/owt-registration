import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { translations } from "../i18n/translations";

export default function SuccessPage({ discordUrl }) {
  const [language, setLanguage] = useState("id");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("simracing-language");
    if (savedLanguage === "id" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("simracing-language", language);
  }, [language]);

  const t = useMemo(() => translations[language], [language]);

  return (
    <div className="app-shell">
      <Navbar t={t} language={language} setLanguage={setLanguage} />

      <section className="success-page-section d-flex align-items-center">
        <div className="container py-5 mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="card border-0 rounded-5 shadow-lg success-card">
                <div className="card-body p-4 p-md-5 text-center">
                  <div className="display-4 mb-3">✅</div>
                  <h1 className="fw-bold text-dark mb-3">{t.successTitle}</h1>
                  <p className="text-secondary mb-4">{t.successDesc}</p>

                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                    <a
                      href={discordUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-success btn-lg rounded-3 fw-bold px-4"
                    >
                      {t.discordButton}
                    </a>

                    <Link
                      to="/"
                      className="btn btn-outline-primary btn-lg rounded-3 fw-bold px-4"
                    >
                      {t.backToForm}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
