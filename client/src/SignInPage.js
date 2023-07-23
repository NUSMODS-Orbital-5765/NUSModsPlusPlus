//COMPLETE
// add recovery email for password reset field
// add admin sign-in feature
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
  FormControlLabel,
  InputLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { LogoComponent, WelcomeCarousel } from "./StyledComponents";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

  // handle login function, disable login button if any of the fields are empty
  const handleLoginInfo = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setloginInfo((prevLoginInfo) => ({
      // this ensures state is updated immediately rather than asynchronously
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
          alert("Unable to login. Please try after some time.");
          return;
        }
        alert("Login Successfully");
        console.log(data);
        localStorage.clear();
        localStorage.setItem("permission", loginInfo.status)
        localStorage.setItem("user-token", token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("role", data.role);
        localStorage.setItem("avatar", data.avatar);

        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        alert(error);
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
            <Select name="status" label="I am a..." onChange={handleLoginInfo}>
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
                      aria-label="toggle password visibility"
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
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Remember Me" // haven't included the "remember me" info
                />
                <Button
                  variant="contained"
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
      </Box>
    </Box>
  );
};

export default SignInPage;
