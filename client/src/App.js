//COMPLETE
import "./App.css";
import SignInPage from "./SignInPage";
import HomePage from "./HomePage";
import PlannerPage from "./PlannerPage";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
import ModulesPage from "./ModulesPage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/planner" element={<PlannerPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default App;
