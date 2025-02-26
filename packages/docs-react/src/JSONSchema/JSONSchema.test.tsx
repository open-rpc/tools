import { it, expect } from 'vitest';
import React from "react";
import JSONSchema from "./JSONSchema";
import { JSONSchema4 } from "json-schema";
import { render, screen } from '@testing-library/react';

it("renders without crashing", () => {
  render(<JSONSchema />);
});

it("renders empty with empty schema", () => {
  const emptySchema = {} as JSONSchema4;
  render(<JSONSchema schema={emptySchema}/>);
  expect(document.body.textContent).toBe("");
});

it("renders oneOf schema", () => {
  const schema = {
    oneOf: [
      { type: "string" },
      { type: "number" },
    ],
  } as JSONSchema4;
  render(<JSONSchema schema={schema}/>);
  
  // Check for both types in the oneOf schema
  expect(screen.getByText(/string/i)).toBeInTheDocument();
  expect(screen.getByText(/number/i)).toBeInTheDocument();
});

it("renders with a nested schema object", () => {
  const schema = {
    properties: {
      name: {
        properties: {
          foo: {
            type: "string",
          },
        },
        type: "object",
      },
    },
    type: "object",
  } as JSONSchema4;
  render(<JSONSchema schema={schema}/>);
  
  // Check for property name and types
  expect(screen.getByText("foo")).toBeInTheDocument();
  expect(screen.getAllByText(/string/i)).toHaveLength(1);
  expect(screen.getAllByText(/object/i)).toHaveLength(2);
});
