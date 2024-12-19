import { it, expect } from 'vitest';
import React from "react";
import Params from "./Params";
import { render, screen } from '@testing-library/react';

it("renders without crashing", () => {
  render(<Params />);
});

it("renders empty with no schema", () => {
  render(<Params />);
  expect(document.body.textContent).toBe("");
});

it("renders empty with empty params", () => {
  render(<Params params={[]}/>);
  expect(document.body.textContent).toBe("");
});

it("renders params", () => {
  const params = [
    {
      description: "tags to filter by",
      name: "tags",
      schema: {
        type: "string" as const,
        title: "Tag Filter",
      },
      required: true,
      summary: "Filter by tags"
    },
  ];
  
  render(<Params params={params} disableTransitionProps={true}/>);
  
  expect(screen.getByText("tags")).toBeInTheDocument();
  expect(screen.getByText("tags to filter by")).toBeInTheDocument();
  expect(screen.getByText("string")).toBeInTheDocument();
  expect(screen.getByText("Tag Filter")).toBeInTheDocument();
  expect(screen.getByText("Filter by tags")).toBeInTheDocument();
});
