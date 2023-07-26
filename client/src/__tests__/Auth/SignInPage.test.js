import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import SignInPage, { SignUpDialog } from "../../SignInPage";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import axiosMock from "axios-mock-adapter";

jest.mock("../../StyledComponents/WelcomeCarousel", () => {
  return jest.fn(() => <div>Mocked WelcomeCarousel</div>);
});

describe("SignInPage", () => {
  test("sign in page components rendered correctly", () => {
    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    );

    // tests that the carousel and headers are present
    expect(screen.getByText(/Mocked WelcomeCarousel/i)).toBeInTheDocument();
    expect(screen.getByText(/Plan well, score well/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you new here?/i)).toBeInTheDocument();
    expect(screen.getByTestId("sign-up-button")).toBeInTheDocument();

    // tests that the input fields are present
    const userStatusSelect = screen.getAllByText("I am a...");
    expect(userStatusSelect).length !== 0;
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Forgot Password?")).toBeInTheDocument();

    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });

  test("sign up button opens the sign up dialog", () => {
    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    );

    const signUpButton = screen.getByTestId("sign-up-button");
    fireEvent.click(signUpButton);
    expect(screen.getByText("Join the community today.")).toBeInTheDocument();
  });

  test("password visibility successfully toggled", () => {
    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(/Password/i);
    const togglePasswordButton = screen.getByTestId(
      "password-visibility-button"
    );

    expect(passwordInput).toHaveAttribute("type", "text");
    fireEvent.click(togglePasswordButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("success message on successful login", async () => {
    const axiosMockInstance = new axiosMock(axios);
    axiosMockInstance
      .onPost(`${process.env.REACT_APP_API_LINK}/login`)
      .reply(200, { token: "valid_token" });

    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    );

    const statusSelect = screen.getByTestId("status-input");
    userEvent.click(statusSelect);
    userEvent.type(statusSelect, "{enter}");
    const studentOption = screen.getByText("Student");
    userEvent.click(studentOption);
    userEvent.click(document.body);

    userEvent.type(screen.getByLabelText("Username"), "john_doe");
    userEvent.type(screen.getByLabelText("Password"), "password");
    fireEvent.click(screen.getByTestId("login-button"));

    const successMessage = await screen.findByText("Signed in successfully!");
    expect(successMessage).toBeInTheDocument();
  });

  test("invalid message if invalid credentials", async () => {
    const axiosMockInstance = new axiosMock(axios);
    axiosMockInstance
      .onPost(`${process.env.REACT_APP_API_LINK}/login`)
      .reply(401, { error: "Invalid username or password" });

    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    );

    const statusSelect = screen.getByTestId("status-input");
    userEvent.click(statusSelect);
    userEvent.type(statusSelect, "{enter}");
    const studentOption = screen.getByText("Student");
    userEvent.click(studentOption);
    userEvent.click(document.body);

    userEvent.type(screen.getByLabelText("Username"), "john_doe");
    userEvent.type(screen.getByLabelText("Password"), "password");
    fireEvent.click(screen.getByTestId("login-button"));

    const invalidMessage = await screen.findByText(
      "Invalid username or password!"
    );
    expect(invalidMessage).toBeInTheDocument();
  });

  test("error message if no token", async () => {
    const axiosMockInstance = new axiosMock(axios);
    axiosMockInstance
      .onPost(`${process.env.REACT_APP_API_LINK}/login`)
      .reply(200, { token: null });

    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    );

    const statusSelect = screen.getByTestId("status-input");
    userEvent.click(statusSelect);
    userEvent.type(statusSelect, "{enter}");
    const studentOption = screen.getByText("Student");
    userEvent.click(studentOption);
    userEvent.click(document.body);

    userEvent.type(screen.getByLabelText("Username"), "john_doe");
    userEvent.type(screen.getByLabelText("Password"), "password");
    fireEvent.click(screen.getByTestId("login-button"));

    const errorMessage = await screen.findByText(
      "Sign in failed. Please try again after some time."
    );
    expect(errorMessage).toBeInTheDocument();
  });
});

describe("SignUpDialog", () => {
  test("sign up dialog components rendered correctly", () => {
    render(
      <MemoryRouter>
        <SignUpDialog />
      </MemoryRouter>
    );

    const signUpButton = screen.getByTestId("sign-up-button");
    fireEvent.click(signUpButton);

    expect(screen.getByText(/Join the community today./i)).toBeInTheDocument();
    expect(screen.getByText(/Please select an option./i)).toBeInTheDocument();
    expect(screen.getAllByText(/I'm signing up as a.../i)).length !== 0;
    expect(screen.getByTestId("go-to-signup-button")).toBeInTheDocument();
  });
  // cant test which page user navigates to upon clicking "Go"
});
