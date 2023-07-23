import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import AdminSignUpPage from "../AdminSignUpPage";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import axiosMock from "axios-mock-adapter";

// render component before each test
beforeEach(() => {
  render(
    <MemoryRouter>
      <AdminSignUpPage />
    </MemoryRouter>
  );
});

describe("AdminSignUpPage", () => {
  // testing component rendering
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
    expect(screen.getByText("Staff Information")).toBeInTheDocument();
  });

  // testing required form fields update
  const requiredFields = [
    { label: "Name *", input: "John Doe" },
    { label: "Staff ID *", input: "123456" },
    { label: "Position *", input: "john" },
    { label: "Secret Code *", input: "admin" },
  ];

  test.each(requiredFields)(
    "correctly updates required input field, error if empty",
    ({ label, input }) => {
      const inputField = screen.getByLabelText(label);
      fireEvent.change(inputField, { target: { value: input } });
      expect(inputField).toHaveValue(input);
      fireEvent.blur(inputField);
      expect(screen.queryByText("Field cannot be empty")).toBeNull();

      fireEvent.change(inputField, { target: { value: "" } });
      expect(inputField).toHaveValue("");
      fireEvent.blur(inputField);
      expect(screen.queryByText("Field cannot be empty")).toBeInTheDocument();
    }
  );

  // input restricted fields testing and error handling
  const restrictedFields = [
    {
      label: "Username *",
      errorMessage:
        "Username must contain at least 8 characters, and no special characters",
      validInput: "aDmin123",
      invalidInputs: ["admin123!", "admin12"],
    },
    {
      label: "Password *",
      errorMessage:
        "Password must contain at least 8 characters, and at least one special character",
      validInput: "aA12345!",
      invalidInputs: ["aA12346", "aA1234!"],
    },
    {
      label: "Recovery Email *",
      errorMessage: "Invalid email format",
      validInput: "admin@a.d",
      invalidInputs: ["admin@.d", "admin.d"],
    },
  ];

  test.each(restrictedFields)(
    "updates restricted input field correctly with valid input",
    ({ label, errorMessage, validInput, invalidInputs }) => {
      const inputField = screen.getByLabelText(label);
      fireEvent.change(inputField, { target: { value: validInput } });
      expect(inputField).toHaveValue(validInput);
      fireEvent.blur(inputField);
      expect(screen.queryByText(errorMessage)).toBeNull();

      invalidInputs.forEach((invalidInput) => {
        fireEvent.change(inputField, { target: { value: invalidInput } });
        expect(inputField).toHaveValue(invalidInput);
        fireEvent.blur(inputField);
        expect(screen.queryByText(errorMessage)).toBeInTheDocument();
      });
    }
  );

  // test confirm password matching
  test("correctly matches confirm password with password, error if otherwise", () => {
    const passwordInput = screen.getByLabelText("Password *");
    fireEvent.change(passwordInput, { target: { value: "aA12345!" } });
    expect(passwordInput).toHaveValue("aA12345!");

    const confirmPasswordInput = screen.getByLabelText("Confirm Password *");
    fireEvent.change(confirmPasswordInput, { target: { value: "aA123456!" } });
    expect(confirmPasswordInput).toHaveValue("aA123456!");
    fireEvent.blur(confirmPasswordInput);
    expect(screen.queryByText("Passwords do not match")).toBeInTheDocument();

    fireEvent.change(confirmPasswordInput, {
      target: { value: "aA12345!" },
    });
    expect(confirmPasswordInput).toHaveValue("aA12345!");
    fireEvent.blur(confirmPasswordInput);
    expect(screen.queryByText("Passwords do not match")).toBeNull();
  });

  // test autocomplete
  test("department input field updates correctly", () => {
    const departmentInput = screen.getByLabelText("Department");
    userEvent.type(departmentInput, "Faculty of");
    userEvent.type(departmentInput, "{arrowdown}");
    userEvent.type(departmentInput, "{enter}");
    expect(departmentInput.value).toEqual(
      "Faculty of Arts and Social Sciences"
    );
  });

  // testing form submit
  test("enable submit button if form is complete, disable if wrong secret code", () => {
    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();

    const usernameInput = screen.getByLabelText("Username *");
    fireEvent.change(usernameInput, { target: { value: "" } });

    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText("Name *"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Staff ID *"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText("Username *"), {
      target: { value: "aDmin123" },
    });
    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "aA12345!" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password *"), {
      target: { value: "aA12345!" },
    });
    fireEvent.change(screen.getByLabelText("Recovery Email *"), {
      target: { value: "admin@a.d" },
    });

    const departmentInput = screen.getByLabelText("Department");
    userEvent.type(departmentInput, "Faculty of");
    userEvent.type(departmentInput, "{arrowdown}");
    userEvent.type(departmentInput, "{enter}");

    fireEvent.change(screen.getByLabelText("Position *"), {
      target: { value: "john" },
    });
    fireEvent.change(screen.getByLabelText("Secret Code *"), {
      target: { value: "adminuser123" },
    });

    expect(submitButton).toBeEnabled();

    fireEvent.change(screen.getByLabelText("Secret Code *"), {
      target: { value: "adminuser12" },
    });

    expect(submitButton).toBeDisabled();
  });

  // mock API call
  /*
  jest.mock("axios");

  test("should handle form submission correctly", async () => {
    const mockResponse = { data: { message: "Success" } };
    axios.post.mockResolvedValue(mockResponse);

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await screen.findByText("Success");

    expect(screen.getByText("Success")).toBeInTheDocument();
  });
  */
});
