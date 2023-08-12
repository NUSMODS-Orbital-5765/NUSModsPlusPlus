import { Card, CardContent, Typography } from "@mui/material";

const UpcomingEvents = () => {
  return (
    <Card
      sx={{
        backgroundColor: "#f2f2f2",
        marginTop: "-10px",
        borderRadius: "10px",
        boxShadow: 0,
      }}
    >
      <CardContent sx={{ margin: "10px" }}>
        <Typography
          sx={{ marginBottom: "10px", fontSize: "35px", fontWeight: 700 }}
        >
          Upcoming
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
