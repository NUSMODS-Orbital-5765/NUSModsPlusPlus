import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import AppBarNotifs, {
  NotifCount,
  DefaultNotif,
} from "../../AppBar/AppBarNotifs";
import { MemoryRouter, Route } from "react-router-dom";
import UserProfileView from "../../UserProfileView";
import { formatDate } from "../../Constants";
import parseISO from "date-fns/parseISO";
import { getNotifURL } from "../../AppBar/AppBarNotifs";

// test the notif count
describe("NotifCount", () => {
  test("notif count component renders correctly", () => {
    const label = "Notifications";
    const notifListCount = 5;
    const labelColor = "red";

    render(
      <NotifCount
        label={label}
        notifListCount={notifListCount}
        labelColor={labelColor}
      />
    );

    const labelElement = screen.getByText(label);
    const countElement = screen.getByText(notifListCount.toString()); // change the number into a string
    expect(labelElement).toBeInTheDocument();
    expect(countElement).toBeInTheDocument();

    // check that the color prop is applied correctly
    expect(countElement).toHaveStyle({ backgroundColor: labelColor });
  });
});

// we shall test both comment notif and like notif (content & without content and different url)
const mockMentionNotif = {
  type: "mention",
  content: "This is a sample notification content.",
  author: { username: "john.doe", avatar: "sample_avatar.png", role: "ADMIN" },
  timestamp: new Date().toISOString(),
};

const mockLikeNotif = {
  type: "like",
  content: "",
  author: {
    username: "jane.doe",
    avatar: "sample_avatar1.png",
    role: "STUDENT",
  },
  timestamp: new Date().toISOString(),
};

// test the student default notif
// truncated function has already been tested
describe("Default Notif", () => {
  test("default mention notif renders correctly", () => {
    render(
      <MemoryRouter>
        <DefaultNotif notif={mockMentionNotif} />
      </MemoryRouter>
    );

    // test that the username, name, content, notification phrasing are all present
    expect(screen.getByAltText("User Icon")).toBeInTheDocument();
    expect(screen.getByLabelText("View Profile")).toBeInTheDocument();
    expect(screen.getByText(/mentioned you/i)).toBeInTheDocument();

    expect(
      screen.getByText(`${mockMentionNotif.author.username}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText("This is a sample notification content.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatDate(parseISO(mockMentionNotif.timestamp)))
    ).toBeInTheDocument();
    expect(getNotifURL(mockMentionNotif.type)).toBe("/modules");
  });

  test("default like notif renders correctly", () => {
    render(
      <MemoryRouter>
        <DefaultNotif notif={mockLikeNotif} />
      </MemoryRouter>
    );

    expect(screen.getByText(/liked your post/i)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockLikeNotif.author.username}`)
    ).toBeInTheDocument();
    expect(getNotifURL(mockLikeNotif.type)).toBe("/profile/my-posts");
  });

  // check for avatar click for mention
  test("avatar click opens admin profile for mention notif", () => {
    render(
      <MemoryRouter>
        <DefaultNotif notif={mockMentionNotif} />
      </MemoryRouter>
    );

    const viewProfileButton = screen.getByTestId("avatar-click");
    expect(viewProfileButton).toBeInTheDocument();

    fireEvent.click(viewProfileButton);
    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
  });

  // check for avatar click for student
  test("avatar click opens student profile for like notif", () => {
    render(
      <MemoryRouter>
        <DefaultNotif notif={mockLikeNotif} />
      </MemoryRouter>
    );

    const viewProfileButton = screen.getByTestId("avatar-click");
    expect(viewProfileButton).toBeInTheDocument();

    fireEvent.click(viewProfileButton);
    expect(screen.getByText(/Student/i)).toBeInTheDocument();
  });
});

describe("AppBarNotifsComponent", () => {});
