//COMPLETE
import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./DrawerComponent";
import UploadPost from "./UploadPost";
import DefaultPostCard from "./DefaultPostCard";
import {
  Typography,
  Box,
  TextField,
  IconButton,
  FormControl,
  NativeSelect,
  InputLabel,
  Fab,
  Tooltip,
  Grid,
} from "@mui/material";
import { samplePosts } from "./Constants";
import React, { useState, useEffect } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

// mapping posts onto a grid design
const PostsGrid = ({ postsList }) => {
  return (
    <Grid
      sx={{
        marginLeft: "-55ch",
        marginTop: "-12ch",
        padding: "15ch",
      }}
      container
      spacing={2}
    >
      {postsList.map((post, index) => (
        <Grid item xs={6} key={index}>
          <DefaultPostCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

// back to top button
export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <Tooltip title="Back to Top" placement="top">
          <Fab color="primary" onClick={scrollToTop}>
            <ArrowUpwardRoundedIcon sx={{ fontSize: "30px" }} />
          </Fab>
        </Tooltip>
      )}
    </div>
  );
};

// styling for main page
const CommunityPage = () => {
  return (
    <div className="homepage">
      <AppBarComponent />
      <DrawerComponent defaultTab={5} />
      <Box
        className="remainingViewport"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography
            sx={{
              marginTop: "150px",
              fontSize: "50px",
              fontWeight: "700",
            }}
          >
            Community
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: "16px",
              fontWeight: 200,
            }}
          >
            A collection of the best study resources, by{" "}
            <span style={{ color: "#536DFE" }}>you</span>, for{" "}
            <span style={{ color: "#536DFE" }}>you</span>.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton sx={{ marginTop: "40px" }}>
              <SearchRoundedIcon />
            </IconButton>
            <TextField
              sx={{
                width: "70ch",
                marginTop: "20px",
                borderRadius: "5px",
              }}
              variant="standard"
              label="Search post titles or tags..."
            ></TextField>
          </Box>
          <UploadPost />
        </Box>
        <Box
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ marginLeft: "-300px" }}>
            <InputLabel variant="standard">Sort By</InputLabel>
            <NativeSelect>
              <option value={"none"}>None</option>
              <option value={"timestamp"}>Latest</option>
              <option value={"likes"}>Most Popular</option>
            </NativeSelect>
          </FormControl>
          <FormControl sx={{ marginLeft: "20px" }}>
            <InputLabel variant="standard">Filter By</InputLabel>
            <NativeSelect variant="standard">
              <option value={"none"}>None</option>
              <option value={"liked"}>Liked</option>
              <optgroup label="Post Category">
                <option value={"study guide"}>Study Guide</option>
                <option value={"module review"}>Module Review</option>
                <option value={"notes"}>Notes</option>
              </optgroup>
            </NativeSelect>
          </FormControl>
        </Box>
        <PostsGrid postsList={samplePosts} />
        <Box
          sx={{
            marginTop: "-10ch",
            marginBottom: "5ch",
          }}
        >
          <BackToTop />
        </Box>
      </Box>
    </div>
  );
};

export default CommunityPage;
