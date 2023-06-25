//COMPLETE
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { majorList, progsList, sampleProfile } from "../Constants";
import {
  FormTextField,
  FormAutocomplete,
  FormPasswordField,
  FormFacultyMajorField,
  FormInterestsField,
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

const ProfileInfoComponent = () => {
  const [editableDetails, setEditableDetails] = useState(false);
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
  useEffect( ()=>{
  const userId = localStorage.getItem("userId");
  const GETprofileURL = process.env.REACT_APP_API_LINK + "/profile/get";
  axios.get(GETprofileURL, {
    params: {
      userId: userId,
    }
  })
  .then(user=>{
    setProfileInfo(user.data.user);
    setIsFetch(true);
    console.log(user.data.user);
  })
  .catch(err=>console.log(err))},[]);

  const postUpdateAPI = `${process.env.REACT_APP_API_LINK}/profile/update`;
  const submitProfileUpdate = () => {
    axios
      .post(postUpdateAPI, profileInfo,  {
        headers: { Authorization: `Bearer ${localStorage.getItem("user-token")}` }
    })
      .then((response) => {
        alert("Profile Update Successfully");
        console.log(response);
        //useNavigate need to be initalise at top
      })
      .catch((error) => {
        alert("Fail to Update")
        console.log(error);
      });
  };


  return (
    isFetch&&<Card
      sx={{
        borderRadius: "5px",
        marginLeft: "30px",
        width: "700px",
        boxShadow: 1,
      }}
    >
      <CardContent>
        <Box
          sx={{
            margin: "10px",
            marginBottom: "-10px",
            display: "flex",
            flexDirection: "row",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "30px", fontWeight: 700 }}>My</Typography>
          <Typography
            sx={{
              marginLeft: "8px",
              fontSize: "30px",
              fontWeight: 700,
              color: "#536DFE",
            }}
          >
            Personal Details
          </Typography>
          <Button
            sx={{ marginLeft: "30px" }}
            onClick={handleEditableDetails}
            variant="outlined"
          >
            Edit
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              margin: "10px",
              marginRight: "20px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "30px",
              }}
            >
              <ProfileHeader text="General Information" />
              <FormTextField
                disabled={!editableDetails}
                label="Name"
                name="name"
                defaultText={profileInfo.name}
                setfn={handleProfileInfo}
              />
              <FormTextField
                disabled={!editableDetails}
                label="StudentID"
                name="studentId"
                defaultText={profileInfo.studentId}
                setfn={handleProfileInfo}
              />
              <ProfileHeader text="Account Information" />
              <FormTextField
                disabled={true}
                label="Username"
                name="username"
                defaultText={profileInfo.username}
                setfn={handleProfileInfo}
              />
              <FormPasswordField
                disabled={true}
                defaultText={sampleProfile["Password"]}
                setfn={handleProfileInfo}
              />
            </Box>
            <Box sx={{ marginLeft: "50px" }}>
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
                name = "secondaryMajor"
                optionsList={majorList}
                defaultText={profileInfo.secondaryMajor}
                setfn={handleProfileInfo}
              />
              <FormAutocomplete
                disabled={!editableDetails}
                label="Minor"
                name = "minors"
                optionsList={majorList}
                defaultText={profileInfo.minors}
                setfn={handleProfileInfo}
              />
              <FormAutocomplete
                disabled={!editableDetails}
                name = "programme"
                label="Special Programme (if any)"
                optionsList={progsList}
                defaultText={profileInfo.programme}
                setfn={handleProfileInfo}
              />
            </Box>
          </Box>
          <Box
            sx={{ margin: "10px", display: "flex", flexDirection: "column" }}
          >
            <ProfileHeader text="User Preferences" />
            <FormInterestsField
              disabled={!editableDetails}
              setfn={handleProfileInfo}
              filledInterests={profileInfo.interests}
            />
          </Box>
        </Box>
        <Button
          onClick={submitProfileUpdate}
          sx={{ marginTop: "20px" }}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </CardContent>
    </Card>
  )
};
export default ProfileInfoComponent;
