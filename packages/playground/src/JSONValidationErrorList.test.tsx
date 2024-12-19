import React from "react";
import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import JSONValidationErrorList from "./JSONValidationErrorList";
import * as monaco from "monaco-editor";

it("renders without crashing", () => {
  render(<JSONValidationErrorList markers={[]}/>);
});

it("renders validation error list with markers", () => {
  const markers: monaco.editor.IMarker[] = [
    {
      startLineNumber: 2,
      startColumn: 10,
      message: "bad thing",
    } as monaco.editor.IMarker,
  ];
  render(<JSONValidationErrorList markers={markers} />);
  expect(screen.getByText(/2/)).toBeInTheDocument();
  expect(screen.getByText(/10/)).toBeInTheDocument();
  expect(screen.getByText(/bad thing/)).toBeInTheDocument();

});
