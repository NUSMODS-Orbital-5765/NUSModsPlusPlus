// list of letter grades and their respective GPAs (taken from the NUS website)
export const GPAGradeGuide = [
  { grade: "A+", GPA: "5.0" },
  { grade: "A", GPA: "5.0" },
  { grade: "A-", GPA: "4.5" },
  { grade: "B+", GPA: "4.0" },
  { grade: "B", GPA: "3.5" },
  { grade: "B-", GPA: "3.0" },
  { grade: "C+", GPA: "2.5" },
  { grade: "C", GPA: "2.0" },
  { grade: "D+", GPA: "1.5" },
  { grade: "D", GPA: "1.0" },
  { grade: "F", GPA: "0" },
  { grade: "S", GPA: "NA" },
  { grade: "U", GPA: "NA" },
];

// list of all possible grades
export const possibleGradesList = GPAGradeGuide.map((item) => item.grade);

// list of semesters and their modules
export const sampleModuleGrades = [
  {
    year: "Year 1",
    semesters: {
      "Semester 1": [
        {
          module: {
            code: "MA1521",
            name: "Calculus for Computing",
            "S/U": "Yes",
            mc: 4,
          },
          grade: "A+",
        },
        {
          module: {
            code: "BT1101",
            name: "Introduction to Business Analytics",
            "S/U": "Yes",
            mc: 4,
          },
          grade: "A",
        },
        {
          module: {
            code: "CS1010S",
            name: "Programming Methodology",
            "S/U": "Yes",
            mc: 4,
          },
          grade: "A-",
        },
        {
          module: {
            code: "NSW2001",
            name: "Understanding the Social World: Singapore & Beyond",
            "S/U": "Yes",
            mc: 4,
          },
          grade: "B",
        },
        {
          module: {
            code: "NGN2001",
            name: "Global Narratives",
            "S/U": "Yes",
            mc: 4,
          },
          grade: "B-",
        },
      ],
      "Semester 2": [
        {
          module: {
            code: "EC1101E",
            name: "Introduction to Economic Analysis",
            "S/U": "Yes",
            mc: 4,
          },
          grade: "F",
        },
        {
          module: {
            code: "MA2001",
            name: "Linear Algebra I",
            "S/U": "Yes",
            mc: 4,
          },
          grade: "A+",
        },
        {
          module: {
            code: "BT2102",
            name: "Data Management and Visualisation",
            "S/U": "No",
            mc: 4,
          },
          grade: "A+",
        },
        {
          module: {
            code: "CS2030",
            name: "Programming Methodology II",
            "S/U": "No",
            mc: 4,
          },
          grade: "C+",
        },
        {
          module: {
            code: "NTW2006",
            name: "Human Trafficking and Labour Migration",
            "S/U": "No",
            mc: 4,
          },
          grade: "A+",
        },
      ],
    },
  },
  {
    year: "Year 2",
    semesters: {
      "Semester 1": [
        {
          module: {
            code: "CS2040",
            name: "Data Structures and Algorithms",
            "S/U": "No",
            mc: 4,
          },
          grade: "A",
        },
        {
          module: {
            code: "EC3303",
            name: "Econometrics I",
            "S/U": "No",
            mc: 4,
          },
          grade: "A",
        },
        {
          module: {
            code: "BT2101",
            name: "Econometrics Modeling for Business Analytics",
            "S/U": "No",
            mc: 4,
          },
          grade: "A+",
        },
        {
          module: {
            code: "NHS2056",
            name: " Law and the City: Divisions, Aesthetics, Transgressions",
            "S/U": "Yes",
            mc: 4,
          },
          grade: "B+",
        },
        {
          module: {
            code: "QF1100",
            name: " Introduction to Quantitative Finance",
            "S/U": "Yes",
            mc: 4,
          },
          grade: "A",
        },
      ],
      "Semester 2": [],
    },
  },
  {
    year: "Year 3",
    semesters: {
      "Semester 1": [],
      "Semester 2": [],
    },
  },
  {
    year: "Year 4",
    semesters: {
      "Semester 1": [],
      "Semester 2": [],
    },
  },
];

// empty layout to begin the GPA calculator with, idk
export const emptyModuleGrades = [
  {
    year: "Year 1",
    semesters: {
      "Semester 1": [],
      "Semester 2": [],
    },
  },
  {
    year: "Year 2",
    semesters: {
      "Semester 1": [],
      "Semester 2": [],
    },
  },
  {
    year: "Year 3",
    semesters: {
      "Semester 1": [],
      "Semester 2": [],
    },
  },
  {
    year: "Year 4",
    semesters: {
      "Semester 1": [],
      "Semester 2": [],
    },
  },
];

// list of modules to be added as options for adding
// (this will be replaced by the module search autocomplete field in modules page)
// note: will need a way to check and find out whether the module can be s/ued
export const addModuleOptions = [
  {
    code: "PC1101",
    name: "Frontiers of Physics",
    "S/U": "Yes",
    mc: 4,
  },
  {
    code: "SW1101E",
    name: "Social Work: A Heart-Head-Hand Connection",
    "S/U": "Yes",
    mc: 4,
  },
  {
    code: "PS1101E",
    name: "Introduction to Politics",
    "S/U": "Yes",
    mc: 4,
  },
];
