import { Box, Typography } from "@mui/material";
import PostsList from "../Community/PostsList";
import { SortAndFilter } from "../Community/CommunityPage";
import { useEffect, useState } from "react";
import axios from "axios"
const MyPostsTabFrame = (props) => {
  const {postList, setFilterValue, setSortValue} = props;
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
        <SortAndFilter setFilterValue={setFilterValue} setSortValue={setSortValue} />
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

const MyPostsTab = () => {
  const [postList, setPostList] = useState();
  const [isFetch, setIsFetch] = useState(false)
  const [sortValue, setSortValue] = useState();
  const [filterValue, setFilterValue] = useState()
  const postSearchAPI = `${process.env.REACT_APP_API_LINK}/post/search`;
  useEffect(()=>{
    axios
      .post(postSearchAPI, {
        sortValue: sortValue,
        filterValue: filterValue,
        username: localStorage.getItem("username")
      })
      .then((res) => {
        console.log(res.data.postList);
        setPostList(res.data.postList);
        setIsFetch(true);
      })
      .catch((err) => console.log(err))
    console.log([sortValue, filterValue])}
    ,[sortValue, filterValue])
  return (   
  isFetch &&
  <MyPostsTabFrame postList={postList} setFilterValue={setFilterValue} setSortValue={setSortValue} />
  )
}
export default MyPostsTab;
