export default function InfoSection({ t }) {
  return (
    <div id="info" className="mt-4 p-4 bg-white rounded-5 shadow-sm info-card">
      <h5 className="fw-bold">{t.infoTitle}</h5>
      <p className="mb-2 text-secondary">{t.infoBody}</p>
      <p className="mb-0 small text-secondary">{t.footerNote}</p>
    </div>
  );
}
