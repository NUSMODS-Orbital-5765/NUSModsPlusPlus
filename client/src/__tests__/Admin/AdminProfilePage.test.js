import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AdminProfilePage from "../../Admin/AdminProfilePage";

// mock the problematic components
jest.mock("../../Admin/AdminAppBar", () => () => <div>Mocked AdminAppBar</div>);

jest.mock("../../Admin/AdminDrawerComponent", () => () => (
  <div>Mocked AdminDrawerComponent</div>
));

// mock the profile picture button
jest.mock("../../Profile/ProfilePictureComponent", () => () => (
  <div>Mocked ProfilePictureComponent</div>
));

// mock the local storage
beforeEach(() => {
  localStorage.setItem("name", "John Doe");
  localStorage.setItem("department", "Faculty of Science");
});

// testing component rendering for admin profile page
describe("AdminProfilePage", () => {
  test("renders the admin profile page ", () => {
    render(
      <MemoryRouter>
        <AdminProfilePage selectedTab={0} />
      </MemoryRouter>
    );

    // test if the header is being rendered
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin • Faculty of Science/i)).toBeInTheDocument();

    // check if the public profile button is rendered
    const publicProfileButton = screen.getByRole("link", {
      // get item by link because cannot see the actual component (is imported)
      href: "/admin/profile/public",
    });
    expect(publicProfileButton).toBeInTheDocument();

    // test if the profile picture button is being rendered
    expect(
      screen.getByText(/Mocked ProfilePictureComponent/i)
    ).toBeInTheDocument();
  });

  // test if the tabs are being rendered
  test("public profile switch cannot be toggled", () => {
    render(
      <MemoryRouter>
        <AdminProfilePage selectedTab={0} />
      </MemoryRouter>
    );

    // get the span within the switch
    const publicSwitch = screen.getByLabelText(
      "Admin profiles must be set to public."
    );
    expect(publicSwitch).toBeInTheDocument();
    const switchBase = publicSwitch.querySelector(".MuiSwitch-switchBase");

    const computedStyle = window.getComputedStyle(switchBase);
    expect(computedStyle.pointerEvents).toBe("none");
  });

  // test if the tabs are being rendered
  test("renders tabs with correct links ", () => {
    render(
      <MemoryRouter>
        <AdminProfilePage selectedTab={0} />
      </MemoryRouter>
    );
    // check that the tabs are rendered
    expect(screen.getByTestId("InfoRoundedIcon")).toBeInTheDocument();
    expect(screen.getByText(/My Info/i)).toBeInTheDocument();

    expect(screen.getByTestId("LockRoundedIcon")).toBeInTheDocument();
    expect(screen.getByText(/Account Security/i)).toBeInTheDocument();

    // check the href of the tabs
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toBeInTheDocument();
    expect(tabs[0].getAttribute("href")).toBe("/admin/profile");

    expect(tabs[1]).toBeInTheDocument();
    expect(tabs[1].getAttribute("href")).toBe("/admin/profile/account");
  });
});
