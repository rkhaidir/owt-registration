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
              label={t.discordUsername}
              name="discordUsername"
              value={form.discordUsername}
              onChange={onChange}
              placeholder={t.discordUsernamePlaceholder}
              error={errors.discordUsername}
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

          <div className="card mt-3">
            <div className="card-header">
              <span className="fs-6 fw-bold">{t.usedNumbersLabelRound}</span>
            </div>
            <div className="card-body">
              <span className="badge text-bg-danger m-1">3</span>
              <span className="badge text-bg-danger m-1">5</span>
              <span className="badge text-bg-danger m-1">7</span>
              <span className="badge text-bg-danger m-1">9</span>
              <span className="badge text-bg-danger m-1">11</span>
              <span className="badge text-bg-danger m-1">12</span>
              <span className="badge text-bg-danger m-1">13</span>
              <span className="badge text-bg-danger m-1">14</span>
              <span className="badge text-bg-danger m-1">19</span>
              <span className="badge text-bg-danger m-1">20</span>
              <span className="badge text-bg-danger m-1">20</span>
              <span className="badge text-bg-danger m-1">24</span>
              <span className="badge text-bg-danger m-1">25</span>
              <span className="badge text-bg-danger m-1">26</span>
              <span className="badge text-bg-danger m-1">34</span>
              <span className="badge text-bg-danger m-1">41</span>
              <span className="badge text-bg-danger m-1">45</span>
              <span className="badge text-bg-danger m-1">55</span>
              <span className="badge text-bg-danger m-1">57</span>
              <span className="badge text-bg-danger m-1">61</span>
              <span className="badge text-bg-danger m-1">65</span>
              <span className="badge text-bg-danger m-1">69</span>
              <span className="badge text-bg-danger m-1">70</span>
              <span className="badge text-bg-danger m-1">71</span>
              <span className="badge text-bg-danger m-1">76</span>
              <span className="badge text-bg-danger m-1">81</span>
              <span className="badge text-bg-danger m-1">124</span>
              <span className="badge text-bg-danger m-1">163</span>
              <span className="badge text-bg-danger m-1">228</span>
              <span className="badge text-bg-danger m-1">259</span>
              <span className="badge text-bg-danger m-1">354</span>
              <span className="badge text-bg-danger m-1">407</span>
              <span className="badge text-bg-danger m-1">471</span>
              <span className="badge text-bg-danger m-1">480</span>
              <span className="badge text-bg-danger m-1">666</span>
              <span className="badge text-bg-danger m-1">885</span>
              <span className="badge text-bg-danger m-1">920</span>
              <span className="badge text-bg-danger m-1">998</span>
            </div>
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
