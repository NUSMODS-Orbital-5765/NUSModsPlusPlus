//COMPLETE
import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../DrawerComponent";
import UploadPost from "../UploadPost/UploadPost";
import CommunityDefaultPost from "./CommunityDefaultPost";
import {
  Box,
  FormControl,
  NativeSelect,
  InputLabel,
  Grid,
} from "@mui/material";
import {
  postRecommendations,
  samplePosts,
  samplePostsTags,
} from "../Constants";
import { PageHeader, BackToTop, SearchBar } from "../StyledComponents";
import React from "react";

// mapping posts onto a grid design
export const PostsGrid = ({ postsList }) => {
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
          <CommunityDefaultPost post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

// styling for sort and filter features
export const SortAndFilter = () => {
  return (
    <div>
      <FormControl>
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
        <PageHeader
          header="Community"
          subtitle={
            <div>
              A collection of the best study resources, by{" "}
              <span style={{ color: "#536DFE" }}>you</span>, for{" "}
              <span style={{ color: "#536DFE" }}>you</span>.
            </div>
          }
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Box sx={{ marginRight: "20px" }}>
            <SearchBar
              label="Search post titles or tags..."
              searchRecommendations={postRecommendations}
              width="70ch"
            />
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
          <SortAndFilter />
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
