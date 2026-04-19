export default function AlertMessage({ alert }) {
  if (!alert) return null;

  return (
    <div className={`alert alert-${alert.type} rounded-4`}>{alert.message}</div>
  );
}
