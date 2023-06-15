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
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useState, useEffect } from "react";
import { SlideTransition } from "./StyledComponents";
import { sampleComments } from "./Constants";
import { formatDistanceToNow } from "date-fns";
import { createPortal } from "react-dom";

// function for date formatting (feel free to change if nec)
const formatDate = (dateTime) => {
  return formatDistanceToNow(dateTime, { addSuffix: true });
};

// code for post comments
export const PostComments = (props) => {
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

// styling for post preview
export const ViewPostDialog = (props) => {
  const post = props.post;
  const opencond = props.opencond;
  const closefunc = props.closefunc;
  return (
    <Dialog open={opencond} maxWidth="md" TransitionComponent={SlideTransition}>
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
                color: "#536DFE",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {formatDate(post.timestamp)}
            </Typography>
            <Tooltip title="Close" placement="top">
              <IconButton onClick={closefunc}>
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
            avatar={<Avatar alt="ProfilePic" src={post.avatar} />}
            label={post.author}
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
              {post.upload_file}
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
            multiline
            maxRows={4}
          ></TextField>
          <Button variant="contained">Post</Button>
        </Box>
        <PostComments commentsList={sampleComments} />
      </DialogContent>
    </Dialog>
  );
};

// code for each post
const DefaultPostCard = (props) => {
  const post = props.post;
  const [extensionOpen, setExtensionOpen] = useState(false);
  const [arrowDirection, setArrowDirection] = useState("down");
  const [liked, setLiked] = useState(false);
  const [viewed, setViewed] = useState(false);

  // function for toggling the like button (need to update in database)
  const toggleLiked = (event) => {
    setLiked(!liked);
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
    console.log(viewPost);
    setViewed(true);
  };

  const handleCloseViewPost = () => {
    setViewPost(false);
  };

  // how post looks like on screen
  return (
    <div className="remainingViewport">
      <Card
        sx={{
          width: "450px",
          height: "100%",
          boxShadow: 1,
          borderRadius: "5px",
          marginBottom: "30px",
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
                color: "#536DFE",
                fontWeight: 600,
                fontSize: "14px",
                textTransform: "uppercase",
              }}
            >
              {formatDate(post.timestamp)}
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
                  sx={{ fontSize: "30px", color: "#536DFE" }}
                />
              </IconButton>
            </Tooltip>
            {viewPost &&
              createPortal(
                <ViewPostDialog
                  post={post}
                  opencond={viewPost}
                  closefunc={handleCloseViewPost}
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
                onClick={toggleLiked}
                icon={<FavoriteBorderRoundedIcon />}
                checkedIcon={<FavoriteRoundedIcon />}
              />
              <Typography>{liked ? post.likes + 1 : post.likes}</Typography>
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
                <ForumRoundedIcon />
              </Tooltip>
              <Typography>{post.comments}</Typography>
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
              avatar={<Avatar alt="ProfilePic" src={post.avatar} />}
              label={post.author}
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

export default DefaultPostCard;
