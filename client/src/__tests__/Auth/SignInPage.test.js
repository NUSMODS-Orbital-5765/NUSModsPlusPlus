import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import SignInPage, { SignUpDialog } from "../../SignInPage";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../AppBar/AppBarNotifs", () => {
  return jest.fn(() => <div>Mocked AppBarNotifs</div>);
});

describe("SignInPage", () => {
  test("sign in page components rendered correctly", () => {
    render(<SignInPage />);
  });
});
