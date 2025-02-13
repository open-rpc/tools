import { it, expect } from 'vitest';
import React from "react";
import ContentDescriptor from "./ContentDescriptor";
import { ContentDescriptorObject } from "@open-rpc/meta-schema";
import { render, screen } from '@testing-library/react';

it("renders without crashing", () => {
  render(<ContentDescriptor />);
});

it("renders empty with no schema", () => {
  render(<ContentDescriptor />);
  expect(document.body.textContent).toBe("");
});

it("renders empty with empty schema", () => {
  const emptyContentDescriptor = {} as ContentDescriptorObject;
  render(<ContentDescriptor contentDescriptor={emptyContentDescriptor} />);
  expect(document.body.textContent).toBe("");
});

it("renders a name", () => {
  render(
    <ContentDescriptor 
      contentDescriptor={{ name: "foo", schema: {} }} 
      disableTransitionProps={true} 
    />
  );
  expect(screen.getByText("foo")).toBeInTheDocument();
});
