//COMPLETE
// TODO: see liked posts
// TODO: see "my posts" under profile
// TODO: view user profile on clicking avatar
// TODO: insert liked posts
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
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import React, { useState } from "react";

// code for mapping all the posts
const DefaultPostCard = (props) => {
  const post = props.post;
  const [extensionOpen, setExtensionOpen] = useState(false);
  const [arrowDirection, setArrowDirection] = useState("down");
  const [liked, setLiked] = useState(false);

  // const for date formatting (feel free to change if nec)
  const options = { month: "short", day: "numeric", year: "numeric" };
  function formattedDate(date) {
    return date.toLocaleDateString("en-US", options);
  }

  const toggleLiked = (event) => {
    setLiked(!liked);
  };

  const toggleExtensionOpen = (event) => {
    setExtensionOpen(!extensionOpen);
    setArrowDirection(extensionOpen ? "down" : "up");
  };

  return (
    <div className="remainingViewport">
      <Card
        sx={{
          width: "100%",
          height: "100%",
          boxShadow: 0,
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <CardContent
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                fontSize: "14px",
                textTransform: "uppercase",
              }}
            >
              {formattedDate(post.timestamp).toString()}
            </Typography>
            <Button
              variant="contained"
              sx={{ fontSize: "14px", marginLeft: "20px" }}
            >
              View
            </Button>
          </Box>
          <Typography
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
              color: "text.primary",
              fontWeight: 400,
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
              <IconButton
                onClick={toggleLiked}
                sx={{
                  marginRight: "5px",
                  color: "text.primary",
                }}
              >
                {liked ? (
                  <FavoriteRoundedIcon />
                ) : (
                  <FavoriteBorderRoundedIcon />
                )}
              </IconButton>
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
            <IconButton
              sx={{
                marginBottom: "-20px",
              }}
              onClick={toggleExtensionOpen}
            >
              <ExpandMoreRoundedIcon
                sx={{
                  color: "text.primary",
                  transform: `rotate(${
                    arrowDirection === "down" ? 0 : 180
                  }deg)`,
                  transition: "transform 0.3s",
                }}
              />
            </IconButton>
            {extensionOpen && (
              <Box sx={{ marginTop: "10px" }}>
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

const PostsGrid = ({ postsList }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "-200px", // i have no idea why the boxes are misaligned
      }}
    >
      {postsList.map((post, index) => (
        <DefaultPostCard post={post} />
      ))}
    </Box>
  );
};

export default PostsGrid;
