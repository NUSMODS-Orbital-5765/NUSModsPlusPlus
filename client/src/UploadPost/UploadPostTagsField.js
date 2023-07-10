// styling for tags field for post
import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import { postTagsList } from "../Constants";

export const PostTagsField = (props) => {
  const selectedMajor = props.selectedMajor;
  const handleFormTag = props.handleFormTag;
  const [myTags, setMyTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [tagsList, setTagsList] = useState(postTagsList);
  const [openNewTagDialog, setOpenNewTagDialog] = useState(false);

  const handleTags = (event) => {
    setMyTags(event.target.value);
  };

  const handleNewTag = () => {
    if (newTag.trim() !== "") {
      setTagsList([...tagsList, newTag]);
      setMyTags([...myTags, newTag]);
      setNewTag("");
    }
    setOpenNewTagDialog(false);
  };

  const handleNewTagChange = (event) => {
    setNewTag(event.target.value);
  };

  useEffect(() => {
    if (selectedMajor) {
      setMyTags((prevTags) => {
        if (!prevTags.includes(selectedMajor)) {
          return [...prevTags, selectedMajor];
        }
        return prevTags;
      });
    }
  }, [selectedMajor]);
  useEffect(() => handleFormTag(myTags), [myTags]);

  const handleOpenNewTagDialog = () => {
    setOpenNewTagDialog(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <FormControl sx={{ width: "50%" }}>
        <InputLabel variant="standard">
          Add some tags to help others find your post!
        </InputLabel>
        <Select
          multiple
          name="tags"
          value={myTags}
          variant="standard"
          onChange={handleTags}
          label="My Tags"
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {selected &&
                selected.length > 0 &&
                selected.map((tag, index) => (
                  <Chip
                    variant="filled"
                    color="primary"
                    sx={{ margin: "5px" }}
                    key={index}
                    label={tag}
                  />
                ))}
            </Box>
          )}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
        >
          {tagsList.map((tag, index) => (
            <MenuItem key={index} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        sx={{
          marginLeft: "50px",
          display: "flex",
          flexDirection: "row",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Button variant="outlined" onClick={handleOpenNewTagDialog}>
          New Tag:
        </Button>
        {openNewTagDialog && (
          <Box
            sx={{
              marginLeft: "30px",
              display: "flex",
              flexDirection: "row",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "50ch" }}
              variant="standard"
              label="Tag Name"
              onChange={handleNewTagChange}
            />
            <Button
              sx={{ marginLeft: "30px" }}
              color="success"
              variant="outlined"
              onClick={handleNewTag}
            >
              Save
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PostTagsField;
