//COMPLETE
// add recovery email for password reset field
// add admin sign-in feature
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  Card,
  CardContent,
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
  DialogActions,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { LogoComponent } from "./StyledComponents";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignInPage = () => {
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

  const accessStudentSignUp = () => {
    setOpenDialog(false);
    navigate("/student/sign-up-step-one");
  };

  const accessAdminSignUp = () => {
    setOpenDialog(false);
    navigate("/admin/sign-up");
  };

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
        localStorage.setItem("user-token", token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", data.userId);

        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // main component
  return (
    <Box
      sx={{
        margin: "-8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${process.env.PUBLIC_URL}/signin_background.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "110vh",
      }}
    >
      <LogoComponent />
      <Box
        sx={{
          justifyItems: "center",
          alignItems: "center",
          marginTop: "20px",
          width: "60%",
        }}
      >
        <Card sx={{ borderRadius: "10px", boxShadow: 1 }}>
          <CardContent sx={{ margin: "20px" }}>
            <Typography sx={{ fontWeight: "700" }} variant="h3">
              Hello There!
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                marginTop: "10px",
                fontSize: "17px",
              }}
            >
              Are you new here?
              <Button
                color="success"
                sx={{ marginLeft: "10px", color: "white" }}
                variant="contained"
                onClick={handleOpenDialog}
              >
                Get Started.
              </Button>
              <Dialog
                minWidth="md"
                sx={{ borderRadius: "10px" }}
                open={openDialog}
                onClose={handleCloseDialog}
              >
                <DialogTitle>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "30px", fontWeight: 700 }}>
                      I am a...
                    </Typography>
                    <IconButton color="error" onClick={handleCloseDialog}>
                      <CloseRoundedIcon sx={{ fontSize: "30px" }} />
                    </IconButton>
                  </Box>
                </DialogTitle>
                <DialogContent>
                  <Box
                    sx={{
                      width: "50ch",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Button onClick={accessStudentSignUp} variant="contained">
                      Student
                    </Button>
                    <Button
                      onClick={accessAdminSignUp}
                      sx={{ marginTop: "20px" }}
                      variant="outlined"
                    >
                      Administrator
                    </Button>
                  </Box>
                </DialogContent>
              </Dialog>
            </Typography>
            <FormControl sx={{ marginTop: "20px" }} fullWidth>
              <InputLabel>I am a...</InputLabel>
              <Select
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
                  <Link component={Link} to="/student/sign-up-step-one">
                    Forgot Password?
                  </Link>
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember Me"
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
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SignInPage;
