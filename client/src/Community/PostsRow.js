import CommunityDefaultPost from "./CommunityDefaultPost";
import { Box, Typography } from "@mui/material";

// row of posts rather than the usual grid
// sort the posts before mapping as a postList
const PostsRow = ({ postList }) => {
  return (
    <Box sx={{ marginLeft: "55px", marginTop: "20px" }}>
      <Typography sx={{ fontSize: "40px", fontWeight: 700 }}>
        Top Posts
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

export default PostsRow;
