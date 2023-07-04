//COMPLETE
import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../DrawerComponent";
import UploadPost from "../UploadPost/UploadPost";
import CommunityDefaultPost from "./CommunityDefaultPost";
import axios from "axios";
import AWSLinkGenerate from "../libs/AWSLinkGenerate";
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

// page header (which contains upload post)
export const CommunityHeader = () => {
  return (
    <Box
      sx={{
        margin: "55px",
        marginTop: "20px",
        marginBottom: "20px",
        borderRadius: "10px",
        backgroundColor: "#e7f2ff",
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ margin: "30px", display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            fontSize: "40px",
            fontWeight: 700,
            color: "#004d80",
          }}
        >
          The best study resources.
          <br />
          By you, for you.
        </Typography>
        <Box
          sx={{
            alignItems: "center",
            justifyItems: "center",
            marginTop: "30px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography sx={{ marginRight: "20px", color: "#004d80" }}>
            Make your first post today.
          </Typography>
          <UploadPost />
        </Box>
      </Box>
      <img style={{ margin: "20px", width: "30%" }} src="/learning_icon.png" />
    </Box>
  );
};

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
    <Box sx={{ margin: "55px" }}>
      <Grid container spacing={2}>
        {postList.map((post, index) => (
          <Grid item xs={6} key={index}>
            <CommunityDefaultPost post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// row of posts rather than the usual grid
// sort the posts before mapping as a postList
const PostsRow = ({ postList, title }) => {
  return (
    <Box sx={{ marginLeft: "55px", marginTop: "20px" }}>
      <Typography sx={{ fontSize: "40px", fontWeight: 700 }}>
        {title}
      </Typography>
      <Box
        sx={{
          overflowX: "scroll",
          marginRight: "55px",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          {postList.map((post, index) => (
            <Box
              key={index}
              sx={{
                minWidth: "50ch",
                margin: "10px",
                marginRight: "50px",
              }}
            >
              <CommunityDefaultPost post={post} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
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
          <option value={"study guide"}>Study Guide</option>
          <option value={"module review"}>Module Review</option>
          <option value={"notes"}>Notes</option>
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
  };

  useEffect(() => {
    axios
      .get(postGetAPI, postGetDetail)
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
        }}
      >
        <CommunityHeader />
        <Box
          sx={{
            marginLeft: "55px",
          }}
        >
          <SearchBar
            label="Search post titles or tags..."
            searchRecommendations={postRecommendations} // to keep a list of all post tags/ post titles. search component is autocomplete
            width="70ch"
          />
        </Box>
        <PostsRow postList={samplePosts} title="Top Posts" />
        <PostsRow postList={samplePosts} title="New in Computing" />
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
          <Box
            sx={{
              marginTop: "-10ch",
              marginBottom: "5ch",
            }}
          >
            <BackToTop />
          </Box>
        </Box>
        {(!postReceived || postList == undefined) && (
          <Box sx={{ marginTop: "100px", marginBottom: "150px" }}>
            <NoPostsPlaceholder />
          </Box>
        )}
      </Box>
      {postReceived && <PostsGrid postList={postList} />}
      {/* just for me to see what the posts look like, pls delete*/}
      <PostsGrid postList={samplePosts} />
    </div>
  );
};

export default CommunityPage;
