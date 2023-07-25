import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CommunityHeader } from "../../Community/CommunityPage";
import CommunityPage from "../../Community/CommunityPage";
import { MemoryRouter } from "react-router-dom";
import { formatDate } from "../../Constants";
import axios from "axios";

jest.mock("../../UploadPost/UploadPost", () => {
  return jest.fn(() => <div>Mocked UploadPost</div>);
});

describe("CommunityHeader", () => {
  test("community header is rendered correctly", () => {
    render(
      <MemoryRouter>
        <CommunityHeader />
      </MemoryRouter>
    );

    expect(screen.getByText(/The best study resources/i)).toBeInTheDocument();
    expect(screen.getByText(/By you, for you/i)).toBeInTheDocument();
    expect(screen.getByText(/Make your first post today/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked UploadPost/i)).toBeInTheDocument();
    expect(screen.getByAltText("Community Header")).toBeInTheDocument();
  });
});

// mock components just to check rendering
jest.mock("../../AppBar/AppBarComponent", () => {
  return jest.fn(() => <div>Mocked AppBarComponent</div>);
});

jest.mock("../../Drawer/DrawerComponent", () => {
  return jest.fn(() => <div>Mocked DrawerComponent</div>);
});

jest.mock("../../Community/PostsGrid", () => {
  return jest.fn(() => <div>Mocked PostsGrid</div>);
});

jest.mock("../../Community/PostsRow", () => {
  return jest.fn(() => <div>Mocked PostsRow</div>);
});

const mockPostList = [
  {
    id: "post123",
    dateCreated: new Date(),
    title: "This is a sample post title",
    author: { avatar: "sample_avatar.png", username: "john.doe" },
    category: "Module Review",
    tags: ["Sample Tag 1", "Sample Tag 2"],
    content: "This is a sample post content.",
    upload_file: ["samplefile.pdf"],
    likeAmount: 7,
    comments: 6,
    like: [],
  },
];

describe("CommunityPage", () => {
  test("community page is rendered correctly", () => {
    render(
      <MemoryRouter>
        <CommunityPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Mocked AppBarComponent/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked DrawerComponent/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Search post titles or tags.../i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Sort By/i)).toBeInTheDocument();
    expect(screen.getByText(/Filter By/i)).toBeInTheDocument();

    const paginationElement = screen.getByRole("navigation");
    expect(paginationElement).toBeInTheDocument();
  });

  test("no posts placeholder displayed when posts are empty", () => {
    jest
      .spyOn(axios, "post")
      .mockResolvedValue({ data: { postList: undefined } });

    render(
      <MemoryRouter>
        <CommunityPage />
      </MemoryRouter>
    );

    const noPostsPlaceholderElement = screen.getByText(/No Posts Yet/i);
    expect(noPostsPlaceholderElement).toBeInTheDocument();
  });

  test("all posts rendered if postList received", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({ data: { postList: [] } });

    await act(async () => {
      render(
        <MemoryRouter>
          <CommunityPage />
        </MemoryRouter>
      );
    });

    const postsGridElement = screen.getByText(/Mocked PostsGrid/i);
    expect(postsGridElement).toBeInTheDocument();
  });

  // not sure why but unable to test if top posts can be rendered
  // cant test the sort/filter function i think, will cover in integration testing
});
