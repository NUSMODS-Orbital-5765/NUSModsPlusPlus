//COMPLETE
// add recovery email for password reset field
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { LogoComponent } from "./StyledComponents";
import WelcomeCarousel from "./StyledComponents/WelcomeCarousel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { da } from "date-fns/locale";

// sign up dialog
export const SignUpDialog = () => {
  // navigation to sign up page for new account
  const navigate = useNavigate();

  // open dialog for selecting the correct sign up page
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // links to respective sign up pages
  const goToSignUp = () => {
    console.log(selectedStatus);
    setOpenDialog(false);
    selectedStatus === "student"
      ? navigate("/student/sign-up")
      : navigate("/admin/sign-up");
  };

  // log the correct user status
  const [selectedStatus, setSelectedStatus] = useState("");
  const handleSelectStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <div>
      <Button
        data-testid="sign-up-button"
        color="success"
        sx={{ marginLeft: "10px", color: "white" }}
        variant="contained"
        onClick={handleOpenDialog}
      >
        Get Started.
      </Button>
      <Dialog
        sx={{ borderRadius: "10px" }}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle sx={{ margin: "10px", fontSize: "40px", fontWeight: 700 }}>
          Join the community today.
        </DialogTitle>
        <DialogContent sx={{ margin: "10px", marginTop: "-10px" }}>
          <Typography sx={{ marginBottom: "10px" }}>
            Please select an option.
          </Typography>
          <FormControl fullWidth>
            <InputLabel>I'm signing up as a...</InputLabel>
            <Select
              data-testid="select-status-button"
              fullWidth
              required
              name="status"
              label="I'm signing up as a..."
              onChange={handleSelectStatus}
            >
              <MenuItem value={"student"}>Student</MenuItem>
              <MenuItem value={"admin"}>Administrator</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginTop: "20px",
            }}
          >
            <Button
              data-testid="go-to-signup-button"
              onClick={goToSignUp}
              disabled={selectedStatus === ""}
              variant="contained"
            >
              Go
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const SignInPage = () => {
  const navigate = useNavigate();
  //settings for toggling password visibility
  const [showPassword, setShowPassword] = useState(true);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // states for handling login
  const [allowLogin, setAllowLogin] = useState(false);
  const [loginInfo, setloginInfo] = useState({
    status: "",
    username: "",
    password: "",
  });

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginInvalid, setLoginInvalid] = useState(false);

  // handle login function, disable login button if any of the fields are empty
  const handleLoginInfo = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setloginInfo((prevLoginInfo) => ({
      ...prevLoginInfo,
      [name]: value,
    }));

    const isAnyFieldEmpty = Object.values({
      ...loginInfo,
      [name]: value,
    }).some((field) => field === "");

    setAllowLogin(!isAnyFieldEmpty);
  };

  useEffect(() => {
    console.log(loginInfo);
  }, [loginInfo]);

  // login process
  const loginAPI = `${process.env.REACT_APP_API_LINK}/login`;
  const submitLoginForm = () => {
    const btnPointer = document.querySelector("#login-btn");
    btnPointer.setAttribute("disabled", true);
    btnPointer.innerHTML = "Please wait..";
    axios
      .post(loginAPI, loginInfo)
      .then((response) => {
        btnPointer.innerHTML = "Login";
        btnPointer.removeAttribute("disabled");
        const data = response.data;
        const token = data.token;
        if (!token) {
          setLoginError(true);
          return;
        }
        setLoginSuccess(true);
        console.log(data);
        localStorage.clear();
        localStorage.setItem("permission", loginInfo.status);
        localStorage.setItem("user-token", token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("role", data.role);
        localStorage.setItem("avatar", data.avatar);
        localStorage.setItem("name", data.name);
        localStorage.setItem("department", data.department);
        localStorage.setItem("primaryDegree", data.primaryDegree);

        if (data.role === "ADMIN") {
          setTimeout(() => {
            navigate("/admin");
          }, 500);
        } else {
          setTimeout(() => {
            navigate("/");
          }, 500);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          btnPointer.removeAttribute("disabled");
          btnPointer.innerHTML = "Login";
        }, 1000);
        setLoginInvalid(true);
        console.log(error);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  // main component
  return (
    <Box
      sx={{
        margin: "-10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "40%",
          height: "100vh",
        }}
      >
        <WelcomeCarousel />
      </Box>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          width: "60%",
        }}
      >
        <LogoComponent width="50%" />
        <Box sx={{ margin: "50px" }}>
          <Typography
            sx={{ marginBottom: "10px", fontWeight: "700", fontSize: "40px" }}
          >
            Welcome Back!
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Typography
              color="text.secondary"
              sx={{
                marginTop: "10px",
                fontSize: "17px",
              }}
            >
              Are you new here?
            </Typography>
            <SignUpDialog />
          </Box>
          <FormControl sx={{ marginTop: "20px" }} fullWidth>
            <InputLabel>I am a...</InputLabel>
            <Select
              data-testid="status-input"
              name="status"
              label="I am a..."
              onChange={handleLoginInfo}
            >
              <MenuItem value={"student"}>Student</MenuItem>
              <MenuItem value={"admin"}>Administrator</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ alignItems: "center" }}>
            <TextField
              sx={{ marginTop: "20px", width: "100%" }}
              label="Username"
              variant="outlined"
              name="username"
              onChange={handleLoginInfo}
            ></TextField>
            <TextField
              sx={{ marginTop: "20px", width: "100%" }}
              label="Password"
              name="password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              onChange={handleLoginInfo}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      data-testid="password-visibility-button"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? (
                        <VisibilityRoundedIcon />
                      ) : (
                        <VisibilityOffRoundedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <Box
              sx={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "17px" }} color="text.secondary">
                <Link component={Link} to="/student/sign-up">
                  Forgot Password?
                </Link>
              </Typography>
              <Button
                variant="contained"
                data-testid="login-button"
                id="login-btn"
                disabled={!allowLogin}
                onClick={submitLoginForm}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={loginError}
        autoHideDuration={3000}
        onClose={() => setLoginError(false)}
      >
        <Alert
          onClose={() => setLoginError(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%", color: "white" }}
        >
          Sign in failed. Please try again after some time.
        </Alert>
      </Snackbar>
      <Snackbar
        open={loginSuccess}
        autoHideDuration={3000}
        onClose={() => setLoginSuccess(false)}
      >
        <Alert
          onClose={() => setLoginSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%", color: "white" }}
        >
          Signed in successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={loginInvalid}
        autoHideDuration={3000}
        onClose={() => setLoginInvalid(false)}
      >
        <Alert
          onClose={() => setLoginInvalid(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%", color: "white" }}
        >
          Invalid username or password!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignInPage;
