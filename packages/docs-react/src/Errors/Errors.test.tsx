import { it, expect } from 'vitest';
import React from "react";
import Errors from "./Errors";
import { render, screen } from '@testing-library/react';

it("renders with error", () => {
  const errors = [
    {
      code: 100,
      message: "lost it",
    },
  ];
  render(<Errors errors={errors}/>);
  expect(screen.getByText("lost it")).toBeInTheDocument();
  expect(screen.getByText("100")).toBeInTheDocument();
});

it("renders an error with code and message", () => {
  render(<Errors errors={[{
    code: 100,
    message: "foo bar error msg",
  }]} />);
  
  expect(screen.getByText("foo bar error msg")).toBeInTheDocument();
  expect(screen.getByText("100")).toBeInTheDocument();
});
