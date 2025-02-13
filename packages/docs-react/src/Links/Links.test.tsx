import { it, expect } from 'vitest';
import React from "react";
import Links from "./Links";
import { render, screen } from '@testing-library/react';

it("renders without crashing", () => {
  render(<Links />);
});

it("renders empty with no schema", () => {
  render(<Links />);
  expect(document.body.textContent).toBe("");
});

it("renders empty with empty links", () => {
  render(<Links links={[]}/>);
  expect(document.body.textContent).toBe("");
});

it("renders a link method for a given schema link", () => {
  const link = {
    method: "get_user_address",
  };
  
  render(<Links links={[link]} />);
  expect(screen.getByText("get_user_address")).toBeInTheDocument();
});

it("renders a link params for a given schema link", () => {
  const link = {
    params: {
      foo: "$params.id",
    },
  };
  
  render(<Links links={[link]} />);
  expect(screen.getByText("foo")).toBeInTheDocument();
  expect(screen.getByText("$params.id")).toBeInTheDocument();
});

it("renders a link description for a given schema link", () => {
  const link = {
    description: "my description",
  };
  
  render(<Links links={[link]} />);
  expect(screen.getByText("my description")).toBeInTheDocument();
});

it("renders a link server url for a given schema link", () => {
  const link = {
    server: {
      url: "http://localhost:9210",
    },
  };
  
  render(<Links links={[link]} />);
  expect(screen.getByText("http://localhost:9210")).toBeInTheDocument();
});
