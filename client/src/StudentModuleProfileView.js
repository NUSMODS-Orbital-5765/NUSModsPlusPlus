import {
  Dialog,
  DialogContent,
  Fab,
  Tooltip,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { AboutInfoList } from "./Profile/PublicProfilePage";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { SlideUpTransition } from "./StyledComponents";
import { PublicProfileHeader } from "./Profile/PublicProfilePage";
import { recommendedPlanLayout } from "./Modules/ModuleConstants";
import { SemesterModulePlansDataGrid } from "./Modules/SemesterModulePlans";
import { checkPlanStatus, checkStudentModules } from "./Admin/AdminConstants";

const StudentModuleProfileView = ({
  userProfile,
  openDialog,
  handleCloseDialog,
}) => {
  const handleClickClose = () => {
    handleCloseDialog();
  };

  console.log(userProfile);

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
              semesterModulesDict={checkStudentModules(userProfile)}
              modulePlanStatus={checkPlanStatus(userProfile)}
            />
          </Box>
        </Box>
        <Tooltip title="Close" placement="bottom">
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
      </DialogContent>
    </Dialog>
  );
};

export default StudentModuleProfileView;
