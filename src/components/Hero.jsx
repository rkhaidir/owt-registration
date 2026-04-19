export default function Hero({ t }) {
  return (
    <section
      id="home"
      className="hero-section position-relative overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="position-absolute w-100 h-100 top-0 start-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(13,110,253,0.25), transparent 30%), radial-gradient(circle at 80% 20%, rgba(25,135,84,0.2), transparent 25%), linear-gradient(180deg, #eef4ff 0%, #ffffff 100%)",
          zIndex: 0,
        }}
      />

      <div
        className="container position-relative"
        style={{ zIndex: 1, paddingTop: 120, paddingBottom: 80 }}
      >
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2 fw-semibold mb-3">
              {t.heroBadge}
            </span>

            <h1
              className="fw-bold mb-3"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
            >
              {t.heroTitle}
            </h1>

            <p
              className="text-secondary mb-4"
              style={{ fontSize: "1.05rem", maxWidth: 520 }}
            >
              {t.heroDesc}
            </p>

            <div className="d-flex gap-3">
              <a
                href="#register"
                className="btn btn-primary btn-lg rounded-3 fw-semibold px-4"
              >
                {t.navRegister}
              </a>
            </div>
          </div>

          <div className="col-lg-6">
            <div
              className="p-4 rounded-4 shadow-lg bg-white"
              style={{ transform: "rotate(-2deg)", transition: "0.3s" }}
            >
              <div className="d-flex justify-content-between mb-3">
                <span className="badge bg-success">LIVE</span>
                <span className="text-muted small">Sim Racing</span>
              </div>

              <h5 className="fw-bold mb-2">Open Wheel Trophy Registration</h5>
              {/* <p className="text-muted small mb-3">
                Fast input, auto validation, and direct Google Sheets
                integration.
              </p> */}

              <div className="bg-light rounded-3 p-3 small">
                <div>✔ Single Driver</div>
                <div>✔ Race Number 1 - 99</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
