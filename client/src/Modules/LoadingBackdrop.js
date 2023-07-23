import CircularProgress from "@mui/material/CircularProgress";

// full screen loading backdrop
const LoadingBackdrop = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="primary" />
    </div>
  );
};

export default LoadingBackdrop;
