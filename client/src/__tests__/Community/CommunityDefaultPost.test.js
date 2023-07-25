import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CommunityDefaultPost, {
  CommunityPostDialog,
} from "../../Community/CommunityDefaultPost";
import { MemoryRouter } from "react-router-dom";
import { formatDate } from "../../Constants";
import axios from "axios";
import CommunityPostComments from "../../Community/CommunityPostComments";

jest.mock("../../libs/AWSLinkGenerate", () => {
  return (fileName) => {
    return `https://example.com/${fileName}`;
  };
});

jest.mock("axios");
axios.post.mockResolvedValue({ data: { id: "mockCommentId" } });

const mockCloseFunction = jest.fn();

const mockPost = {
  id: "post123",
  dateCreated: new Date(),
  title: "This is a sample post title",
  author: { avatar: "sample_avatar.png", username: "john.doe" },
  category: "Module Review",
  tags: ["Sample Tag 1", "Sample Tag 2"],
  content: "This is a sample post content.",
  upload_file: ["samplefile.pdf"],
};

const mockPostNoFile = {
  id: "post123",
  dateCreated: new Date(),
  title: "This is a sample post title",
  author: { avatar: "sample_avatar.png", username: "john.doe" },
  category: "Module Review",
  tags: ["Sample Tag 1", "Sample Tag 2"],
  content: "This is a sample post content.",
  upload_file: [""],
};

jest.mock("../../Community/CommunityPostComments", () => {
  return () => <div>Mocked CommunityPostComments</div>;
});

describe("CommunityPostDialog", () => {
  test("community post dialog renders correctly", () => {
    render(
      <MemoryRouter>
        <CommunityPostDialog
          post={mockPost}
          openCondition={true}
          closeFunction={() => {}}
        />
      </MemoryRouter>
    );

    // test that the basic post information is rendered correctly
    expect(
      screen.getByText(formatDate(mockPost.dateCreated))
    ).toBeInTheDocument();
    expect(screen.getByText(`${mockPost.title}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockPost.author.username}`)).toBeInTheDocument();
    expect(screen.getByText(/Module Review/i)).toBeInTheDocument();
    expect(screen.getByText(/Related/i)).toBeInTheDocument();
    expect(screen.getByText(`${mockPost.content}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockPost.tags[0]}`)).toBeInTheDocument();
    expect(screen.getByTestId("preview-file-button")).toBeInTheDocument();
    expect(screen.getByLabelText("Add a comment...")).toBeInTheDocument();
    expect(screen.getByTestId("post-comment-button")).toBeInTheDocument();
    expect(
      screen.getByText(/Mocked CommunityPostComments/i)
    ).toBeInTheDocument();

    // check that post author's avatar is correct with correct src
    const avatar = screen.getByAltText("Profile Pic");
    const expectedAvatarSrc = `https://example.com/${mockPost.author.avatar}`;
    expect(avatar).toHaveAttribute("src", expectedAvatarSrc);
  });

  test("preview file button provides correct link", () => {
    render(
      <MemoryRouter>
        <CommunityPostDialog
          post={mockPost}
          openCondition={true}
          closeFunction={() => {}}
        />
      </MemoryRouter>
    );

    // check that preview file button gives the correct link
    const previewFileButton = screen.getByTestId("preview-file-button");
    const expectedFileLink = `https://example.com/${mockPost.upload_file[0]}`;
    fireEvent.click(previewFileButton);
    expect(screen.getByText(expectedFileLink)).toBeInTheDocument();
  });

  // test that the comments textfield is working correctly and that post does call the axios function
  test("post comments functioning correctly", async () => {
    render(
      <MemoryRouter>
        <CommunityPostDialog
          post={mockPost}
          openCondition={true}
          closeFunction={() => {}}
        />
      </MemoryRouter>
    );

    // check that the comment input field updates correctly on change
    const commentInput = screen.getByLabelText("Add a comment...");
    fireEvent.change(commentInput, {
      target: { value: "This is a comment." },
    });

    const postCommentButton = screen.getByTestId("post-comment-button");
    fireEvent.click(postCommentButton);
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(screen.getByText("Comment added successfully!")).toBeInTheDocument();
  });

  // test that the comments textfield is working correctly and that post does call the axios function
  test("error message if empty comment", async () => {
    render(
      <MemoryRouter>
        <CommunityPostDialog
          post={mockPost}
          openCondition={true}
          closeFunction={() => {}}
        />
      </MemoryRouter>
    );

    // check that the comment input field updates correctly on change
    const commentInput = screen.getByLabelText("Add a comment...");
    fireEvent.change(commentInput, {
      target: { value: "This is a comment." },
    });

    fireEvent.change(commentInput, {
      target: { value: "" },
    });

    const postCommentButton = screen.getByTestId("post-comment-button");
    fireEvent.click(postCommentButton);
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(
      screen.getByText("Your comment cannot be empty!")
    ).toBeInTheDocument();
  });

  test("preview file disabled if empty", () => {
    render(
      <MemoryRouter>
        <CommunityPostDialog
          post={mockPostNoFile}
          openCondition={true}
          closeFunction={() => {}}
        />
      </MemoryRouter>
    );

    const previewFileButton = screen.getByTestId("preview-file-button");
    expect(previewFileButton).toBeDisabled();
  });

  test("background click closes post dialog", () => {
    render(
      <MemoryRouter>
        <CommunityPostDialog
          post={mockPostNoFile}
          openCondition={true}
          closeFunction={mockCloseFunction}
        />
      </MemoryRouter>
    );

    const closeButton = screen.getByTestId("close-dialog-button");
    fireEvent.click(closeButton);
    expect(mockCloseFunction).toHaveBeenCalled();
  });
});

describe("CommunityDefaultPost", () => {
  test("community default post renders correctly", () => {
    render(
      <MemoryRouter>
        <CommunityDefaultPost post={mockPost} />
      </MemoryRouter>
    );

    expect(
      screen.getByText(formatDate(mockPost.dateCreated))
    ).toBeInTheDocument();
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
  });
});
