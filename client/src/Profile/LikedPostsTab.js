import { Box, Typography } from "@mui/material";
import PostsList from "../Community/PostsList";

// for liked posts, dunno whether to sort based on most recently liked (i.e. every time a post is liked, add it to the LikedPosts array and sort descending)
// or sort based on dateCreated of the liked post (most recently created posts at the top)
const LikedPostsTab = ({ postList }) => {
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

export default LikedPostsTab;
