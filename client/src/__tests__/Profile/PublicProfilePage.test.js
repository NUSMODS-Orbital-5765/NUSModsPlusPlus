import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByText,
  getByAltText,
} from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import PublicProfilePage, {
  PublicProfileHeader,
  PublicProfileView,
} from "../../Profile/PublicProfilePage";

jest.mock("../../Community/CommunityDefaultPost", () => () => (
  <div>Mocked CommunityDefaultPost</div>
));

const sampleProfile = {
  name: "John Doe",
  avatar: "sample_avatar.png",
  faculty: "Faculty of Science",
  primaryDegree: "Chemistry",
  secondDegree: "Biology",
  minor: ["Mathematics", "Physics"],
  programme: "Test Programme",
};

const mockProfile = {
  name: "John Doe",
  avatar: "sample_avatar.png",
  faculty: "Faculty of Science",
  primaryDegree: "Chemistry",
  secondMajor: "Mathematics",
  minor: ["Physics"],
  programme: "",
};

describe("PublicProfileHeader", () => {
  test("public profile header renders correctly", () => {
    render(<PublicProfileHeader sampleProfile={sampleProfile} />);
    expect(screen.getByText(sampleProfile.name)).toBeInTheDocument();
    const avatarImage = screen.getByAltText("Sample Icon");
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage.getAttribute("src")).toEqual(sampleProfile.avatar);

    expect(screen.getByText(sampleProfile.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Student • ${sampleProfile.primaryDegree}`)
    ).toBeInTheDocument();
  });
});

describe("PublicProfileView", () => {
  test("public profile view renders correctly", () => {
    render(<PublicProfileView sampleProfile={sampleProfile} />);
    expect(screen.getByText(sampleProfile.name)).toBeInTheDocument();
    const avatarImage = screen.getByAltText("Sample Icon");
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage.getAttribute("src")).toEqual(sampleProfile.avatar);

    expect(screen.getByText(sampleProfile.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Student • ${sampleProfile.primaryDegree}`)
    ).toBeInTheDocument();

    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  test("about info list renders correctly", () => {
    render(<PublicProfileView sampleProfile={sampleProfile} />);

    expect(screen.getByText(/Faculty of Science/i)).toBeInTheDocument();
    expect(screen.getByText(/in Chemistry and Biology/i)).toBeInTheDocument();
    expect(screen.getByText(/Double Degree/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Minor/)).toBeInTheDocument();
    expect(screen.getByText(/in Mathematics, Physics/)).toBeInTheDocument();
    expect(screen.queryByText("Major")).toBeNull();
    expect(screen.getByText("Test Programme")).toBeInTheDocument();
  });

  test("about info list renders correctly", () => {
    render(<PublicProfileView sampleProfile={mockProfile} />);

    expect(screen.getByText(/Faculty of Science/i)).toBeInTheDocument();
    expect(
      screen.getByText(/in Chemistry and Mathematics/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Double Major/)).toBeInTheDocument();
    expect(screen.queryByText("Test Programme")).toBeNull();
    expect(screen.queryByText("Degree")).toBeNull();

    expect(screen.getByText(/Minor/)).toBeInTheDocument();
    expect(screen.getByText(/in Physics/)).toBeInTheDocument();
  });
});
