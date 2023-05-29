import "./App.css";
import SignInPage from "./SignInPage";
import HomePage from "./HomePage";
import PlannerPage from "./PlannerPage";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Router>
      <Routes>
        <Route exact path="/login" element={<SignInPage />} />
        <Route exact path="/register" element={<SignUpPage />} />
        <Route exact path="/planner" element={<PlannerPage />} />
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </Router>
    </LocalizationProvider>
  );
}

export default App;

//TODO: You can use the temporary variant to display a drawer for small screens
//TODO: and permanent for a drawer for wider screens.
