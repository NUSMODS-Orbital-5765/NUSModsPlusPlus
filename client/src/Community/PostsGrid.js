// mapping posts onto a grid design
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import CommunityDefaultPost from "./CommunityDefaultPost";

const PostsGrid = ({ postList }) => {
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
export default PostsGrid;
