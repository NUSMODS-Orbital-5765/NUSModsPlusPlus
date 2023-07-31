import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ProfilePage from "../../Profile/ProfilePage";

// mock the problematic components
jest.mock("../../AppBar/AppBarComponent", () => {
  return jest.fn(() => <div>Mocked AppBarComponent</div>);
});

jest.mock("../../Drawer/DrawerComponent", () => {
  return jest.fn(() => <div>Mocked DrawerComponent</div>);
});

// mock the profile picture button
jest.mock("../../Profile/ProfilePictureComponent", () => () => (
  <div>Mocked ProfilePictureComponent</div>
));

// mock the local storage
beforeEach(() => {
  localStorage.setItem("name", "John Doe");
  localStorage.setItem("primaryDegree", "Chemistry");
});

// testing component rendering for admin profile page
describe("ProfilePage", () => {
  test("renders the profile page ", () => {
    render(
      <MemoryRouter>
        <ProfilePage selectedTab={0} />
      </MemoryRouter>
    );

    // test if the header is being rendered
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Student • Chemistry/i)).toBeInTheDocument();

    // check if the public profile button is rendered
    const publicProfileButton = screen.getByRole("link", {
      href: "/profile/public",
    });
    expect(publicProfileButton).toBeInTheDocument();

    // test if the profile picture button is being rendered
    expect(
      screen.getByText(/Mocked ProfilePictureComponent/i)
    ).toBeInTheDocument();
  });

  // test if the tabs are being rendered
  test("should make public profile page accessible when the Public switch is toggled", () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );
    const publicProfileButton = screen.getByTestId("public-profile-button");

    expect(screen.queryByText("Private")).toBeInTheDocument();
    const publicSwitch = screen.getByTestId("public-profile-switch");
    fireEvent.click(publicSwitch);
    expect(publicProfileButton).toBeEnabled();
  });

  // test if the tabs are being rendered
  test("renders tabs with correct links ", () => {
    render(
      <MemoryRouter>
        <ProfilePage selectedTab={0} />
      </MemoryRouter>
    );
    // check that the tabs are rendered
    expect(screen.getByTestId("InfoRoundedIcon")).toBeInTheDocument();
    expect(screen.getByText(/My Info/i)).toBeInTheDocument();
    expect(screen.getByTestId("LockRoundedIcon")).toBeInTheDocument();
    expect(screen.getByText(/Account Security/i)).toBeInTheDocument();
    expect(screen.getByTestId("CreateRoundedIcon")).toBeInTheDocument();
    expect(screen.getByText(/My Posts/i)).toBeInTheDocument();
    expect(screen.getByTestId("FavoriteRoundedIcon")).toBeInTheDocument();
    expect(screen.getByText(/Liked Posts/i)).toBeInTheDocument();

    // check the href of the tabs
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toBeInTheDocument();
    expect(tabs[0].getAttribute("href")).toBe("/profile");

    expect(tabs[1]).toBeInTheDocument();
    expect(tabs[1].getAttribute("href")).toBe("/profile/my-posts");
    expect(tabs[2]).toBeInTheDocument();
    expect(tabs[2].getAttribute("href")).toBe("/profile/liked-posts");
    expect(tabs[3]).toBeInTheDocument();
    expect(tabs[3].getAttribute("href")).toBe("/profile/account");
  });
});
