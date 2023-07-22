//COMPLETE
import {
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Select,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Autocomplete,
  Fab,
  Tooltip,
} from "@mui/material";
import { majorList, facultyList, progsList } from "../Constants";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import React, { useState, useEffect } from "react";
import { SlideUpTransition } from "../StyledComponents";
import { MyTextEditor } from "../FormStyledComponents";
import PostTagsField from "./UploadPostTagsField";
import UploadPostFile, { PostFileAllowedTypes } from "./UploadPostFile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../libs/s3Client";
import { nanoid } from "nanoid";
// styling for post upload form component
export const UploadPostForm = (props) => {
  const navigate = useNavigate();
  // form validation
  const [isFormValid, setIsFormValid] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [formErrors, setFormErrors] = useState({
    titleError: false,
    categoryError: false,
  });

  const handlePostTitleChange = (event) => {
    setPostTitle(event.target.value);
  };

  const handlePostCategoryChange = (event) => {
    setPostCategory(event.target.value);
  };

  useEffect(() => {
    validateForm();
  }, [postTitle, postCategory]);

  const validateForm = () => {
    const errors = {
      titleError: postTitle.trim().length < 1,
      categoryError: postCategory === "",
    };

    setFormErrors(errors);

    const isValid = Object.values(errors).every((error) => !error);
    setIsFormValid(isValid);
  };

  const [formContent, setFormContent] = useState("");
  const handleFormContent = (value) => {
    setFormContent(value);
  };
  const [formTag, setFormTag] = useState([]);
  const handleFormTag = (value) => {
    setFormTag(value);
  };
  const [formFile, setFormFile] = useState("");
  const handleFormFile = (value) => {
    setFormFile(value);
  };
  // combines related major/faculty/programme with the tags (automatic) for easier sorting. can remove if not nec
  const [selectedMajor, setSelectedMajor] = useState("");
  const handleSelectedMajor = (event, value) => {
    setSelectedMajor(value || "");
  };

  const userId = localStorage.getItem("userId");
  let filePath = "";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFile !== "") {
      const folderId = nanoid();
      filePath = `post/${folderId}/` + formFile.name;
      const AWSparams = {
        Bucket: process.env.REACT_APP_BUCKET_NAME, // The name of the bucket. For example, 'sample-bucket-101'.
        Key: filePath, // The name of the object. For example, 'sample_upload.txt'.
        Body: formFile, // The content of the object. For example, 'Hello world!".
      };

      s3Client
        .send(new PutObjectCommand(AWSparams))
        .then((response) => {
          //nothing, continue
        })
        .catch((err) => {
          console.log("Error", err);
          alert("Fail to upload File");
        });
    }

    const post = {
      dateCreated: new Date(),
      title: postTitle,
      category: postCategory,
      relatedMajor: selectedMajor,
      content: formContent,
      upload_file: filePath,
      tags: formTag,
      author: userId,
    };
    console.log(post);
    const uploadAPI = `${process.env.REACT_APP_API_LINK}/post/upload`;

    axios
      .post(uploadAPI, post)
      .then((response) => {
        alert("Upload Post Successfully");

        //useNavigate need to be initalise at top
        props.handleCloseUpload();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
        //undo the insertion
        if (formFile !== "") {
          s3Client.send(
            new DeleteObjectCommand({
              Bucket: process.env.REACT_APP_BUCKET_NAME,
              Key: filePath,
            })
          );
        }
      });
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormControl sx={{ width: "100%" }}>
        <TextField
          label="Post Title"
          variant="standard"
          onChange={handlePostTitleChange}
          error={formErrors.titleError}
          helperText={formErrors.titleError ? "Title is required" : ""}
        />
      </FormControl>
      <FormControl sx={{ marginTop: "30px", width: "100%" }}>
        <InputLabel variant="standard">Post Category</InputLabel>
        <Select
          sx={{ width: "100%" }}
          onChange={handlePostCategoryChange}
          error={formErrors.categoryError}
          helperText={formErrors.categoryError ? "Category is required" : ""}
          label="Post Category"
          variant="standard"
        >
          <MenuItem value={"Study Guide"}>Study Guide</MenuItem>
          <MenuItem value={"Module Review"}>Module Review</MenuItem>
          <MenuItem value={"Notes"}>Notes</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ marginTop: "10px", width: "100%" }}>
        <Autocomplete
          sx={{ marginTop: "20px" }}
          disablePortal
          name="Related Major/Faculty/Special Programme (if applicable)"
          onChange={handleSelectedMajor}
          options={[...majorList, ...facultyList, ...progsList]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Related Major/Faculty/Special Programme (if applicable)"
              variant="standard"
            />
          )}
        />
      </FormControl>
      <MyTextEditor handleFormContent={handleFormContent} />
      <Box sx={{ marginTop: "30px" }}>
        <UploadPostFile
          allowedTypes={PostFileAllowedTypes}
          handleFormFile={handleFormFile}
        />
      </Box>
      <FormControl sx={{ marginTop: "30px", width: "100%" }}>
        <PostTagsField
          selectedMajor={selectedMajor}
          handleFormTag={handleFormTag}
        />
      </FormControl>
      <Button
        disabled={!isFormValid}
        sx={{ marginTop: "30px" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Create Post
      </Button>
    </form>
  );
};

// styling for upload post dialog
const UploadPost = () => {
  const [openUpload, setOpenUpload] = useState(false);
  const handleOpenUpload = () => {
    setOpenUpload(true);
  };

  const handleCloseUpload = () => {
    setOpenUpload(false);
  };
  return (
    <div>
      <Tooltip title="Create new Post" placement="top">
        <Fab
          color="primary"
          onClick={handleOpenUpload}
          sx={{
            "&:hover": {
              transform: "scale(1.2)",
              transition: "transform 0.1s",
            },
          }}
        >
          <AddRoundedIcon sx={{ fontSize: "30px" }} />
        </Fab>
      </Tooltip>
      <Dialog
        fullScreen
        open={openUpload}
        TransitionComponent={SlideUpTransition}
      >
        <DialogTitle sx={{ margin: "30px", marginBottom: "0px" }}>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
              New Post
            </Typography>
            <Button
              sx={{ marginLeft: "120ch" }}
              color="error"
              variant="contained"
              onClick={handleCloseUpload}
            >
              Cancel
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ margin: "30px" }}>
          <UploadPostForm handleCloseUpload={handleCloseUpload} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadPost;
