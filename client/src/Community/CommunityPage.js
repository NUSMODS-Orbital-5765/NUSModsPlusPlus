//COMPLETE
import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../DrawerComponent";
import UploadPost from "../UploadPost/UploadPost";
import CommunityDefaultPost from "./CommunityDefaultPost";
import axios from "axios";
import AWSLinkGenerate from '../libs/AWSLinkGenerate';
import {
  Box,
  FormControl,
  NativeSelect,
  InputLabel,
  Grid,
  Typography,
} from "@mui/material";
import {
  postRecommendations,
  samplePosts,
  samplePostsTags,
} from "../Constants";
import { PageHeader, BackToTop, SearchBar } from "../StyledComponents";
import React, { useEffect, useState } from "react";
import HeartBrokenRoundedIcon from "@mui/icons-material/HeartBrokenRounded";

// no posts placeholder
export const NoPostsPlaceholder = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <HeartBrokenRoundedIcon
        sx={{ fontSize: "100px", color: "text.secondary" }}
      />
      <Typography
        sx={{ color: "text.secondary", fontSize: "50px", fontWeight: 700 }}
      >
        No Posts Yet
      </Typography>
    </Box>
  );
};
// mapping posts onto a grid design
export const PostsGrid = ({ postList }) => {
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
      {postList.map((post, index) => (
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
  const [page, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [postReceived, setPostReceived] = useState(false);
  const [postList, setPostList] = useState();
  const postGetAPI = `${process.env.REACT_APP_API_LINK}/post/get`;
  const postGetDetail = {
    page: 1,
    sortValue: sortValue,
    filterValue: filterValue,
  }

  useEffect(()=>{
    
    axios.get(postGetAPI,postGetDetail)
    .then((res) => {
      console.log(res.data.postList);
    setPostList(res.data.postList);
    setPostReceived(true);
    })
      .catch((err) => console.log(err));
  }, [page]);
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
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <SortAndFilter />
          {!postReceived&&<Box sx={{ marginTop: "100px", marginBottom: "150px" }}>
            <NoPostsPlaceholder />
          </Box>}
        </Box>
        {postReceived && <PostsGrid postList={postList} />}
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
