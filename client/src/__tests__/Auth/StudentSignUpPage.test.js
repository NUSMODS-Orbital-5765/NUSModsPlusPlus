import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import StudentSignUpPage from "../../SignUp/StudentSignUpPage";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import axiosMock from "axios-mock-adapter";
import { FormFacultyMajorField } from "../../FormStyledComponents";

describe("StudentSignUpPage", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <StudentSignUpPage />
      </MemoryRouter>
    );
  });

  test("renders the component", () => {
    expect(
      screen.getByText("Welcome! Let's get you settled.")
    ).toBeInTheDocument();
  });

  // testing logo render
  test("logo appears on screen", () => {
    expect(screen.getByAltText("nusmods_logo")).toBeInTheDocument();
  });

  // testing subheader render
  test("subheaders appear on screen", () => {
    expect(screen.getByText("General Information")).toBeInTheDocument();
    expect(screen.getByText("Account Information")).toBeInTheDocument();
    expect(screen.getByText("Academic Information")).toBeInTheDocument();
  });

  // testing input fields render
  test("input fields appear on screen", () => {
    expect(screen.getByLabelText("Name *")).toBeInTheDocument();
    expect(screen.getByLabelText("StudentID *")).toBeInTheDocument();
    expect(screen.getByLabelText("Username *")).toBeInTheDocument();
    expect(screen.getByLabelText("Password *")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password *")).toBeInTheDocument();
    expect(screen.getByLabelText("Recovery Email *")).toBeInTheDocument();
    expect(screen.getByTestId("faculty-field")).toBeInTheDocument();
    expect(screen.getAllByText("Academic Plan")).length !== 0;
    expect(screen.getAllByText("Minors (if any)")).length !== 0;
    expect(screen.getAllByText("Special Programme (if any)")).length !== 0;
  });

  // cannot test for form completion
});
