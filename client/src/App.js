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
import AdminHomePage from "./Admin/AdminHomePage";
import AdminStudentsPage from "./Admin/AdminStudentsPage";
import AdminProfilePage from "./Admin/AdminProfilePage";
import AdminPublicProfilePage from "./Admin/AdminPublicProfilePage";
import ModulesPage from "./Modules/ModulesPage";
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
        {/* user authentication pages */}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/student/sign-up" element={<StudentSignUpPage />} />
        <Route path="/admin/sign-up" element={<AdminSignUpPage />} />

        {/* student pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/planner-events" element={<EventsPlannerPage />} />
        <Route path="/modules" element={<ModulesPage />} />
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

        {/*admin pages */}
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/students" element={<AdminStudentsPage />} />
        <Route
          path="/admin/profile"
          element={<AdminProfilePage selectedTab={0} />}
        />
        <Route
          path="/admin/profile/public"
          element={<AdminPublicProfilePage />}
        />
        <Route
          path="/admin/profile/account"
          element={<AdminProfilePage selectedTab={1} />}
        />
      </Routes>
    </LocalizationProvider>
  );
};

/* replacing the previous profile page access url (protected route)
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
