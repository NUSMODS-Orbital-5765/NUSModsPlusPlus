import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import AppBarNotifs, {
  NotifCount,
  DefaultNotif,
} from "../../AppBar/AppBarNotifs";
import { MemoryRouter, Route } from "react-router-dom";
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

jest.mock("../../UserProfileView", () => {
  return jest.fn(() => <div>Mocked UserProfileView</div>);
});

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
  // the user profile view will be tested separately as public profile view has many components rendered within
  test("avatar click on mention notif opens user profile", () => {
    render(
      <MemoryRouter>
        <DefaultNotif notif={mockMentionNotif} />
      </MemoryRouter>
    );

    const viewProfileButton = screen.getByTestId("avatar-click");
    expect(viewProfileButton).toBeInTheDocument();

    fireEvent.click(viewProfileButton);
    expect(screen.getByText(/Mocked UserProfileView/i)).toBeInTheDocument();
  });

  test("avatar click on like notif opens user profile", () => {
    render(
      <MemoryRouter>
        <DefaultNotif notif={mockLikeNotif} />
      </MemoryRouter>
    );

    const viewProfileButton = screen.getByTestId("avatar-click");
    expect(viewProfileButton).toBeInTheDocument();

    fireEvent.click(viewProfileButton);
    expect(screen.getByText(/Mocked UserProfileView/i)).toBeInTheDocument();
  });
});

// get last week date
const currentDate = new Date();
const lastWeekDate = new Date();
const thisWeekDate = new Date();
thisWeekDate.setDate(currentDate.getDate() - 1);
lastWeekDate.setDate(currentDate.getDate() - 7);

// edit the timestamp for current rendering
mockLikeNotif.timestamp = thisWeekDate.toISOString();
const mockNotifList = [mockMentionNotif, mockLikeNotif];
const mockAdminNotifList = [
  {
    type: "mention",
    content: "This is a sample notification content.",
    target: {
      username: "john.doe",
      avatar: "sample_avatar.png",
    },
    timestamp: new Date().toISOString(),
  },
  {
    type: "approve",
    content: "",
    target: {
      username: "jane.doe",
      avatar: "sample_avatar1.png",
    },
    timestamp: new Date().toISOString(),
  },
];

// not including any past notifs because want to check if empty arrays are handled properly
describe("AppBarNotifsComponent", () => {
  test("renders app bar notifs correctly", () => {
    render(
      <MemoryRouter>
        <AppBarNotifs notifsList={mockNotifList} appBarType="student" />
      </MemoryRouter>
    );

    const todayTabBadge = screen.getByTestId("notif-badge");
    expect(todayTabBadge).toBeInTheDocument();

    const notifButton = screen.getByTestId("notif-button");
    expect(notifButton).toBeInTheDocument();

    const notifIcon = screen.getByTestId("EmailRoundedIcon");
    expect(notifIcon).toBeInTheDocument();
  });

  test("no badge if no notifs today", () => {
    render(
      <MemoryRouter>
        <AppBarNotifs notifsList={[mockLikeNotif]} appBarType="student" />
      </MemoryRouter>
    );

    const todayTabBadge = screen.queryAllByTestId("notif-badge");
    expect(todayTabBadge).toHaveLength(0);

    const notifButton = screen.getByTestId("notif-button");
    expect(notifButton).toBeInTheDocument();

    const notifIcon = screen.getByTestId("MarkEmailReadRoundedIcon");
    expect(notifIcon).toBeInTheDocument();
  });

  test("notif drawer opens on icon button click", () => {
    render(
      <MemoryRouter>
        <AppBarNotifs notifsList={mockNotifList} appBarType="student" />
      </MemoryRouter>
    );

    // drawer is initially closed
    const notifButton = screen.getByTestId("notif-button");
    const checkDrawer = screen.queryAllByTestId("notif-drawer");
    expect(checkDrawer).toHaveLength(0);

    // expect drawer to open when notif button is clicked
    fireEvent.click(notifButton);
    const drawer = screen.getByTestId("notif-drawer");
    expect(drawer).toBeInTheDocument();

    // expect tabs to be rendered
    const tabs = screen.queryByRole("tablist");
    expect(tabs).toBeInTheDocument();

    // ensure that the drawer closes when clicking outside of it
    fireEvent.click(document.body);
    expect(checkDrawer).toHaveLength(0);
  });

  test("check if student notifs are rendered for student appbar", () => {
    render(
      <MemoryRouter>
        <AppBarNotifs notifsList={mockNotifList} appBarType="student" />
      </MemoryRouter>
    );

    // drawer is initially closed
    const notifButton = screen.getByTestId("notif-button");
    fireEvent.click(notifButton);

    expect(screen.getByText(/Inbox/i)).toBeInTheDocument();
  });

  test("check if admin notifs are rendered for admin appbar", () => {
    render(
      <MemoryRouter>
        <AppBarNotifs notifsList={mockAdminNotifList} appBarType="admin" />
      </MemoryRouter>
    );

    // drawer is initially closed
    const notifButton = screen.getByTestId("notif-button");
    fireEvent.click(notifButton);

    expect(screen.getByText(/Recent Activity/i)).toBeInTheDocument();
  });

  test("today notifications filtered correctly", () => {
    render(
      <MemoryRouter>
        <AppBarNotifs notifsList={mockNotifList} appBarType="student" />
      </MemoryRouter>
    );

    const notifButton = screen.getByTestId("notif-button");
    fireEvent.click(notifButton);

    const todayTab = screen.getByRole("tab", { name: /Today/i });
    fireEvent.click(todayTab);

    const mentionNotif = screen.getByText(
      "This is a sample notification content."
    );
    expect(mentionNotif).toBeInTheDocument();
  });

  test("this week notifications filtered correctly", () => {
    render(
      <MemoryRouter>
        <AppBarNotifs notifsList={mockNotifList} appBarType="student" />
      </MemoryRouter>
    );

    const notifButton = screen.getByTestId("notif-button");
    fireEvent.click(notifButton);

    const thisWeekTab = screen.getByRole("tab", { name: /This Week/i });
    fireEvent.click(thisWeekTab);

    const likeNotif = screen.getByText(/liked your post/i);
    expect(likeNotif).toBeInTheDocument();

    // check that mention notif is not inside
    expect(screen.queryAllByText(/mentioned you/i)).toHaveLength(0);
  });

  test("past notifications filtered correctly", () => {
    render(
      <MemoryRouter>
        <AppBarNotifs notifsList={mockNotifList} appBarType="student" />
      </MemoryRouter>
    );

    const notifButton = screen.getByTestId("notif-button");
    fireEvent.click(notifButton);

    const pastTab = screen.getByRole("tab", { name: /Past/i });
    fireEvent.click(pastTab);

    // check that there are no notifs
    expect(screen.queryAllByText(/liked your post/i)).toHaveLength(0);
    expect(screen.queryAllByText(/mentioned you/i)).toHaveLength(0);
  });
});
