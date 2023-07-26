import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import StudentSignUpPage from "../../SignUp/StudentSignUpPage";
import { MemoryRouter, useNavigate } from "react-router-dom";
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

  test("displays success message after successful sign up", async () => {
    const axiosMockInstance = new axiosMock(axios);
    axiosMockInstance
      .onPost(`${process.env.REACT_APP_API_LINK}/register/user`)
      .reply(200, { success: true });

    fireEvent.change(screen.getByLabelText("Name *"), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByLabelText("StudentID *"), {
      target: { value: "1234567" },
    });

    fireEvent.change(screen.getByLabelText("Username *"), {
      target: { value: "stuD1234" },
    });

    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "password!" },
    });

    fireEvent.change(screen.getByLabelText("Confirm Password *"), {
      target: { value: "password!" },
    });

    fireEvent.change(screen.getByLabelText("Recovery Email *"), {
      target: { value: "student@a.d" },
    });

    const facultySelect = screen.getByTestId("faculty-field");

    userEvent.click(facultySelect);
    userEvent.type(facultySelect, "{enter}");
    const facultyOption = screen.getByText("Faculty of Science");
    userEvent.click(facultyOption);

    userEvent.click(document.body);
    const majorSelect = screen.getByTestId("degree-field");
    userEvent.click(majorSelect);
    userEvent.type(majorSelect, "{enter}");
    const majorOption = screen.getByText("Chemistry");
    userEvent.click(majorOption);

    userEvent.click(document.body);
    fireEvent.click(screen.getByTestId("submit-button"));

    const successMessage = await screen.findByText("Registered successfully!");
    expect(successMessage).toBeInTheDocument();
  });

  test("submit button disabled if sign up incomplete", () => {
    fireEvent.change(screen.getByLabelText("Name *"), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByLabelText("StudentID *"), {
      target: { value: "1234567" },
    });

    fireEvent.change(screen.getByLabelText("Username *"), {
      target: { value: "stuD1234" },
    });

    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "password!" },
    });

    fireEvent.change(screen.getByLabelText("Confirm Password *"), {
      target: { value: "password!" },
    });

    fireEvent.change(screen.getByLabelText("Recovery Email *"), {
      target: { value: "student@a.d" },
    });

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();
  });
});

const setfn = jest.fn();

describe("FormFacultyMajorField", () => {
  test("changing the faculty updates the major options", () => {
    render(<FormFacultyMajorField setfn={setfn} />);

    const facultySelect = screen.getByTestId("faculty-field");

    userEvent.click(facultySelect);
    userEvent.type(facultySelect, "{enter}");
    const facultyOption = screen.getByText("Faculty of Science");
    userEvent.click(facultyOption);
    expect(setfn).toHaveBeenCalled();

    userEvent.click(document.body);

    const majorSelect = screen.getByTestId("degree-field");

    expect(majorSelect).toHaveTextContent("Primary Degree/Major *");
  });
});
