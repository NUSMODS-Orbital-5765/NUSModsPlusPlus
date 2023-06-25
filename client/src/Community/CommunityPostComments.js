// code for post comments
import { formatDate } from "../Constants";
import { Box, Typography, Avatar } from "@mui/material";

const CommunityPostComments = (props) => {
  const { commentsList } = props;
  return (
    <div>
      {commentsList.map((comment, index) => (
        <Box
          sx={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
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
            <Avatar key={index} alt={comment.author} src={comment.avatar} />
            <Typography sx={{ fontWeight: 600, marginLeft: "10px" }}>
              {comment.author}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                marginLeft: "30px",
                color: "#536DFE",
              }}
            >
              {formatDate(comment.timestamp)}
            </Typography>
          </Box>
          <Box
            sx={{
              marginLeft: "20px",
              borderLeft: "3px solid #536DFE",
              paddingLeft: "28px",
            }}
          >
            <Typography>{comment.content}</Typography>
          </Box>
        </Box>
      ))}
    </div>
  );
};

export default CommunityPostComments;
