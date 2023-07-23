import { Typography } from "@mui/material";
import { red, grey } from "@mui/material/colors";

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
        requirement: "commonModules",
        module: {
          code: "CS1010S",
          name: "Programming Methodology",
        },
      },
      {
        requirement: "primaryDegreeModules",
        module: {
          code: "MA2001",
          name: "Linear Algebra I",
        },
      },
    ],
    "Semester 2": [
      {
        requirement: "commonModules",
        module: {
          code: "HSI1000",
          name: "How Science Works, Why Science Works",
        },
      },
      {
        requirement: "commonModules",
        module: {
          code: "HSS1000",
          name: "Understanding Social Complexity",
        },
      },
    ],
  },
  "Year 2": { "Semester 1": [], "Semester 2": [] },
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
  const gradRequirements = [];

  gradRequirements.push(
    {
      name: "commonModules",
      modules: [],
    },
    {
      name: "primaryDegreeModules",
      modules: [],
    }
  );

  if (academicPlan.secondDegree) {
    gradRequirements.push({
      name: "secondDegreeModules",
      modules: [],
    });
  } else if (academicPlan.secondMajor) {
    gradRequirements.push({
      name: "secondMajorModules",
      modules: [],
    });
  }

  if (academicPlan.minor && academicPlan.minor.length > 0) {
    gradRequirements.push({
      name: "minorModules",
      modules: [],
    });
  }

  return gradRequirements;
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
      {
        code: "3K requirement",
        name: "",
      },
      {
        code: "4K requirement",
        name: "",
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

// another array to check state independence
export const draftAcademicRequirements = [
  {
    name: "commonModules",
    modules: [
      {
        code: "NTW2006",
        name: "Human Trafficking and Labour Migration",
        options: [
          {
            code: "NTW2006",
            name: "Human Trafficking and Labour Migration",
          },
          {
            code: "NTW2031",
            name: "Equity and Education",
          },
          {
            code: "NTW2010",
            name: "Sites of Tourism",
          },
          {
            code: "NTW2017",
            name: "Multidisciplinary Perspectives on 'Mind'",
          },
          {
            code: "NTW2018",
            name: "Danger and National Security",
          },
        ],
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
    degreeContent.push(
      <span key="degree" style={{ fontWeight: 600 }}>
        Degree
      </span>
    );
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

// format the academic plan description
export const FormatAcademicPlanTitle = ({ academicPlan }) => {
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
      <span key="doubleDegree" style={{ fontWeight: 700 }}>
        Double Degree
      </span>
    );
    degreeContent.push(
      <div key="degreeInfo">
        {" in " + primaryDegree.toString() + " and " + secondDegree.toString()}
      </div>
    );
  } else if (secondMajor) {
    degreeContent.push(
      <span key="doubleMajor" style={{ fontWeight: 700 }}>
        Double Major
      </span>
    );
    degreeContent.push(
      <div key="degreeInfo">
        {" in " + primaryDegree.toString() + " and " + secondMajor.toString()}
      </div>
    );
  } else {
    degreeContent.push(
      <span key="degree" style={{ fontWeight: 700 }}>
        Degree
      </span>
    );
    degreeContent.push(
      <div key="degreeInfo">{" in " + primaryDegree.toString()}</div>
    );
  }

  if (minor && minor.length > 0) {
    degreeContent.push(
      <div key="minor" style={{ fontWeight: 700, marginTop: "20px" }}>
        Minor
      </div>
    );
    degreeContent.push(<div key="minorInfo">{" in " + minor.join(", ")}</div>);
  }

  if (programme) {
    degreeContent.push(
      <div key="programme" style={{ fontWeight: 700, marginTop: "20px" }}>
        {programme.toString()}
      </div>
    );
  }

  return (
    <Typography sx={{ fontSize: "30px", marginTop: "20px" }}>
      {degreeContent}
    </Typography>
  );
};

// sample module selection options
export const sampleOptionsList = [
  {
    code: "NTW2006",
    name: "Human Trafficking and Labour Migration",
  },
  {
    code: "NTW2031",
    name: "Equity and Education",
  },
  {
    code: "NTW2010",
    name: "Sites of Tourism",
  },
  {
    code: "NTW2017",
    name: "Multidisciplinary Perspectives on 'Mind'",
  },
  {
    code: "NTW2018",
    name: "Danger and National Security",
  },
];

// get different colors for different modules
export function getModuleColors(requirement) {
  if (requirement === "commonModules") {
    return "#1a90ff";
  } else if (requirement == "primaryDegreeModules") {
    return red[500];
  } else if (
    requirement === "secondDegreeModules" ||
    requirement === "secondMajorModules"
  ) {
    return "#44b700";
  } else if (requirement === "minorModules") {
    return grey[500];
  }
}

// function for rewriting the module section header
export function getSectionHeader(req, academicPlan) {
  if (req === "commonModules") {
    return "Common Modules";
  } else if (req === "primaryDegreeModules") {
    return "Degree in " + academicPlan.primaryDegree.toString();
  } else if (req === "secondDegreeModules") {
    return "Second Degree in " + academicPlan.secondDegree.toString();
  } else if (req === "secondMajorModules") {
    return "Second Major in " + academicPlan.secondMajor.toString();
  } else if (req === "minorModules") {
    return (
      "Minor in " + academicPlan.minor.map((item) => item.toString()).join(",")
    );
  }
}
