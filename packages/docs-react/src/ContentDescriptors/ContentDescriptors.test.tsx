import { it, expect } from 'vitest';
import React from "react";
import ContentDescriptors from "./ContentDescriptors";
import { OpenrpcDocument } from "@open-rpc/meta-schema";
import { render, screen } from '@testing-library/react';

it("renders without crashing", () => {
  render(<ContentDescriptors />);
});

it("renders empty with no schema", () => {
  render(<ContentDescriptors />);
  expect(document.body.textContent).toBe("");
});

it("renders empty with empty schema", () => {
  const emptySchema = {} as OpenrpcDocument;
  render(<ContentDescriptors schema={emptySchema}/>);
  expect(document.body.textContent).toBe("");
});

it("renders a name", () => {
  const schema = {
    components: {
      contentDescriptors: {
        foo: {
          name: "foo",
        },
      },
    },
  } as unknown as OpenrpcDocument;
  
  render(<ContentDescriptors schema={schema} disableTransitionProps={true}/>);
  expect(screen.getByText("foo")).toBeInTheDocument();
});
