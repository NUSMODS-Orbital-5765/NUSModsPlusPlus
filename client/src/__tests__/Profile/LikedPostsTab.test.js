import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import LikedPostsTab, { LikedPostsTabFrame } from "../../Profile/LikedPostsTab";
import MyPostsTab, { MyPostsTabFrame } from "../../Profile/MyPostsTab";
import axios from "axios";

jest.mock("../../Community/CommunityDefaultPost", () => () => (
  <div>Mocked CommunityDefaultPost</div>
));

describe("MyPostsTabFrame", () => {
  test("render components correctly", () => {
    render(<MyPostsTabFrame postList={undefined} />);
    expect(screen.getByText(/My Posts/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort By/i)).toBeInTheDocument();
    expect(screen.getByText(/Filter By/i)).toBeInTheDocument();
  });

  test("should display 'NoPostsPlaceholder' when postList is undefined", () => {
    const { getByText } = render(<MyPostsTabFrame postList={undefined} />);
    const noPostsPlaceholder = getByText("No Posts Yet");
    expect(noPostsPlaceholder).toBeInTheDocument();
  });

  test("should display 'PostsList' when postList is provided", () => {
    const postList = [
      { id: 1, title: "Post 1", content: "Content 1" },
      { id: 2, title: "Post 2", content: "Content 2" },
    ];

    render(<MyPostsTabFrame postList={postList} />);
    expect(screen.queryAllByText(/Mocked CommunityDefaultPost/i)).length === 2;
  });
});
