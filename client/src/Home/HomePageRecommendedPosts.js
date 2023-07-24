import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Chip,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import { samplePosts, formatDate } from "../Constants";
import "./RecommendedPostStyles.css";
import { SeeMoreArrowButton } from "./HomePageShortcuts";
import { CommunityPostDialog } from "../Community/CommunityDefaultPost";
import { createPortal } from "react-dom";
import { CarouselComponent } from "../StyledComponents";
import axios from "axios";
import { parseISO } from "date-fns";
// custom post rendering (not the same as community default post)
export const MiniPost = ({ post }) => {
  // view post dialog (taken from community post dialog)
  const [viewPost, setViewPost] = useState(false);
  const handleOpenViewPost = () => {
    setViewPost(true);
  };

  const handleCloseViewPost = () => {
    setViewPost(false);
  };

  // toggle like button for posts
  const [liked, setLiked] = useState(false);
  const toggleLiked = () => {
    setLiked(!liked); // need to update the actual likes status on the post as well
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          margin: "20px",
          marginLeft: "50px",
          marginBottom: "50px",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        onClick={handleOpenViewPost}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#1a90ff",
            textTransform: "uppercase",
          }}
        >
          {formatDate(parseISO(post.dateCreated))}
        </Typography>
        <Typography
          sx={{ fontWeight: 600, fontSize: "20px", marginBottom: "20px" }}
        >
          {post.title}
        </Typography>
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
            avatar={<Avatar alt="ProfilePic" src={post.author.avatar} />}
            label={post.author.username}
            variant="filled"
          />
          <Chip
            sx={{
              marginLeft: "20px",
              marginRight: "30px",
              padding: "5px",
              fontSize: "15px",
            }}
            label={post.category}
            color="primary"
            variant="outlined"
          />
          <Checkbox
            onClick={toggleLiked}
            icon={<FavoriteBorderRoundedIcon />}
            checkedIcon={<FavoriteRoundedIcon />}
          />
          <Typography sx={{ marginRight: "10px" }}>
            {liked ? post.likeAmount + 1 : post.likeAmount}
          </Typography>
          <CommentRoundedIcon sx={{ marginRight: "5px" }} color="primary" />
          <Typography>{post.comments}</Typography>
        </Box>
      </Box>
      {viewPost &&
        createPortal(
          <CommunityPostDialog
            post={post}
            openCondition={viewPost}
            closeFunction={handleCloseViewPost}
          />,
          document.body
        )}
    </div>
  );
};

// styling for posts shortcut
const HomePageRecommendedPosts = () => {
  // finding the top 3 posts by likes
  const [topPostList, setTopPostList] = useState([]);
  const handleSlides = (topPostList) => {
    const sortedPosts = topPostList.sort((a, b) => b.likes - a.likes);
    const top5Posts = Array.from(new Set(sortedPosts.slice(0, 5)));
    const slides = top5Posts.map((post, index) => <MiniPost post={post} />);
    return slides
  }
  useEffect(()=>{
    const postGetTopAPI = `${process.env.REACT_APP_API_LINK}/post/top`;
    axios
      .post(postGetTopAPI, {
        timePeriod: 7 * 24 * 60 * 60 * 1000 * 1000,
      })
      .then((res) => {
        console.log(res.data.topPostList);
        setTopPostList(res.data.topPostList);
      })
      .catch((err) => console.log(err));
  },[])
  return (
    <Card
      sx={{
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent sx={{ margin: "10px" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            sx={{ marginRight: "10px", fontSize: "35px", fontWeight: 700 }}
          >
            What's Trending
          </Typography>
          <SeeMoreArrowButton pageName="Community" />
        </Box>
        <CarouselComponent fontSize="30px" slides={handleSlides(topPostList)} position="30%" />
      </CardContent>
    </Card>
  );
};

export default HomePageRecommendedPosts;
