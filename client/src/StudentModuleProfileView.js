import { Dialog, DialogContent, Fab, Tooltip, Box } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { SlideUpTransition } from "./StyledComponents";
import { PublicProfileHeader } from "./Profile/PublicProfilePage";
import { sampleProfile } from "./Constants";
import { recommendedPlanLayout } from "./Modules/ModuleConstants";
import { SemesterModulePlansDataGrid } from "./Modules/SemesterModulePlans";

const StudentModuleProfileView = ({
  userProfile,
  modulePlanDict,
  modulePlanStatus,
  openDialog,
  handleCloseDialog,
}) => {
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
            onClick={handleCloseDialog}
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
        <Box sx={{ margin: "55px" }}>
          <SemesterModulePlansDataGrid
            semesterModulesDict={recommendedPlanLayout}
            modulePlanStatus="Approved"
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default StudentModuleProfileView;
