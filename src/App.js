import "./App.css";
import SignInPage from "./SignInPage";
import HomePage from "./HomePage";
import PlannerPage from "./PlannerPage";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
import { BrowserRouter as Router, Route, Switch } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return <SignUpPage />;
}

export default App;

//TODO: You can use the temporary variant to display a drawer for small screens
//TODO: and permanent for a drawer for wider screens.
