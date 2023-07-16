//COMPLETE
import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../DrawerComponent";
import HomePageShortcuts from "./HomePageShortcuts";
import {
  Typography,
  Box,
  Button,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { sampleProfile, quotesList } from "../Constants";
import React, { useState } from "react";
import HomePageProgressBar from "./HomePageProgressBar";
import HomePageRecommendedPosts from "./HomePageRecommendedPosts";
import { combinedItems } from "./HomePageStyledComponents";

const HomePage = () => {
  // testing out the quotes for new UI
  const [currentQuote, setCurrentQuote] = useState(0);
  const showNextQuote = () => {
    if (currentQuote === quotesList.length - 1) {
      setCurrentQuote(0);
    } else {
      setCurrentQuote(currentQuote + 1);
    }
  };

  return (
    <div className="homepage">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppBarComponent />
        <DrawerComponent defaultTab={1} tabsList={combinedItems} />
        <Box
          className="remainingViewport"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              margin: "55px",
              marginTop: "20px",
              borderRadius: "10px",
              backgroundColor: "#e7f2ff",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  margin: "30px",
                  fontSize: "40px",
                  fontWeight: "700",
                  color: "#004d80",
                }}
              >
                Welcome Back, {sampleProfile.name}
              </Typography>
              <Typography
                sx={{
                  margin: "30px",
                  marginTop: "-10px",
                  fontSize: "17px",
                  color: "#004d80",
                }}
              >
                {quotesList[currentQuote]}
              </Typography>
              <Button
                sx={{ margin: "30px", marginTop: "-10px" }}
                variant="contained"
                onClick={showNextQuote}
              >
                Next quote
              </Button>
            </Box>
            <Avatar
              sx={{ width: "25ch", height: "25ch" }}
              alt="Sample Icon"
              src={sampleProfile.avatar}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              margin: "55px",
              marginTop: "-10px",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <HomePageProgressBar />
            </Box>
            <Box sx={{ width: "50%" }}>
              <HomePageRecommendedPosts />
            </Box>
          </Box>
        </Box>
        <HomePageShortcuts />
      </LocalizationProvider>
    </div>
  );
};

export default HomePage;
// use event context to keep quote of the day even when u switch to another tab and switch back
