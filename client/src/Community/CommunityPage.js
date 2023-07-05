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
  Pagination,
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
      <Typography
        sx={{ marginBottom: "20px", fontSize: "40px", fontWeight: 700 }}
      >
        All Posts
      </Typography>
      <Grid container spacing={7}>
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
          marginTop: "10px",
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
export const SortAndFilter = (props) => {
  const { setFilterValue, setSortValue } = props;
  return (
    <div>
      <FormControl>
        <InputLabel variant="standard">Sort By</InputLabel>
        <NativeSelect
          onChange={(e) => {
            setSortValue(e.target.value);
          }}
        >
          <option value={"none"}>None</option>
          <option value={"timestamp"}>Latest</option>
          <option value={"likes"}>Most Popular</option>
        </NativeSelect>
      </FormControl>
      <FormControl sx={{ marginLeft: "20px" }}>
        <InputLabel variant="standard">Filter By</InputLabel>
        <NativeSelect
          variant="standard"
          onChange={(e) => {
            setFilterValue(e.target.value);
          }}
        >
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
  const [topPostList, setTopPostList] = useState([]);
  const postSearchAPI = `${process.env.REACT_APP_API_LINK}/post/search`;
  const postGetTopAPI = `${process.env.REACT_APP_API_LINK}/post/top`;

  useEffect(() => {
    console.log([sortValue, filterValue]);
    axios
      .post(postSearchAPI, {
        sortValue: sortValue,
        filterValue: filterValue,
      })
      .then((res) => {
        console.log(res.data.postList);
        setPostList(res.data.postList);
        setPostReceived(true);
      })
      .catch((err) => console.log(err));
  }, [page, sortValue, filterValue]);

  const handleTopPost = () => {
    // Default of getting top post in last week, open further for day, month, year and all-time
    axios
      .post(postGetTopAPI, {
        timePeriod: 7 * 24 * 60 * 60 * 1000,
      })
      .then((res) => {
        console.log(res.data.topPostList);
        setTopPostList(res.data.topPostList);
      })
      .catch((err) => console.log(err));
  };
  useEffect(handleTopPost, []);
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
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <SearchBar
            label="Search post titles or tags..."
            searchRecommendations={postRecommendations} // to keep a list of all post tags/ post titles. search component is autocomplete
            width="70ch"
          />
          <Box sx={{ marginTop: "20px" }}>
            <SortAndFilter
              setSortValue={setSortValue}
              setFilterValue={setFilterValue}
            />
          </Box>
        </Box>
        <PostsRow postList={samplePosts} title="Top Posts" />
        {(!postReceived || postList == undefined) && (
          <Box sx={{ marginTop: "100px", marginBottom: "150px" }}>
            <NoPostsPlaceholder />
          </Box>
        )}
        {postReceived && <PostsGrid postList={postList} />}
        <Box
          sx={{
            marginBottom: "5ch",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
          }}
        >
          <BackToTop />
          <Pagination sx={{ marginLeft: "50px" }} count={10} color="primary" />
        </Box>
      </Box>
    </div>
  );
};

export default CommunityPage;
