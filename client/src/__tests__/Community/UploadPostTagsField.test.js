import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import PostTagsField from "../../UploadPost/UploadPostTagsField";
import axios from "axios";
import axiosMock from "axios-mock-adapter";

describe("PostTagsField", () => {
  it("autocomplete component rendered correctly", () => {
    render(<PostTagsField selectedMajor="" handleFormTag={() => {}} />);
    const autocomplete = screen.getByRole("combobox", { name: /My Tags/i });
    expect(autocomplete).toBeInTheDocument();

    expect(screen.getByText(/New Tag/i)).toBeInTheDocument();
  });

  it("opens the new tag field on button click", () => {
    render(<PostTagsField selectedMajor="" handleFormTag={() => {}} />);
    const newTagButton = screen.getByTestId("new-tag-button");
    userEvent.click(newTagButton);
    const newTagInput = screen.getByLabelText("Tag Name");
    expect(newTagInput).toBeInTheDocument();
  });

  it("creates tag based on selected major", () => {
    render(
      <PostTagsField selectedMajor="Chemistry" handleFormTag={() => {}} />
    );

    expect(screen.getByText("Chemistry")).toBeInTheDocument();
  });

  it("saves and adds a new post tag", () => {
    render(<PostTagsField selectedMajor="" handleFormTag={() => {}} />);
    const newTagButton = screen.getByTestId("new-tag-button");
    userEvent.click(newTagButton);
    const newTagInput = screen.getByLabelText("Tag Name");
    userEvent.type(newTagInput, "Sample Tag");
    const saveButton = screen.getByTestId("save-tag-button");
    userEvent.click(saveButton);

    const autocomplete = screen.getByRole("combobox", { name: /My Tags/i });
    expect(screen.getByText("Sample Tag")).toBeInTheDocument();
  });
});
