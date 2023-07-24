import { Box, Typography } from "@mui/material";
import PostsList from "../Community/PostsList";
import { useEffect, useState } from "react";
import axios from "axios";

const LikedPostsTabFrame = ({ postList }) => {
  return (
    <Box sx={{ margin: "55px", marginTop: "-20px" }}>
      <Typography
        sx={{ fontSize: "35px", fontWeight: 700, marginBottom: "10px" }}
      >
        Liked Posts
      </Typography>
      <PostsList postList={postList} />
    </Box>
  );
};
const LikedPostsTab = () => {
  const [postList, setPostList] = useState();
  const [isFetch, setIsFetch] = useState(false)
  const postSearchAPI = `${process.env.REACT_APP_API_LINK}/post/search`;
  useEffect(()=>{
    axios
      .post(postSearchAPI, {
        sortValue: "timestamp",
        filterValue: "",
        likedByUsername: localStorage.getItem("username")
      })
      .then((res) => {
        console.log(res.data.postList);
        setPostList(res.data.postList);
        setIsFetch(true);
      })
      .catch((err) => console.log(err))},[])
  return (isFetch &&
  <LikedPostsTabFrame postList={postList}/>
  )
}
export default LikedPostsTab;
