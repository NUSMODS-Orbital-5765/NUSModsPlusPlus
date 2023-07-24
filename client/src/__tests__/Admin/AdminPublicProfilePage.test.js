import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AdminPublicProfilePage, {
  AdminPublicProfileView,
} from "../../Admin/AdminPublicProfilePage";

// mock the problematic components
jest.mock("../../Admin/AdminAppBar", () => () => <div>Mocked AdminAppBar</div>);

jest.mock("../../Admin/AdminDrawerComponent", () => () => (
  <div>Mocked AdminDrawerComponent</div>
));

const mockAdminProfile = {
  name: "John Doe",
  avatar: "sample_avatar_1.png",
  department: "Faculty of Science",
};

describe("AdminPublicProfileView", () => {
  test("renders the admin public profile view", () => {
    render(<AdminPublicProfileView adminProfile={mockAdminProfile} />);

    // tests that the component renders correctly with the necessary information
    expect(screen.getByText(mockAdminProfile.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Admin • ${mockAdminProfile.department}`)
    ).toBeInTheDocument();

    // tests that the image is properly rendered with the correct url
    const avatarImage = screen.getByAltText("Admin Icon");
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage.getAttribute("src")).toEqual(mockAdminProfile.avatar);
  });
});
