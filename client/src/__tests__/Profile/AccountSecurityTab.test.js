import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { AccountSecurityTabFrame } from "../../Profile/AccountSecurityTab";
import axios from "axios";

const userProfile = {
  username: "testuser",
  email: "test@example.com",
};

describe("AccountSecurityTabFrame", () => {
  test("should pre-fill fields with correct user data", () => {
    render(<AccountSecurityTabFrame userProfile={userProfile} />);
    expect(screen.getByText("Edit Username")).toBeInTheDocument();
    expect(screen.getByText("Edit Password")).toBeInTheDocument();
    expect(screen.getByText("Edit Recovery Email")).toBeInTheDocument();

    const usernameInput = screen.getByLabelText("Username *");
    expect(usernameInput).toHaveValue("testuser");

    const emailInput = screen.getByLabelText("Recovery Email *");
    expect(emailInput).toHaveValue("test@example.com");
  });

  test("edit button toggles editable state", () => {
    render(<AccountSecurityTabFrame userProfile={userProfile} />);
    const editButton = screen.getByTestId("edit-button");
    const inputLabels = ["Password *", "Recovery Email *"];

    inputLabels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeDisabled();
    });

    fireEvent.click(editButton);

    inputLabels.forEach((label) => {
      expect(screen.getByLabelText(label)).not.toBeDisabled();
    });
  });

  test("should update account details on save button click", async () => {
    render(<AccountSecurityTabFrame userProfile={userProfile} />);
    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    const passwordInput = screen.getByLabelText("Password *");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password *");
    fireEvent.change(passwordInput, { target: { value: "newpassword" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "newpassword" },
    });

    const recoveryEmailInput = screen.getByLabelText("Recovery Email *");
    fireEvent.change(recoveryEmailInput, {
      target: { value: "newemail@example.com" },
    });

    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);

    await waitFor(() =>
      screen.getByText("Account details updated successfully!")
    );

    expect(
      screen.getByText("Account details updated successfully!")
    ).toBeInTheDocument();
  });
});
