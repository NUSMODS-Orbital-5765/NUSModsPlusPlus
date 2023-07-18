import { Typography } from "@mui/material";

// styling for academic info
export const emptyAcademicInfo = {
  faculty: "",
  primaryDegree: "",
  secondDegree: "",
  secondMajor: "",
  minor: [],
  programme: "",
};

// styling for a default plan layout
export const emptyPlanLayout = {
  "Year 1": { "Semester 1": [], "Semester 2": [] },
  "Year 2": { "Semester 1": [], "Semester 2": [] },
  "Year 3": { "Semester 1": [], "Semester 2": [] },
  "Year 4": { "Semester 1": [], "Semester 2": [] },
};

// styling for a default recommended plan
export const recommendedPlanLayout = {
  "Year 1": {
    "Semester 1": [
      {
        code: "CS1010S",
        name: "Programming Methodology",
      },
      {
        code: "MA2001",
        name: "Linear Algebra I",
      },
      {
        code: "MA2002",
        name: "Calculus",
      },
      {
        code: "CS1231S",
        name: "Discrete Structures",
      },
      {
        code: "DTK1234",
        name: "Design Thinking",
      },
    ],
    "Semester 2": [
      {
        code: "HSI1000",
        name: "How Science Works, Why Science Works",
      },
      {
        code: "HSS1000",
        name: "Understanding Social Complexity",
      },
      {
        code: "MA2104",
        name: "Multivariable Calculus",
      },
      {
        code: "ST2131",
        name: "Probability",
      },
      {
        code: "CS2030",
        name: "Programming Methodology II",
      },
    ],
  },
  "Year 2": {
    "Semester 1": [
      {
        code: "HSA1000",
        name: "Asian Interconnections",
      },
      {
        code: "HSH1000",
        name: "The Human Condition",
      },
      {
        code: "CS2040",
        name: "Data Structures and Algorithms",
      },
      {
        code: "CS3243",
        name: "Introduction to Artificial Intelligence",
      },
      {
        code: "MA2108",
        name: "Mathematical Analysis I",
      },
    ],
    "Semester 2": [
      {
        code: "CS2103T",
        name: "Software Engineering",
      },
      {
        code: "MA2116",
        name: "Probability",
      },
    ],
  },
  "Year 3": { "Semester 1": [], "Semester 2": [] },
  "Year 4": { "Semester 1": [], "Semester 2": [] },
};

// sample student profile with academic plan extracted
export const sampleAcademicPlan = {
  faculty: "Faculty of Science",
  primaryDegree: "Data Science and Analytics",
  secondDegree: "",
  secondMajor: "Computer Science",
  minor: ["Mathematics"],
  programme: "",
};

// placeholder function for getting academic requirements
// i assume the plan that we get when we enter a sample academic plan is in this format..hahaha
export function getRequiredModules(academicPlan) {
  return sampleAcademicRequirements;
}

// placeholder function for getting recommended plan
export function getRecommendedPlan(academicPlan) {
  return recommendedPlanLayout;
}

export const sampleAcademicRequirements = [
  {
    name: "commonModules",
    modules: [
      {
        code: "CS1010S",
        name: "Programming Methodology",
      },
      {
        code: "HSI1000",
        name: "How Science Works, Why Science Works",
      },
      {
        code: "HSS1000",
        name: "Understanding Social Complexity",
      },
      {
        code: "HSA1000",
        name: "Asian Interconnections",
      },
      {
        code: "HSH1000",
        name: "The Human Condition",
      },
      {
        code: "DTK1234",
        name: "Design Thinking",
      },
    ],
  },
  {
    name: "primaryDegreeModules",
    modules: [
      {
        code: "MA2002",
        name: "Calculus",
      },
      {
        code: "CS2040",
        name: "Data Structures and Algorithms",
      },
      {
        code: "ST2131",
        name: "Probability",
      },
      {
        code: "MA2001",
        name: "Linear Algebra I",
      },
      {
        code: "MA2104",
        name: "Multivariable Calculus",
      },
      {
        code: "CS2030",
        name: "Programming Methodology II",
      },
    ],
  },
  {
    name: "secondMajorModules",
    modules: [
      {
        code: "CS1231S",
        name: "Discrete Structures",
      },
      {
        code: "CS3243",
        name: "Introduction to Artificial Intelligence",
      },
      {
        code: "CS2103T",
        name: "Software Engineering",
      },
    ],
  },
  {
    name: "minorModules",
    modules: [
      {
        code: "MA2108",
        name: "Mathematical Analysis I",
      },
      {
        code: "MA2116",
        name: "Probability",
      },
    ],
  },
];

// format the academic plan description
export const FormatAcademicPlanDetails = ({ academicPlan }) => {
  const {
    faculty,
    primaryDegree,
    secondDegree,
    secondMajor,
    minor,
    programme,
  } = academicPlan;

  const degreeContent = [];

  if (secondDegree) {
    degreeContent.push(
      <span key="doubleDegree" style={{ fontWeight: 600 }}>
        Double Degree
      </span>
    );
    degreeContent.push(
      " in " + primaryDegree.toString() + " and " + secondDegree.toString()
    );
  } else if (secondMajor) {
    degreeContent.push(
      <span key="doubleMajor" style={{ fontWeight: 600 }}>
        Double Major
      </span>
    );
    degreeContent.push(
      " in " + primaryDegree.toString() + " and " + secondMajor.toString()
    );
  } else {
    degreeContent.push(<span key="degree">Degree</span>);
    degreeContent.push(" in " + primaryDegree.toString());
  }

  if (minor && minor.length > 0) {
    degreeContent.push(
      <span key="minor" style={{ fontWeight: 600 }}>
        {" "}
        • Minor
      </span>
    );
    degreeContent.push(" in " + minor.join(", "));
  }

  if (programme) {
    degreeContent.push(
      <span key="programme" style={{ fontWeight: 600 }}>
        {" "}
        • {programme.toString()}
      </span>
    );
  }

  return <Typography sx={{ fontSize: "17px" }}>{degreeContent}</Typography>;
};
