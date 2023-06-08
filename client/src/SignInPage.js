//COMPLETE
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
import React, { useState } from "react";
import LogoComponent from "./LogoComponent";
import { Link } from "react-router-dom";

const SignInPage = () => {
  //settings for toggling password visibility
  const [showPassword, setShowPassword] = useState(true);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
      <Box sx={{ marginTop: "20px", maxWidth: "900px" }}>
        <Card sx={{ margin: "auto", elevation: 4 }}>
          <CardContent sx={{ margin: "10px", marginBottom: "-10px" }}>
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
              <Button size="large" component={Link} to="/">
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
