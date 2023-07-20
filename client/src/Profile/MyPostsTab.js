import { Box, Typography } from "@mui/material";
import PostsList from "../Community/PostsList";
import { SortAndFilter } from "../Community/CommunityPage";
import axios from "axios";
import AWSLinkGenerate from "../libs/AWSLinkGenerate";
import { NoPostsPlaceholder } from "../Community/CommunityPage";
import React, { useState, useEffect } from "react";

const MyPostsTab = ({ postList }) => {
  const [postReceived, setPostReceived] = useState(false);
  const [myPostsList, setMyPostsList] = useState(postList);

  const [sortValue, setSortValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const postSearchAPI = `${process.env.REACT_APP_API_LINK}/post/search`;
  const postGetDetail = {
    sortValue: sortValue,
    filterValue: filterValue,
  };

  useEffect(() => {
    axios.post(postSearchAPI, postGetDetail);
  });

  useEffect(() => {
    console.log([sortValue, filterValue]);
    axios
      .post(postSearchAPI, {
        sortValue: sortValue,
        filterValue: filterValue,
      })
      .then((res) => {
        console.log(res.data.postList);
        setMyPostsList(res.data.postList);
        setPostReceived(true);
      })
      .catch((err) => console.log(err));
  }, [sortValue, filterValue]);

  return (
    <Box sx={{ margin: "55px", marginTop: "-20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
          My Posts
        </Typography>
        <SortAndFilter
          setFilterValue={setFilterValue}
          setSortValue={setSortValue}
        />
      </Box>
      {!postReceived || postList == undefined ? (
        <Box sx={{ marginTop: "100px", marginBottom: "150px" }}>
          <NoPostsPlaceholder />
        </Box>
      ) : (
        <PostsList postList={myPostsList} />
      )}
    </Box>
  );
};

export default MyPostsTab;
