import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { AdminDefaultNotif } from "../../Admin/AdminAppBarNotifs";
import { formatDate, yesterday } from "../../Constants";

// mock the student module profile view
jest.mock("../../StudentModuleProfileView", () => () => (
  <div>Mocked StudentModuleProfileView</div>
));

// check rendering of a sample notification
const sampleNotif = {
  type: "mention",
  student: {
    username: "John Doe",
    avatar: "sample_avatar.jpg",
  },
  content: "This is a sample notification content.",
  timestamp: yesterday,
};

// check rendering of default notif
describe("AdminDefaultNotif", () => {
  test("renders the notification correctly", () => {
    render(<AdminDefaultNotif notif={sampleNotif} />);

    // check the view profile is clickable (tooltip rendered)
    const tooltipElement = screen.getByLabelText("View Profile");
    expect(tooltipElement).toBeInTheDocument();

    // check the notification type
    const notificationTypeElement = screen.getByText(/You mentioned/i);
    const studentElement = screen.getByText(/John Doe/i);
    expect(notificationTypeElement).toBeInTheDocument();
    expect(studentElement).toBeInTheDocument();

    // check the timestamp
    const timestampElement = screen.getByText(
      formatDate(sampleNotif.timestamp)
    );
    expect(timestampElement).toBeInTheDocument();

    // check the content
    const notificationContent = screen.getByText(sampleNotif.content);
    expect(notificationContent).toBeInTheDocument();

    // check the avatar
    const avatarElement = screen.getByAltText("Student Icon");
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement.getAttribute("src")).toEqual(
      sampleNotif.student.avatar
    );
  });

  // testing notification truncation function
  test("truncates long content", () => {
    const longContent =
      "This is a very long notification content that should be truncated to ten words or less.";
    const expectedTruncatedContent =
      "This is a very long notification content that should be...";
    const longContentNotif = {
      ...sampleNotif,
      content: longContent,
    };

    render(<AdminDefaultNotif notif={longContentNotif} />);

    const truncatedContentElement = screen.getByText(expectedTruncatedContent);
    expect(truncatedContentElement).toBeInTheDocument();
  });

  test("displays short content fully", () => {
    const shortContent = "Short content.";
    const shortContentNotif = {
      ...sampleNotif,
      content: shortContent,
    };

    render(<AdminDefaultNotif notif={shortContentNotif} />);

    const fullContentElement = screen.getByText(shortContent);
    expect(fullContentElement).toBeInTheDocument();
  });
});
