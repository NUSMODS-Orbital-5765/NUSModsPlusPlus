//COMPLETE
import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../Drawer/DrawerComponent";
import HomePageShortcuts from "./HomePageShortcuts";
import { Typography, Box, Button, Avatar } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { sampleProfile, quotesList } from "../Constants";
import React, { useEffect, useState } from "react";
import HomePageProgressBar from "./HomePageProgressBar";
import HomePageRecommendedPosts from "./HomePageRecommendedPosts";
import { combinedItems } from "./HomePageStyledComponents";
import axios from "axios";
import HomePageTimetable from "./HomePageTimetable";

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

  const [userFullName, setUserFullName] = useState("");
  useEffect(() => {
    const getNameAPI = `${process.env.REACT_APP_API_LINK}/homepage/get-name`;

    axios
      .post(getNameAPI, { userId: localStorage.getItem("userId") })
      .then((response) => {
        if (response.data && response.data.res) {
          setUserFullName(response.data.res.name);
        }
        //useNavigate need to be initalise at top
        setUserFullName(response.data.res.name);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <div className="homepage">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppBarComponent data-testid="app-bar" />
        <DrawerComponent
          data-testid="drawer"
          defaultTab={1}
          tabsList={combinedItems}
        />
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
                Welcome Back, {userFullName}
              </Typography>
              <Typography
                sx={{
                  margin: "30px",
                  marginTop: "-10px",
                  fontSize: "17px",
                  color: "#004d80",
                }}
              >
                <span data-testid="quote-text">{quotesList[currentQuote]}</span>
              </Typography>
              <Button
                sx={{ margin: "30px", marginTop: "-10px" }}
                variant="contained"
                onClick={showNextQuote}
                data-testid="quote-button"
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
              <HomePageProgressBar data-testid="home-page-progress-bar" />
            </Box>
            <Box sx={{ width: "50%" }}>
              <HomePageRecommendedPosts data-testid="home-page-recommended-posts" />
            </Box>
          </Box>
          <HomePageTimetable data-testid="home-page-timetable" />
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default HomePage;
// use event context to keep quote of the day even when u switch to another tab and switch back
