import { it, expect } from 'vitest';
import React from "react";
import MarkdownDescription from "./MarkdownDescription";
import { render, screen } from '@testing-library/react';

it("renders without crashing", () => {
  render(<MarkdownDescription uiSchema={{}} />);
});

it("renders a description", () => {
  render(<MarkdownDescription uiSchema={{}} source={"foo"}/>);
  expect(screen.getByText("foo")).toBeInTheDocument();
});

it("renders a description with syntax highlighting", () => {
  render(
    <MarkdownDescription 
      uiSchema={{}} 
      source={"```javascript\n\nconst foo = 'bar';\n\n```"}
    />
  );
  
  const codeElement = screen.getByRole('code');
  expect(codeElement).toHaveTextContent("const foo = 'bar';");
  expect(codeElement).toHaveClass('language-javascript');
});

it("renders a description with darkmode syntax highlighting", () => {
  render(
    <MarkdownDescription 
      uiSchema={{appBar: {"ui:darkMode": true}}} 
      source={"```javascript\n\nconst foo = 'bar';\n\n```"}
    />
  );
  
  const codeElement = screen.getByRole('code');
  expect(codeElement).toHaveTextContent("const foo = 'bar';");
  expect(codeElement).toHaveClass('language-javascript');
});

it("renders a description that errors", () => {
  render(<MarkdownDescription uiSchema={{}} source={"```"}/>);
  // Just checking it doesn't throw
});
