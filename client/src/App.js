import "./App.css";
import SignInPage from "./SignInPage";
import HomePage from "./HomePage";
import PlannerPage from "./PlannerPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <HomePage />
    </LocalizationProvider>
  );
  /*
  const [currentPage, setCurrentPage] = useState("signIn");

  const handleLogout = () => {
    setCurrentPage("signIn");
  };

  const handleLogin = () => {
    setCurrentPage("home");
  };

  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {currentPage === "signIn" ? (
        <SignInPage handleLogin={handleLogin} />
      ) : currentPage === "home" ? (
        <HomePage handleLogout={handleLogout} />
      ) : null}
    </CurrentPageContext.Provider>
  );
  */
}

export default App;

//TODO: You can use the temporary variant to display a drawer for small screens
//TODO: and permanent for a drawer for wider screens.
