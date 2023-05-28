import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import HomePage from "./HomePage";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [currentPage, setCurrentPage] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    setCurrentPage(true);
  };

  if (currentPage) {
    return <HomePage />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${process.env.PUBLIC_URL}/signin-background.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <img src="nusmods.png" style={{ width: "30%" }} />
      <Typography sx={{ marginTop: "-15px", fontSize: "20px" }}>
        A new way to plan
      </Typography>
      <Box sx={{ marginTop: "20px", maxWidth: "900px" }}>
        <Card sx={{ margin: "auto" }}>
          <CardContent>
            <Typography sx={{ fontWeight: "700" }} variant="h3">
              Hello There!
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "17px" }}>
              Don't have an account? <Link>Get Started.</Link>
            </Typography>
            <Box sx={{ alignItems: "center" }}>
              <TextField
                sx={{ marginTop: "20px", width: "100ch" }}
                label="Username"
                variant="outlined"
              ></TextField>
              <TextField
                sx={{ marginTop: "20px", width: "100ch" }}
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
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
            </Box>
            <CardActions sx={{ marginBottom: "-5px", marginTop: "5px" }}>
              <Button onClick={handleLogin} size="large">
                Login
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SignInPage;
