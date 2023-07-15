//COMPLETE
import "./App.css";
import SignInPage from "./SignInPage";
import HomePage from "./Home/HomePage";
import StudentSignUpPage from "./SignUp/StudentSignUpPage";
import ProfilePage from "./Profile/ProfilePage";
import EventsPlannerPage from "./Planner/EventsPlannerPage";
import TasksPlannerPage from "./Planner/TasksPlannerPage";
import GPACalculatorPage from "./GPACalculator/GPACalculatorPage";
import CommunityPage from "./Community/CommunityPage";
import ModulesPage from "./ModulesPage";
import AdminHomePage from "./Admin/AdminHomePage";
import AdminStudentsPage from "./Admin/AdminStudentsPage";
import AdminProfilePage from "./Admin/AdminProfilePage";
import AdminSignUpPage from "./SignUp/AdminSignUpPage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicProfilePage from "./Profile/PublicProfilePage";
import { sampleProfile } from "./Constants";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/planner-events" element={<EventsPlannerPage />} />
        <Route path="/planner-tasks" element={<TasksPlannerPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/student/sign-up" element={<StudentSignUpPage />} />
        <Route path="/admin/sign-up" element={<AdminSignUpPage />} />
        <Route path="/profile" element={<ProfilePage selectedTab={0} />} />
        <Route
          path="/profile/my-posts"
          element={<ProfilePage selectedTab={1} />}
        />
        <Route
          path="/profile/liked-posts"
          element={<ProfilePage selectedTab={2} />}
        />
        <Route
          path="/profile/account"
          element={<ProfilePage selectedTab={3} />}
        />
        <Route
          path="/profile/public"
          element={<PublicProfilePage sampleProfile={sampleProfile} />}
        />
        <Route path="/calculator" element={<GPACalculatorPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/students" element={<AdminStudentsPage />} />
      </Routes>
    </LocalizationProvider>
  );
};

/* replacing the previous profile page access url
<Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        */

export default App;
