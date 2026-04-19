import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SuccessPage from "./pages/SuccessPage";

const DISCORD_URL = "https:s.id/97SimRacing";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/success"
        element={<SuccessPage discordUrl={DISCORD_URL} />}
      />
    </Routes>
  );
}
