import AlertMessage from "./AlertMessage";
import FormField from "./FormField";

export default function RegistrationForm({
  t,
  form,
  errors,
  confirmed,
  onChange,
  onConfirmChange,
  onSubmit,
  loading,
  statusText,
  alert,
}) {
  return (
    <div className="card border-0 rounded-5 shadow-lg form-card modern-form-card">
      <div className="card-body p-4 p-md-5">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
          <div>
            <span className="form-kicker">SIM RACING</span>
            <h2 className="fw-bold text-dark mb-2 mt-2">{t.formTitle}</h2>
            <p className="text-secondary mb-0">{t.formDesc}</p>
          </div>

          <div className="form-status-chip">
            <span className="form-status-dot"></span>
            <span>{loading ? t.submitting : "Ready to register"}</span>
          </div>
        </div>

        <AlertMessage alert={alert} />

        <form onSubmit={onSubmit} noValidate>
          <div className="row g-4">
            <FormField
              label={t.name}
              name="nama"
              value={form.nama}
              onChange={onChange}
              placeholder={t.namePlaceholder}
              error={errors.nama}
            />

            <FormField
              label={t.guid}
              name="guid"
              value={form.guid}
              onChange={onChange}
              placeholder={t.guidPlaceholder}
              error={errors.guid}
            />

            <FormField
              label={t.team}
              name="team"
              value={form.team}
              onChange={onChange}
              placeholder={t.teamPlaceholder}
              error={errors.team}
            />

            <FormField
              label={t.raceNumber}
              name="nomorBalap"
              value={form.nomorBalap}
              onChange={onChange}
              placeholder={t.raceNumberPlaceholder}
              type="number"
              error={errors.nomorBalap}
            />
          </div>

          <div className="confirm-box mt-4">
            <div className="form-check m-0 d-flex align-items-start gap-3">
              <input
                className={`form-check-input mt-1 ${errors.confirmed ? "is-invalid" : ""}`}
                type="checkbox"
                id="confirmData"
                checked={confirmed}
                onChange={(e) => onConfirmChange(e.target.checked)}
              />
              <label
                className="form-check-label flex-grow-1"
                htmlFor="confirmData"
              >
                <span className="d-block fw-semibold text-dark">
                  {t.confirmLabel}
                </span>
                <span className="small text-secondary">
                  Please recheck your GUID and race number before submitting.
                </span>
              </label>
            </div>
            {errors.confirmed ? (
              <div className="invalid-feedback d-block mt-2">
                {errors.confirmed}
              </div>
            ) : null}
          </div>

          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mt-4">
            <div className="text-secondary small status-pill">{statusText}</div>

            <button
              type="submit"
              className="btn btn-primary btn-lg rounded-4 fw-bold px-4 submit-btn-modern"
              disabled={loading}
            >
              {loading ? t.submitting : t.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
