import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MiniPost } from "../../Home/HomePageRecommendedPosts";
import HomePageRecommendedPosts from "../../Home/HomePageRecommendedPosts";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockPost = {
  title: "Test Post",
  dateCreated: new Date().toISOString(),
  author: {
    username: "test_user",
    avatar: "test_avatar_url",
  },
  category: "Test Category",
  likeAmount: 10,
  comments: 5,
  tags: ["tag 1, tag 2"],
  upload_file: [""],
};

describe("MiniPost", () => {
  test("Mini Post renders correctly", () => {
    render(<MiniPost post={mockPost} />);

    // check if the content renders correctly
    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByText("test_user")).toBeInTheDocument();
  });

  test("like button click toggles like amount", () => {
    render(<MiniPost post={mockPost} />);

    const likeButton = screen.getByTestId("like-button");
    expect(screen.getByText(mockPost.likeAmount)).toBeInTheDocument();

    fireEvent.click(likeButton);
    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.getByText(/Related/i)).toBeInTheDocument(); // post will open as well
    fireEvent.click(document.body);

    // back to original
    fireEvent.click(likeButton);
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});

const mockAxios = new MockAdapter(axios);

describe("HomePageRecommendedPosts", () => {
  test("recommended posts component renders correctly", async () => {
    const mockResponse = {
      topPostList: [],
    };
    mockAxios
      .onPost(`${process.env.REACT_APP_API_LINK}/post/top`)
      .reply(200, mockResponse);

    render(
      <MemoryRouter>
        <HomePageRecommendedPosts />
      </MemoryRouter>
    );

    await screen.findByText("What's Trending");

    expect(screen.getByText("What's Trending")).toBeInTheDocument();

    const link = screen.getByTestId("see-more-button");
    expect(link).toHaveAttribute("href", "/community");
    // can't test whether the carousel component is present
  });
});
