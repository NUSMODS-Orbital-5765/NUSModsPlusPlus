import { AdminPublicProfileView } from "./Admin/AdminPublicProfilePage";
import { PublicProfileView } from "./Profile/PublicProfilePage";
import { Dialog, DialogContent, Fab, Tooltip } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { SlideUpTransition } from "./StyledComponents";

// styling for dialog that admin sees when they click on a row of the datagrid.
const UserProfileView = ({
  userProfile,
  openDialog,
  handleCloseDialog,
  userType,
}) => {
  return (
    <Dialog
      fullScreen
      open={openDialog}
      onClose={handleCloseDialog}
      TransitionComponent={SlideUpTransition}
    >
      <DialogContent>
        {userType === "student" && (
          <PublicProfileView sampleProfile={userProfile} />
        )}
        {userType === "admin" && (
          <AdminPublicProfileView adminProfile={userProfile} />
        )}
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
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileView;
