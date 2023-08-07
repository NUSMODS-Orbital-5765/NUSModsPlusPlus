import { Card, CardContent, Typography, Box } from "@mui/material";

const GPACalculatorOverall = ({ gradesList }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#f2f2f2",
        marginRight: "30px",
        borderRadius: "10px",
        boxShadow: 0,
      }}
    >
      <CardContent sx={{ margin: "10px" }}>
        <Typography
          sx={{ marginBottom: "10px", fontSize: "35px", fontWeight: 700 }}
        >
          Overall
        </Typography>
        <Typography>Progress Bar and Overall GPA (with color)</Typography>
      </CardContent>
    </Card>
  );
};
export default GPACalculatorOverall;
