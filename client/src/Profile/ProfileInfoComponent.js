//COMPLETE
import { Typography, Box, Button } from "@mui/material";
import { majorList, progsList, sampleProfile } from "../Constants";
import {
  FormTextField,
  FormAutocomplete,
  FormFacultyMajorField,
} from "../FormStyledComponents";
import React, { useEffect, useState } from "react";
import axios from "axios";

// styling for headers
export const ProfileHeader = (props) => {
  const { text } = props;
  return (
    <Typography
      sx={{
        marginTop: "30px",
        marginBottom: "20px",
        color: "text.secondary",
        fontWeight: 700,
        textTransform: "uppercase",
      }}
    >
      {text}
    </Typography>
  );
};

const ProfileInfoComponent = ({ sampleProfile }) => {
  const [editableDetails, setEditableDetails] = useState(false);

  // just for testing, please delete
  const [profileInfoCopy, setProfileInfoCopy] = useState(sampleProfile);

  // getting profile information
  const [profileInfo, setProfileInfo] = useState();
  const [isFetch, setIsFetch] = useState(false);
  const handleEditableDetails = () => {
    setEditableDetails(!editableDetails);
  };
  const handleProfileInfo = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const GETprofileURL = process.env.REACT_APP_API_LINK + "/profile/get";
    axios
      .get(GETprofileURL, {
        params: {
          userId: userId,
        },
      })
      .then((user) => {
        setProfileInfo(user.data.user);
        setIsFetch(true);
        console.log(user.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  const postUpdateAPI = `${process.env.REACT_APP_API_LINK}/profile/update`;
  const submitProfileUpdate = () => {
    axios
      .post(postUpdateAPI, profileInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      })
      .then((response) => {
        alert("Profile Update Successfully");
        console.log(response);
        //useNavigate need to be initalise at top
      })
      .catch((error) => {
        alert("Fail to Update");
        console.log(error);
      });
  };

  return (
    <Box sx={{ margin: "55px", marginTop: "-20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
          Personal Details
        </Typography>
        <Button
          sx={{ marginLeft: "30px" }}
          onClick={handleEditableDetails}
          variant="contained"
        >
          Edit
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <ProfileHeader text="General Information" />
        <FormTextField
          disabled={!editableDetails}
          label="Name"
          name="name"
          defaultText={sampleProfile["Name"]}
          setfn={handleProfileInfo}
        />
        <FormTextField
          disabled={!editableDetails}
          label="StudentID"
          name="studentId"
          defaultText={sampleProfile["Student ID"]}
          setfn={handleProfileInfo}
        />
        <ProfileHeader text="Academic Information" />
        <FormFacultyMajorField
          disabled={!editableDetails}
          filledFaculty={profileInfo.faculty}
          filledMajor={profileInfo.primaryMajor}
          setfn={handleProfileInfo}
        />
        <FormAutocomplete
          disabled={!editableDetails}
          label="Second Major"
          name="secondaryMajor"
          optionsList={majorList}
          defaultText={profileInfo.secondaryMajor}
          setfn={handleProfileInfo}
        />
        <FormAutocomplete
          disabled={!editableDetails}
          label="Minor"
          name="minors"
          optionsList={majorList}
          defaultText={profileInfo.minors}
          setfn={handleProfileInfo}
        />
        <FormAutocomplete
          disabled={!editableDetails}
          name="programme"
          label="Special Programme (if any)"
          optionsList={progsList}
          defaultText={profileInfo.programme}
          setfn={handleProfileInfo}
        />
      </Box>
      <Button
        onClick={submitProfileUpdate}
        sx={{ marginTop: "20px" }}
        variant="contained"
        color="primary"
      >
        Save
      </Button>
    </Box>
  );
};
export default ProfileInfoComponent;

// isFetch && ....// rest of code
