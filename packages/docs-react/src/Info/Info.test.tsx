import { describe, it, expect } from 'vitest';
import { createRoot } from "react-dom/client";
import React from "react";
import Info  from "./Info";
import { OpenrpcDocument } from "@open-rpc/meta-schema";
import { render, screen } from '@testing-library/react';

it("renders without crashing", () => {
  render(<Info />);
});

it("renders empty with no schema", () => {
  render(<Info />);
  expect(document.body.textContent).toBe("");
});

it("renders empty with empty schema", () => {
  render(<Info schema={{} as OpenrpcDocument}/>);
  expect(document.body.textContent).toBe("");
});

it("renders empty with empty schema info", () => {
  render(<Info schema={{ info: {} } as OpenrpcDocument}/>);
  expect(document.body.textContent).toBe("");
});

it("renders an info.title for a given schema", () => {
  const schema = {
    info: {
      title: "foo",
    },
  } as OpenrpcDocument;
  
  render(<Info schema={schema} />);
  expect(screen.getByText("foo")).toBeInTheDocument();
});

it("renders an info.version for a given schema", () => {
  const schema = {
    info: {
      version: "1.0.0-rc0",
    },
  } as OpenrpcDocument;
  render(<Info schema={schema} />);
  expect(screen.getByText("1.0.0-rc0")).toBeInTheDocument();
});

it("renders an info.description for a given schema", () => {
  const schema = {
    info: {
      description: "my long verbose description",
    },
  } as OpenrpcDocument;
  render(<Info schema={schema} />);
  expect(screen.getByText("my long verbose description")).toBeInTheDocument();
});

it("renders an info terms of service for a given schema", () => {
  const schema = {
    info: {
      termsOfService: "http://open-rpc.org",
    },
  } as OpenrpcDocument;
  render(<Info schema={schema} />);
  const link = screen.getByRole('link', { name: "Terms Of Service" });
  expect(link).toHaveAttribute('href', "http://open-rpc.org");
});

it("renders an info contact for a given schema", () => {
  const schema = {
    info: {
      contact: {
        email: "foo@example.com",
        name: "OpenRPC Team",
        url: "http://open-rpc.org",
      },
    },
  } as OpenrpcDocument;
  render(<Info schema={schema} />);
  expect(screen.getByText("Email OpenRPC Team")).toBeInTheDocument();
  
  const urlLink = screen.getByRole('link', { name: "Contact OpenRPC Team" });
  expect(urlLink).toHaveAttribute('href', "http://open-rpc.org");
  
  const emailLink = screen.getByRole('link', { name: "Email OpenRPC Team" });
  expect(emailLink).toHaveAttribute('href', "mailto:foo@example.com");
});

it("renders an info license for a given schema", () => {
  const schema = {
    info: {
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org",
      },
    },
  } as OpenrpcDocument;
  render(<Info schema={schema} />);
  const link = screen.getByRole('link', { name: "Apache 2.0" });
  expect(link).toHaveAttribute('href', "http://www.apache.org");
});
