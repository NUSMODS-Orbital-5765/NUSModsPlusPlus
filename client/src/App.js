//COMPLETE
import "./App.css";
import SignInPage from "./SignInPage";
import HomePage from "./Home/HomePage";
import SignUpStepOne from "./SignUp/SignUpStepOne";
import SignUpStepTwo from "./SignUp/SignUpStepTwo";
import SignUpStepThree from "./SignUp/SignUpStepThree";
import ProfilePage from "./Profile/ProfilePage";
import EventsPlannerPage from "./Planner/EventsPlannerPage";
import TasksPlannerPage from "./Planner/TasksPlannerPage";
import GPACalculatorPage from "./GPACalculator/GPACalculatorPage";
import CommunityPage from "./Community/CommunityPage";
import ModulesPage from "./ModulesPage";
import AdminSignUpPage from "./SignUp/AdminSignUpPage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/planner-events" element={<EventsPlannerPage />} />
        <Route path="/planner-tasks" element={<TasksPlannerPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/student/sign-up-step-one" element={<SignUpStepOne />} />
        <Route path="/student/sign-up-step-two" element={<SignUpStepTwo />} />
        <Route
          path="/student/sign-up-step-three"
          element={<SignUpStepThree />}
        />
        <Route path="/admin/sign-up" element={<AdminSignUpPage />} />
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
