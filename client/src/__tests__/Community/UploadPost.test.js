import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { UploadPostForm } from "../../UploadPost/UploadPost";
import UploadPost from "../../UploadPost/UploadPost";
import axios from "axios";
import axiosMock from "axios-mock-adapter";
import UploadPostFile from "../../UploadPost/UploadPostFile";
import PostTagsField from "../../UploadPost/UploadPostTagsField";

// mock the function
const handleCloseUpload = jest.fn();
jest.mock("../../UploadPost/UploadPostTagsField", () => {
  return jest.fn(() => <div>Mocked PostTagsField</div>);
});

jest.mock("../../UploadPost/UploadPostFile", () => {
  return jest.fn(() => <div>Mocked UploadPostFile</div>);
});

describe("UploadPostForm", () => {
  test("form components are rendered correctly", () => {
    render(
      <MemoryRouter>
        <UploadPostForm handleCloseUpload={handleCloseUpload} />
      </MemoryRouter>
    );

    expect(screen.getByText("Post Title")).toBeInTheDocument();
    expect(screen.getByText("Post Category")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Related Major/Faculty/Special Programme (if applicable)"
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Mocked UploadPostFile/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked PostTagsField/i)).toBeInTheDocument();
    expect(screen.getByText("Create Post")).toBeInTheDocument();
  });

  test("error messages gone when inputs filled in", () => {
    render(
      <MemoryRouter>
        <UploadPostForm handleCloseUpload={handleCloseUpload} />
      </MemoryRouter>
    );

    expect(screen.getByText("Title is required")).toBeInTheDocument();

    const titleField = screen.getByLabelText("Post Title");
    fireEvent.change(titleField, { target: { value: "Test Title" } });
    expect(titleField).toHaveValue("Test Title");

    expect(screen.queryAllByText("Title is required")).length === 0;
  });

  test("fields' on change handler working", () => {
    render(
      <MemoryRouter>
        <UploadPostForm handleCloseUpload={handleCloseUpload} />
      </MemoryRouter>
    );

    const categorySelect = screen.getByTestId("post-category-field");
    userEvent.click(categorySelect);
    userEvent.type(categorySelect, "{enter}");
    userEvent.click(document.body);

    expect(screen.getByText("Study Guide")).toBeInTheDocument();
    fireEvent.blur(categorySelect);

    const titleField = screen.getByLabelText("Post Title");
    fireEvent.change(titleField, { target: { value: "Test Title" } });
    expect(titleField).toHaveValue("Test Title");
    fireEvent.blur(titleField);

    fireEvent.click(screen.getByTestId("create-post-button"));
  });

  // currently can't test the form upload, check if submit button is enabled, etc.
  // cant test success and error messages lol
  // cant access the major field for some reason
});

describe("UploadPost", () => {
  test("components are rendered correctly", () => {
    render(
      <MemoryRouter>
        <UploadPost />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Create new Post")).toBeInTheDocument();
    expect(screen.getByTestId("AddRoundedIcon")).toBeInTheDocument();
  });

  test("clicking button opens dialog", () => {
    render(
      <MemoryRouter>
        <UploadPost />
      </MemoryRouter>
    );

    const dialogButton = screen.getByTestId("open-dialog-button");
    fireEvent.click(dialogButton);

    expect(screen.getByText("New Post")).toBeInTheDocument();

    const closeButton = screen.getByTestId("close-button");
    expect(closeButton).toBeInTheDocument();
  });
});
