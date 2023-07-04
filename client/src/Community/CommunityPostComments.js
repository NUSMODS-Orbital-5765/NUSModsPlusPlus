// code for post comments
import { useEffect } from "react";
import { formatDate } from "../Constants";
import { Box, Typography, Avatar } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import AWSLinkGenerate from "../libs/AWSLinkGenerate";
const CommunityPostComments = (props) => {
  const { postId, commentAddStatus } = props;

  const [commentsList, setCommentsList] = useState([]);

  const commentGetAPI = `${process.env.REACT_APP_API_LINK}/post/get-comment`;
  useEffect(() => {
    axios
      .post(commentGetAPI, {
        postId: postId,
      })
      .then((res) => {
        console.log(res.data.commentsList);
        setCommentsList(res.data.commentsList);
      })
      .catch((err) => console.log(err));
  }, [commentAddStatus]);

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
            <Avatar
              key={index}
              alt={comment.author.username}
              src={AWSLinkGenerate(comment.author.avatar)}
            />
            <Typography sx={{ fontWeight: 600, marginLeft: "10px" }}>
              {comment.author.username}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                marginLeft: "30px",
                color: "#19a0ff",
              }}
            >
              {formatDate(new Date(comment.dateCreated))}
            </Typography>
          </Box>
          <Box
            sx={{
              marginLeft: "20px",
              borderLeft: "3px solid #19a0ff",
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
