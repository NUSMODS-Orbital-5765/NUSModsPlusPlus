// KIV first, i'm not sure why i can't upload the file
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import UploadPostFile from "../../UploadPost/UploadPostFile";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import axiosMock from "axios-mock-adapter";

describe("UploadPostFile", () => {
  test("should handle selected file with a valid type", () => {
    const handleFormFile = jest.fn();
    const allowedTypes = ["image/jpeg"];

    const file = new File([""], "dummy.jpg", { type: "image/jpeg" });

    render(
      <UploadPostFile
        allowedTypes={allowedTypes}
        handleFormFile={handleFormFile}
      />
    );

    const uploadButton = screen.getByLabelText("Upload File");
    expect(uploadButton).toBeInTheDocument();
    const inputElement = screen.getByTestId("upload-file");
    Object.defineProperty(inputElement, "files", {
      value: [file],
    });

    fireEvent.change(inputElement);

    expect(screen.getByText(file.name)).toBeInTheDocument();
  });

  test("should handle selected file with an invalid type", () => {
    const handleFormFile = jest.fn();
    const allowedTypes = ["image/jpeg"];
    const file = new File(["dummy content"], "dummy.txt", {
      type: "text/plain",
    });

    render(
      <UploadPostFile
        allowedTypes={allowedTypes}
        handleFormFile={handleFormFile}
        showInput={true}
      />
    );

    const uploadButton = screen.getByTestId("upload-file");
    fireEvent.change(uploadButton, {
      target: { files: [file] },
    });

    expect(screen.queryByText(file.name)).not.toBeInTheDocument();
  });
});
