// styling for tags field for post
import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import { postTagsList } from "../Constants";

export const PostTagsField = ({ selectedMajor, handleFormTag }) => {
  const [myTags, setMyTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [tagsList, setTagsList] = useState(postTagsList);
  const [openNewTagDialog, setOpenNewTagDialog] = useState(false);

  const handleTags = (event, value) => {
    setMyTags(value);
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

  useEffect(() => handleFormTag(myTags), [myTags, handleFormTag]);

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
        <Autocomplete
          multiple
          name="tags"
          value={myTags}
          variant="standard"
          onChange={handleTags}
          label="My Tags"
          options={tagsList}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="My Tags" />
          )}
        />
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
        <Button
          data-testid="new-tag-button"
          variant="contained"
          onClick={handleOpenNewTagDialog}
        >
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
              sx={{ marginLeft: "30px", color: "white" }}
              color="success"
              variant="contained"
              data-testid="save-tag-button"
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
