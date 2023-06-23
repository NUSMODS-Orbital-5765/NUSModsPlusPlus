import {
  Box,
  Typography,
  Avatar,
  Chip,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Card,
  CardContent,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { samplePosts, formatDate } from "../Constants";
import { SeeMoreArrowButton } from "./HomePageShortcuts";

// styling for forum section
export const PostsList = ({ posts }) => {
  const sortedPosts = samplePosts.sort((a, b) => b.likes - a.likes);
  const top3Posts = Array.from(new Set(sortedPosts.slice(0, 3)));
  return (
    <List sx={{ marginTop: "10px" }}>
      {top3Posts.map((post, index) => (
        <ListItemButton sx={{ marginBottom: "10px" }}>
          <ListItemAvatar>
            <Avatar key={index} src={post.avatar} />
          </ListItemAvatar>
          <ListItemText>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography sx={{ fontWeight: 700 }}>{post.author}</Typography>
                <Typography>{post.title}</Typography>
              </Box>
              <Typography
                variant="h1"
                sx={{
                  marginLeft: "50px",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#536DFE",
                }}
              >
                {formatDate(post.timestamp)}
              </Typography>
              <Box
                sx={{
                  marginLeft: "30px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <FavoriteRoundedIcon />
                <Typography sx={{ marginLeft: "2px" }}>{post.likes}</Typography>
                <ForumRoundedIcon sx={{ marginLeft: "10px" }} />
                <Typography sx={{ marginLeft: "2px" }}>
                  {post.comments}
                </Typography>
              </Box>
            </Box>
          </ListItemText>
        </ListItemButton>
      ))}
    </List>
  );
};

// main page content
const HomePageRecommendedPosts = () => {
  return (
    <Card
      sx={{
        minHeight: "40ch",
        marginBottom: "50px",
        borderRadius: "5px",
        width: "90%",
        boxShadow: 1,
      }}
    >
      <CardContent sx={{ margin: "20px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography
            sx={{ marginRight: "20px", fontSize: "40px", fontWeight: 700 }}
          >
            Recommended For You
          </Typography>
          <SeeMoreArrowButton pageName="Community" />
        </Box>
        <PostsList posts={samplePosts} />
      </CardContent>
    </Card>
  );
};

export default HomePageRecommendedPosts;
