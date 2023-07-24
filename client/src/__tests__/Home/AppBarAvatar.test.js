import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppBarAvatar from "../../AppBar/AppBarAvatar";
import { MemoryRouter } from "react-router-dom";

// mock avatar items for testing
const mockAvatarItems = [
  {
    label: "Profile",
    icon: <span data-testid="icon-1">Icon 1</span>,
    link: "/profile",
  },
  {
    label: "Settings",
    icon: <span data-testid="icon-2">Icon 2</span>,
    link: "/settings",
  },
];

// render component before each test
beforeEach(() => {
  render(
    <MemoryRouter>
      <AppBarAvatar avatarItems={mockAvatarItems} />
    </MemoryRouter>
  );
});

describe("AppBarAvatar", () => {
  test("app bar renders correctly", () => {
    // ensure that the menu is null at first
    const menu = screen.queryByRole("menu");
    expect(menu).toBeNull();

    // ensure that the sample icon is present at first
    const avatarIcon = screen.getByAltText("Sample Icon");
    expect(avatarIcon).toBeInTheDocument();
    expect(screen.getByTestId("badge")).toBeInTheDocument();
  });

  // ensure that the app bar component opens when the avatar is clicked
  test("menu opens on avatar click", () => {
    // mock the local storage to retrieve name and username
    // picture still cannot be retrieved, so just checking for presence of sample icon
    localStorage.setItem("name", "John Doe");
    localStorage.setItem("username", "john_doe");

    // click the avatar
    expect(screen.getByTestId("avatar-button")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("avatar-button"));

    // ensure that the menu is open now
    const menu = screen.queryByRole("menu");
    expect(menu).toBeInTheDocument();

    // ensure that the name, username can be seen
    expect(screen.getByAltText("Sample Icon")).toBeInTheDocument();
    expect(screen.getByText(/Signed in as/i)).toBeInTheDocument();
  });

  // ensure that the avatarItems have the correct href and are rendered in the menu
  test("menu items are correctly rendered", () => {
    // mock the local storage to retrieve name and username
    // picture still cannot be retrieved, so just checking for presence of sample icon
    localStorage.setItem("name", "John Doe");
    localStorage.setItem("username", "john_doe");

    fireEvent.click(screen.getByTestId("avatar-button"));

    // tests that the labels, icons and links are mapped correctly
    const menuItem1 = screen.getByText("Profile");
    expect(menuItem1).toBeInTheDocument();
    expect(menuItem1.closest("a")).toHaveAttribute("href", "/profile");

    const menuItem2 = screen.getByText("Settings");
    expect(menuItem2).toBeInTheDocument();
    expect(menuItem2.closest("a")).toHaveAttribute("href", "/settings");
  });
});
