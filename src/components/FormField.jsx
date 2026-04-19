export default function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}) {
  return (
    <div className="col-md-6">
      <label className="form-label fw-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-control rounded-3 ${error ? "is-invalid" : ""}`}
      />
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  );
}
