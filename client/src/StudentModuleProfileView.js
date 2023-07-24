import {
  Dialog,
  DialogContent,
  Fab,
  Tooltip,
  Box,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import { AboutInfoList } from "./Profile/PublicProfilePage";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { SlideUpTransition } from "./StyledComponents";
import { PublicProfileHeader } from "./Profile/PublicProfilePage";
import React, { useState, useEffect } from "react";
import { SemesterModulePlansDataGrid } from "./Modules/SemesterModulePlans";
import {
  adminSampleProfile,
  checkPlanStatus,
  checkStudentModules,
  sampleAdminComments,
  sampleStudentsList,
} from "./Admin/AdminConstants";
import { red } from "@mui/material/colors";
import { formatDate } from "./Constants";
import {emptyPlanLayout, recommendedPlanLayout} from "./Modules/ModuleConstants"
import { nanoid } from "nanoid";
import axios from "axios";
import generateNotification from "./libs/generateNotification";
// admin comments dialog
export const AdminCommentsDialog = ({
  adminUser,
  viewer,
  openDialog,
  handleCloseDialog,
  studentProfile,
}) => {
  const [commentsList, setCommentsList] = useState([]); // replace with database commentslist
  const [commentContent, setCommentContent] = useState("");
  const [commentAddStatus, setCommentAddStatus] = useState(0);
  const handleAddComment = (event) => {
    setCommentContent(event.target.value);
  };

  // for admin to post comments for student
  const handleSubmitComment = () => {
    const commentAddAdminAPI = `${process.env.REACT_APP_API_LINK}/admin/add-comment`;
    if (commentContent === "") {
      alert("Empty Comment");
    } else {
      axios
        .post(
          commentAddAdminAPI,
          {
            content: commentContent,
            dateCreated: new Date(),
            username: localStorage.getItem("username"),
            nanoid: studentProfile.nanoid,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            },
          }
        )
        .then((res) => {
          alert("Successfully add comment");
          setCommentAddStatus(commentAddStatus + 1);
          generateNotification("mention", localStorage.getItem("username"), studentProfile.username, commentContent, {nanoid: studentProfile.nanoid})
        })
        .catch((err) => console.log(err));
    }
  };

  const commentModulePlanGetAPI = `${process.env.REACT_APP_API_LINK}/module-plan/get-comment`;
  useEffect(() => {
    axios
      .post(commentModulePlanGetAPI, {
        nanoid: studentProfile.nanoid,
      })
      .then((res) => {
        console.log(res.data.commentsList);
        setCommentsList(res.data.commentsList);
      })
      .catch((err) => console.log(err));
  }, [commentAddStatus]);
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogContent sx={{ margin: "10px" }}>
        <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
          Comments
        </Typography>
        {viewer === "admin" && (
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
            {/* use the currentAdminUser's profile */}
            <Avatar alt="Sample Icon" src={localStorage.getItem("avatar")} />
            <TextField
              sx={{ marginLeft: "20px", marginRight: "20px", width: "80%" }}
              variant="filled"
              label="Add a comment..."
              onChange={(e) => setCommentContent(e.target.value)}
              multiline
              maxRows={4}
            />
            <Button variant="contained" onClick={handleSubmitComment}>
              Post
            </Button>
          </Box>
        )}
        {commentsList.map((comment, index) => (
          <Box
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <Avatar
                key={index}
                alt={comment.author.username}
                src={comment.author.avatar}
              />
              <Typography sx={{ fontWeight: 600, marginLeft: "10px" }}>
                {comment.author.username}
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  marginLeft: "30px",
                  color: "#1a90ff",
                }}
              >
                {formatDate(new Date(comment.dateCreated))}
              </Typography>
            </Box>
            <Box
              sx={{
                marginLeft: "20px",
                borderLeft: "3px solid #1a90ff",
                paddingLeft: "28px",
              }}
            >
              <Typography>{comment.content}</Typography>
            </Box>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
};

const StudentModuleProfileView = ({
  userProfile,
  openDialog,
  handleCloseDialog,
}) => {
  const [openCommentsDialog, setOpenCommentsDialog] = useState(false);
  const [newPlanStatus, setNewPlanStatus] = useState("");
  const [approveSuccess, setApproveSuccess] = useState(false);
  const [rejectSuccess, setRejectSuccess] = useState(false);
  const [semesterModulesDict, setSemesterModulesDict] = useState(emptyPlanLayout);

  const handleOpenCommentsDialog = () => {
    setOpenCommentsDialog(true);
  };

  const handleCloseCommentsDialog = () => {
    setOpenCommentsDialog(false);
  };

  // for approving/rejecting plan
  const handleApprovePlan = () => {
    const ApprovalActionAdminAPI = `${process.env.REACT_APP_API_LINK}/admin/approve`;
    axios
    .post(ApprovalActionAdminAPI, {
      nanoid: userProfile.nanoid,
      status: "Approved"
    })
    .then((res) => {
      setNewPlanStatus("Approved");
      setApproveSuccess(true);
      generateNotification("approve", localStorage.getItem("username"), userProfile.username, "", {nanoid: nanoid})
    })
    .catch((err) => console.log(err));
  };

  const handleRejectPlan = () => {
    const ApprovalActionAdminAPI = `${process.env.REACT_APP_API_LINK}/admin/approve`;
    axios
    .post(ApprovalActionAdminAPI, {
      nanoid: userProfile.nanoid,
      status: "Rejected"
    })
    .then((res) => {
      setNewPlanStatus("Rejected");
      setRejectSuccess(true);
      generateNotification("reject", localStorage.getItem("username"), userProfile.username, "", {nanoid: nanoid})
    })
    .catch((err) => console.log(err));

  };

  const handleClickClose = () => {
    console.log({
      student: userProfile,
      modulePlan: checkStudentModules(userProfile),
      modulePlanStatus: newPlanStatus,
    });
    handleCloseDialog();
  };
  useEffect(()=>{
    if (userProfile != null) {
      setSemesterModulesDict(userProfile.semesterModulesDict);
      setNewPlanStatus(userProfile.status);
  }
  }, [userProfile])

  useEffect(()=>{console.log(semesterModulesDict)},[semesterModulesDict])
  return (
    <Dialog
      fullScreen
      open={openDialog}
      onClose={handleCloseDialog}
      TransitionComponent={SlideUpTransition}
    >
      <DialogContent>
        <PublicProfileHeader sampleProfile={userProfile} />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Card
            sx={{
              borderRadius: "10px",
              margin: "55px",
              marginTop: "-10px",
              marginBottom: "40px",
              backgroundColor: "#f2f2f2",
              boxShadow: 0,
              flex: "20%",
            }}
          >
            <CardContent sx={{ margin: "10px" }}>
              <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
                About
              </Typography>
              <Box sx={{ marginTop: "20px" }}>
                {userProfile &&
                  AboutInfoList(userProfile).map((infoItem, index) => (
                    <Box
                      sx={{
                        marginTop: "20px",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Box sx={{ marginRight: "10px" }}>{infoItem.icon}</Box>
                      {infoItem.content}
                    </Box>
                  ))}
              </Box>
            </CardContent>
          </Card>
          <Box sx={{ flex: "60%" }}>
            <SemesterModulePlansDataGrid
              semesterModulesDict={semesterModulesDict}
              modulePlanStatus={newPlanStatus}
            />
          </Box>
        </Box>
        <Tooltip title="Close Plan" placement="bottom">
          <Fab
            color="error"
            onClick={handleClickClose}
            sx={{
              position: "fixed",
              top: "3rem",
              right: "3rem",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: "30px", fontWeight: 600 }} />
          </Fab>
        </Tooltip>
        <Tooltip title="Approve Plan" placement="top">
          <Fab
            color="success"
            onClick={handleApprovePlan}
            sx={{
              position: "fixed",
              top: "8rem",
              right: "3rem",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
          >
            <ThumbUpAltRoundedIcon
              sx={{ fontSize: "30px", color: "white", fontWeight: 600 }}
            />
          </Fab>
        </Tooltip>
        <Tooltip title="Reject Plan" placement="top">
          <Fab
            onClick={handleRejectPlan}
            sx={{
              backgroundColor: "black",
              position: "fixed",
              top: "13rem",
              right: "3rem",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.2)",
                backgroundColor: "black",
              },
            }}
          >
            <ThumbDownAltRoundedIcon
              sx={{ fontSize: "30px", color: "white", fontWeight: 600 }}
            />
          </Fab>
        </Tooltip>
        <Tooltip title="Comment" placement="top">
          <Fab
            color="primary"
            onClick={handleOpenCommentsDialog}
            sx={{
              position: "fixed",
              bottom: "3rem",
              right: "3rem",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
          >
            <ChatRoundedIcon sx={{ fontSize: "30px", fontWeight: 600 }} />
          </Fab>
        </Tooltip>
        <Snackbar
          open={approveSuccess}
          autoHideDuration={3000}
          onClose={() => setApproveSuccess(false)}
        >
          <Alert
            sx={{ color: "white" }}
            onClose={() => setApproveSuccess(false)}
            variant="filled"
            severity="success"
          >
            Plan approved!
          </Alert>
        </Snackbar>
        <Snackbar
          open={rejectSuccess}
          autoHideDuration={3000}
          onClose={() => setRejectSuccess(false)}
        >
          <Alert
            onClose={() => setRejectSuccess(false)}
            variant="filled"
            severity="success"
            sx={{ backgroundColor: red[500], color: "white" }}
          >
            Plan rejected!
          </Alert>
        </Snackbar>
        <AdminCommentsDialog
          adminUser={adminSampleProfile}
          studentProfile={userProfile}
          viewer="admin"
          openDialog={openCommentsDialog}
          handleCloseDialog={handleCloseCommentsDialog}
        />
      </DialogContent>
    </Dialog>
  );
};

export default StudentModuleProfileView;
