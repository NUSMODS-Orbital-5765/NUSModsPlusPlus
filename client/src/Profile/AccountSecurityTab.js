import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import {
  FormHeader,
  FormUsernameField,
  FormPasswordField,
  FormEmailField,
} from "../FormStyledComponents";
import React, { useState, useEffect } from "react";

const AccountSecurityTab = ({ userProfile }) => {
  const [editableDetails, setEditableDetails] = useState(false);
  const handleEditableDetails = () => {
    setEditableDetails(!editableDetails);
  };

  const [accountInfo, setAccountInfo] = useState({
    username: userProfile.username,
    password: "",
    confirmPassword: "",
    email: userProfile.email,
  });

  const handleAccountInfo = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAccountInfo({ ...accountInfo, [name]: value });
    handleFormCompletion(fieldErrors);
  };

  const [isFormComplete, setIsFormComplete] = useState(false);
  const handleFormCompletion = (fieldErrors) => {
    const isComplete = Object.values(fieldErrors).every((error) => !error);
    setIsFormComplete(isComplete);
  };

  const fieldErrors = {
    username: accountInfo.username === "",
    password: accountInfo.password === "",
    confirmPassword: accountInfo.confirmPassword === "",
    email: accountInfo.email === "",
  };

  useEffect(() => {
    handleFormCompletion(fieldErrors);
  }, [accountInfo]);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const submitAccountInfo = () => {
    setEditableDetails(false);
    setSubmitSuccess(true);
    const accountInfoWithoutConfirmPassword = { ...accountInfo };
    delete accountInfoWithoutConfirmPassword.confirmPassword;
    console.log(accountInfoWithoutConfirmPassword);
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
          My Account
        </Typography>
        <Button
          onClick={handleEditableDetails}
          color="error"
          variant="contained"
        >
          Edit
        </Button>
      </Box>
      <FormHeader text="Edit Username" />
      <Box sx={{ marginBottom: "50px" }}>
        <FormUsernameField
          setfn={handleAccountInfo}
          disabled={!editableDetails}
          defaultText={userProfile.username}
        />
      </Box>
      <FormHeader text="Edit Password" />
      <Box sx={{ marginBottom: "50px" }}>
        <FormPasswordField
          disabled={!editableDetails}
          setfn={handleAccountInfo}
        />
      </Box>
      <FormHeader text="Edit Recovery Email" />
      <Box sx={{ marginBottom: "20px" }}>
        <FormEmailField
          disabled={!editableDetails}
          defaultText={userProfile.email}
          setfn={handleAccountInfo}
        />
      </Box>
      <Button
        sx={{ marginTop: "10px" }}
        disabled={!isFormComplete}
        onClick={submitAccountInfo}
        variant="contained"
      >
        Save
      </Button>
      <Snackbar
        open={submitSuccess}
        autoHideDuration={3000}
        onClose={() => setSubmitSuccess(false)}
      >
        <Alert
          onClose={() => setSubmitSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%", color: "white" }}
        >
          Account details updated successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={submitError}
        autoHideDuration={3000}
        onClose={() => setSubmitError(false)}
      >
        <Alert
          onClose={() => setSubmitError(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%", color: "white" }}
        >
          Failed to update account details.
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default AccountSecurityTab;
