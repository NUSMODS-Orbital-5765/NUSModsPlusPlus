import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import AppBarNotifs from "../../AppBar/AppBarNotifs";
import AppBarAvatar from "../../AppBar/AppBarAvatar";
import AppBarComponent from "../../AppBar/AppBarComponent";

jest.mock("../../AppBar/AppBarNotifs", () => {
  return jest.fn(() => <div>Mocked AppBarNotifs</div>);
});

jest.mock("../../AppBar/AppBarAvatar", () => {
  return jest.fn(() => <div>Mocked AppBarAvatar</div>);
});

describe("AppBarComponent", () => {
  test("app bar component renders correctly", () => {
    render(
      <MemoryRouter>
        <AppBarComponent />
      </MemoryRouter>
    );

    expect(screen.getByText(/Mocked AppBarNotifs/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked AppBarAvatar/i)).toBeInTheDocument();
    const searchBarInput = screen.getByLabelText("Search + Enter");
    expect(searchBarInput).toBeInTheDocument();
  });
});
