import { Dialog, DialogContent, Fab, Tooltip, Box } from "@mui/material";
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
    console.log(userProfile);
    const userStatus = checkPlanStatus(userProfile);
    console.log(userStatus);
    console.log(checkStudentModules(userProfile));
    handleCloseDialog();
  };

  return (
    <Dialog
      fullScreen
      open={openDialog}
      onClose={handleCloseDialog}
      TransitionComponent={SlideUpTransition}
    >
      <DialogContent>
        <PublicProfileHeader sampleProfile={userProfile} />
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
