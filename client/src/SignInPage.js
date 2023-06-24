//COMPLETE
// add recovery email for password reset field
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { LogoComponent } from "./StyledComponents";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignInPage = () => {
  const navigate = useNavigate();
  //settings for toggling password visibility
  const [showPassword, setShowPassword] = useState(true);
  const [loginInfo, setloginInfo] = useState({
    username: "",
    password: "",
  });
  const handleLoginInfo = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setloginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(loginInfo);
  }, [loginInfo]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
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
        height: "100vh",
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
        <Card sx={{ boxShadow: 1 }}>
          <CardContent sx={{ margin: "20px" }}>
            <Typography sx={{ fontWeight: "700" }} variant="h3">
              Hello There!
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "17px" }}>
              Don't have an account?{" "}
              <Link component={Link} to="/sign-up">
                Get Started.
              </Link>
            </Typography>
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
                  <Link component={Link} to="/sign-up">
                    Forgot Password?
                  </Link>
                </Typography>
                <Button
                  variant="contained"
                  id="login-btn"
                  onClick={submitLoginForm}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SignInPage;
