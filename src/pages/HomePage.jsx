import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RegistrationForm from "../components/RegistrationForm";
import { translations } from "../i18n/translations";
import { normalizeRaceNumber, normalizeText } from "../utils/helpers";

const APP_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzH1y5YJHNhuqPpaOTNNurIHLHc6pUFXiWPR25QjuQGCatENbxtRzGJl-t8Ggz6Clsrag/exec";

export default function HomePage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("id");
  const t = useMemo(() => translations[language], [language]);

  const [form, setForm] = useState({
    nama: "",
    guid: "",
    discordUsername: "",
    team: "",
    nomorBalap: "",
  });
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [alert, setAlert] = useState(null);
  const [usedGuids, setUsedGuids] = useState([]);
  const [usedRaceNumbers, setUsedRaceNumbers] = useState([]);
  const [registrationOpen, setRegistrationOpen] = useState(true);
  const [closeMessage, setCloseMessage] = useState("");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("simracing-language");
    if (savedLanguage === "id" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("simracing-language", language);
  }, [language]);

  useEffect(() => {
    const loadExistingData = async () => {
      if (!APP_SCRIPT_URL || APP_SCRIPT_URL.includes("PASTE_YOUR")) {
        setStatusText(t.alertConfig);
        return;
      }

      try {
        setStatusText(t.loadingReference);
        const response = await fetch(
          `${APP_SCRIPT_URL}?action=getExistingData`,
        );
        const result = await response.json();

        setUsedGuids(
          Array.isArray(result.usedGuids)
            ? result.usedGuids.map((item) => normalizeText(item))
            : [],
        );
        setUsedRaceNumbers(
          Array.isArray(result.usedRaceNumbers)
            ? result.usedRaceNumbers.map((item) => normalizeRaceNumber(item))
            : [],
        );
        setStatusText(t.referenceLoaded);
      } catch (error) {
        console.error(error);
        setStatusText(t.referenceFailed);
      }
    };

    loadExistingData();
  }, [t]);

  useEffect(() => {
    const loadSettings = async () => {
      if (!APP_SCRIPT_URL || APP_SCRIPT_URL.includes("PASTE_YOUR")) {
        return;
      }

      try {
        const response = await fetch(`${APP_SCRIPT_URL}?action=getSettings`);
        const result = await response.json();

        if (result.success) {
          setRegistrationOpen(result.registrationOpen !== false);
          setCloseMessage(result.closeMessage || "");
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadSettings();
  }, []);

  const validate = () => {
    const nextErrors = {};

    if (!registrationOpen) {
      nextErrors.form = t.registrationClosed;
      return nextErrors;
    }

    if (!form.nama.trim()) nextErrors.nama = t.requiredName;
    if (!form.guid.trim()) nextErrors.guid = t.requiredGuid;
    if (!form.discordUsername.trim())
      nextErrors.discordUsername = t.requiredDiscordUsername;
    if (!form.team.trim()) nextErrors.team = t.requiredTeam;

    if (!form.nomorBalap.trim()) {
      nextErrors.nomorBalap = t.requiredRaceNumber;
    } else {
      const raceNumber = form.nomorBalap.trim();
      if (!/^[1-9][0-9]{0,2}?$/.test(raceNumber)) {
        nextErrors.nomorBalap = t.invalidRaceNumber;
      }
    }

    if (!confirmed) nextErrors.confirmed = t.confirmError;

    const normalizedGuid = normalizeText(form.guid);
    const normalizedRaceNumber = normalizeRaceNumber(form.nomorBalap);

    if (form.guid.trim() && usedGuids.includes(normalizedGuid)) {
      nextErrors.guid = t.guidUsed;
    }

    if (
      form.nomorBalap.trim() &&
      usedRaceNumbers.includes(normalizedRaceNumber)
    ) {
      nextErrors.nomorBalap = t.raceNumberUsed;
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "nomorBalap") {
      const onlyDigits = value.replace(/\D/g, "").slice(0, 3);
      setForm((prev) => ({ ...prev, [name]: onlyDigits }));
      setErrors((prev) => ({ ...prev, [name]: "", form: "" }));
      setAlert(null);
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", form: "" }));
    setAlert(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAlert(null);

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!APP_SCRIPT_URL || APP_SCRIPT_URL.includes("PASTE_YOUR")) {
      setAlert({ type: "warning", message: t.configWarning });
      return;
    }

    try {
      setLoading(true);
      setStatusText(t.sending);

      const body = new URLSearchParams({
        nama: form.nama,
        guid: form.guid,
        discordUsername: form.discordUsername,
        team: form.team,
        nomorBalap: form.nomorBalap,
      });

      const response = await fetch(APP_SCRIPT_URL, {
        method: "POST",
        body,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || t.genericError);
      }

      setUsedGuids((prev) => [...prev, normalizeText(form.guid)]);
      setUsedRaceNumbers((prev) => [
        ...prev,
        normalizeRaceNumber(form.nomorBalap),
      ]);
      setStatusText(t.sent);
      setForm({
        nama: "",
        guid: "",
        discordUsername: "",
        team: "",
        nomorBalap: "",
      });
      setConfirmed(false);
      setErrors({});
      navigate("/success");
    } catch (error) {
      console.error(error);
      setAlert({ type: "danger", message: error.message || t.genericError });
      setStatusText(t.failed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <Navbar t={t} language={language} setLanguage={setLanguage} />
      <Hero t={t} />

      <section id="register" className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {registrationOpen ? (
                <RegistrationForm
                  t={t}
                  form={form}
                  errors={errors}
                  confirmed={confirmed}
                  onChange={handleChange}
                  onConfirmChange={setConfirmed}
                  onSubmit={handleSubmit}
                  loading={loading}
                  statusText={statusText}
                  alert={alert}
                />
              ) : (
                <div className="card border-0 rounded-5 shadow-lg form-card">
                  <div className="card-body p-4 p-md-5 text-center">
                    <div className="display-5 mb-3">⛔</div>
                    <h2 className="fw-bold text-dark mb-3">
                      {t.registrationClosedTitle}
                    </h2>
                    <p className="text-secondary mb-0">
                      {closeMessage || t.registrationClosed}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
