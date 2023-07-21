import { useEffect } from "react";
import CommunityDefaultPost from "./CommunityDefaultPost";
import { Box } from "@mui/material";

const PostsList = ({ postList }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
      }}
    >
      {postList.map((post, index) => (
        <Box sx={{ marginBottom: "40px" }}>
          <CommunityDefaultPost key={index} post={post} />
        </Box>
      ))}
    </Box>
  );
};

export default PostsList;
