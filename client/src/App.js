//COMPLETE
import "./App.css";
import SignInPage from "./SignInPage";
import HomePage from "./Home/HomePage";
import PlannerPage from "./Planner/PlannerPage";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./Profile/ProfilePage";
import GPACalculatorPage from "./GPACalculator/GPACalculatorPage";
import CommunityPage from "./Community/CommunityPage";
import ModulesPage from "./ModulesPage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/calculator" element={<GPACalculatorPage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </LocalizationProvider>
  );
};

export default App;
