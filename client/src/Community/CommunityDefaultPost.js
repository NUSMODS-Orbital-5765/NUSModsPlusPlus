//COMPLETE
// TODO: see "my posts" under profile
// TODO: view user profile on clicking avatar
// TODO: insert liked posts
// TODO: make the tags clickable so users can see other posts with the same tag
import {
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Chip,
  Avatar,
  IconButton,
  Button,
  Grow,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Checkbox,
  TextField,
  Slide,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useState, useEffect } from "react";
import { SlideUpTransition } from "../StyledComponents";
import { sampleComments } from "../Constants";
import { createPortal } from "react-dom";
import { formatDate } from "../Constants";
import CommunityPostComments from "./CommunityPostComments";
import AWSLinkGenerate from "../libs/AWSLinkGenerate";
import axios from "axios";
import generateNotification from "../libs/generateNotification";
// styling for post preview
export const CommunityPostDialog = (props) => {
  const post = props.post;
  const openCondition = props.openCondition;
  const closeFunction = props.closeFunction;

  const [commentContent, setCommentContent] = useState(1);
  const [commentAddStatus, setCommentAddStatus] = useState(0);
  const commentAddAPI = `${process.env.REACT_APP_API_LINK}/post/add-comment`;
  const handleAddComment = () => {
    if (commentContent === "") {
      alert("Empty Comment");
    } else {
      axios
        .post(
          commentAddAPI,
          {
            content: commentContent,
            dateCreated: new Date(),
            author: localStorage.getItem("userId"),
            postId: post.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          alert("Successfully add comment");
          setCommentAddStatus(commentAddStatus + 1);
          console.log(commentAddStatus);
          generateNotification("comment", localStorage.getItem("username"), post.author.username,commentContent, {postId: post.id})
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <Dialog
      open={openCondition}
      maxWidth="md"
      TransitionComponent={SlideUpTransition}
    >
      <DialogTitle sx={{ margin: "30px", marginBottom: "0px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "#1a90ff",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {formatDate(new Date(post.dateCreated))}
            </Typography>
            <Tooltip title="Close" placement="top">
              <IconButton onClick={closeFunction}>
                <CloseRoundedIcon color="error" sx={{ fontSize: "30px" }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography sx={{ fontSize: "40px", fontWeight: 700 }}>
            {post.title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ marginLeft: "30px", marginRight: "30px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Chip
            sx={{ padding: "5px", fontSize: "15px" }}
            avatar={
              <Avatar
                alt="ProfilePic"
                src={AWSLinkGenerate(post.author.avatar)}
              />
            }
            label={post.author.username}
            variant="filled"
          />
          <Chip
            sx={{ marginLeft: "20px", padding: "5px", fontSize: "15px" }}
            label={post.category}
            color="primary"
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 700, textTransform: "uppercase" }}>
            Related:
          </Typography>
          {post.tags.map((tag, index) => (
            <Chip
              sx={{ marginLeft: "20px" }}
              variant="filled"
              color="primary"
              label={tag}
              key={index}
            />
          ))}
        </Box>
        <Box sx={{ marginTop: "30px", marginBottom: "30px" }}>
          <Typography>{post.content}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
            marginBottom: "30px",
          }}
        >
          <Button variant="contained" disabled={!post.upload_file}>
            Preview File
          </Button>
          {post.upload_file && (
            <Typography sx={{ marginLeft: "20px", fontWeight: 600 }}>
              {AWSLinkGenerate(post.upload_file)}
            </Typography>
          )}
        </Box>
        <Divider role="presentation"></Divider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "20px",
            marginBottom: "20px",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Avatar alt="Sample Icon" src="sample_icon.png" />
          <TextField
            sx={{ marginLeft: "20px", marginRight: "20px", width: "80%" }}
            variant="filled"
            label="Add a comment..."
            onChange={(e) => setCommentContent(e.target.value)}
            multiline
            maxRows={4}
          ></TextField>
          <Button variant="contained" onClick={handleAddComment}>
            Post
          </Button>
        </Box>
        <CommunityPostComments
          postId={post.id}
          commentAddStatus={commentAddStatus}
        />
      </DialogContent>
    </Dialog>
  );
};

// code for each post
const CommunityDefaultPost = (props) => {
  const post = props.post;
  const likedList = post.like;
  const localUsername = localStorage.getItem("username")
  const [totalLikes, setTotalLikes] = useState(post.likeAmount)
  const [extensionOpen, setExtensionOpen] = useState(false);
  const [arrowDirection, setArrowDirection] = useState("down");
  const [liked, setLiked] = useState(likedList.includes("username"));
  const [viewed, setViewed] = useState(false);
  
  // function for toggling the like button (need to update in database)
  const toggleLiked = (event) => {
    const LikePostAPI = `${process.env.REACT_APP_API_LINK}/post/like`;
    axios
    .post(
      LikePostAPI,
      {
        username: localUsername,
        postId: post.id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      }
    )
    .then(result => {
      console.log(result.data)
      post.likeAmount=result.data.likeAmount
      setLiked(!liked)
      generateNotification("like",localStorage.getItem("username"),post.author.username,"","")
    })
    
  };

  // function for viewing the tags for each post
  const toggleExtensionOpen = (event) => {
    setExtensionOpen(!extensionOpen);
    setArrowDirection(extensionOpen ? "down" : "up");
  };

  // function for viewing post details
  const [viewPost, setViewPost] = useState(false);
  const handleOpenViewPost = () => {
    setViewPost(true);
    setViewed(true);
  };

  const handleCloseViewPost = () => {
    setViewPost(false);
  };

  // how post looks like on screen
  return (
    <div>
      <Card
        sx={{
          width: "100%",
          height: "100%",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          border: "1px solid #f2f2f2",
        }}
      >
        <CardContent
          sx={{
            opacity: viewed ? 0.5 : 1,
            margin: "7px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "#1a90ff",
                fontWeight: 600,
                fontSize: "14px",
                textTransform: "uppercase",
              }}
            >
              {formatDate(new Date(post.dateCreated))}
            </Typography>
            <Tooltip title="See More" placement="top">
              <IconButton
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                    transform: "translateX(5px)",
                    transition: "transform 0.1s",
                  },
                }}
                onClick={handleOpenViewPost}
              >
                <ArrowForwardRoundedIcon
                  color="primary"
                  sx={{ fontSize: "30px" }}
                />
              </IconButton>
            </Tooltip>
            {viewPost &&
              createPortal(
                <CommunityPostDialog
                  post={post}
                  openCondition={viewPost}
                  closeFunction={handleCloseViewPost}
                />,
                document.body
              )}
          </Box>
          <Typography
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
              color: "text.primary",
              fontWeight: 600,
              fontSize: "30px",
            }}
          >
            {post.title}
          </Typography>
          <Box
            sx={{
              marginBottom: "20px",
              display: "flex",
              flexDirection: "row",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <Checkbox
                onClick={e=>toggleLiked(e)}
                defaultChecked={liked}
                icon={<FavoriteBorderRoundedIcon />}
                checkedIcon={<FavoriteRoundedIcon />}
              />
              <Typography sx={{ marginLeft: "-5px" }}>
                {post.likeAmount}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyItems: "center",
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              <Tooltip title="You have to view the post to comment.">
                <CommentRoundedIcon color="primary" />
              </Tooltip>
              <Typography sx={{ marginLeft: "5px" }}>
                {post.comments}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Chip
              sx={{ marginTop: "10px" }}
              avatar={
                <Avatar
                  alt="ProfilePic"
                  src={AWSLinkGenerate(post.author.avatar)}
                />
              }
              label={post.author.username}
              variant="filled"
            />
            <Chip
              sx={{ marginTop: "10px", marginLeft: "20px" }}
              label={post.category}
              color="primary"
              variant="outlined"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                marginBottom: "-20px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <Tooltip title="Expand to See Tags" placement="top">
                <IconButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                      transform: "translateY(5px)",
                      transition: "transform 0.1s",
                    },
                  }}
                  onClick={toggleExtensionOpen}
                >
                  <ExpandMoreRoundedIcon
                    sx={{
                      fontSize: "30px",
                      color: "text.primary",
                      transform: `rotate(${
                        arrowDirection === "down" ? 0 : 180
                      }deg)`,
                      transition: "transform 0.3s",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            {extensionOpen && (
              <Box
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyItems: "center",
                }}
              >
                <TransitionGroup>
                  {post.tags.map((tag, index) => (
                    <Grow
                      in={true}
                      style={{ transitionDelay: `${50 * index}ms` }}
                      key={index}
                    >
                      <Chip
                        sx={{ margin: "10px" }}
                        variant="filled"
                        color="primary"
                        label={tag}
                      />
                    </Grow>
                  ))}
                </TransitionGroup>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityDefaultPost;
