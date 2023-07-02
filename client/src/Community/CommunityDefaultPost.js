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
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
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
// styling for post preview
export const CommunityPostDialog = (props) => {
  const post = props.post;
  const openCondition = props.openCondition;
  const closeFunction = props.closeFunction;
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
                color: "#536DFE",
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
            multiline
            maxRows={4}
          ></TextField>
          <Button variant="contained">Post</Button>
        </Box>
        <CommunityPostComments commentsList={sampleComments} />
      </DialogContent>
    </Dialog>
  );
};

// code for each post
const CommunityDefaultPost = (props) => {
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
                  sx={{ fontSize: "30px", color: "#536DFE" }}
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
