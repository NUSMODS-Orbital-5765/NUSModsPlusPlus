import { Box, Typography } from "@mui/material";
import PostsList from "../Community/PostsList";
import { SortAndFilter } from "../Community/CommunityPage";

const MyPostsTab = ({ postList }) => {
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
        <SortAndFilter />
      </Box>
      <PostsList postList={postList} />
    </Box>
  );
};

export default MyPostsTab;
