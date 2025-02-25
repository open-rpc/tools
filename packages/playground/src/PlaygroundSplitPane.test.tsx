import React from "react";
import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import PlaygroundSplitPane from "./PlaygroundSplitPane";

it("renders without crashing", () => {
  render(<PlaygroundSplitPane
    editorComponent={
      <div>Foo</div>
    }
    documentationComponent={
      <div>Bar</div>
    }
    inspectorComponent={
      <div>Inspector</div>
    }
  />);
});

it.only("renders playground with left and right with split true", () => {
  render(<PlaygroundSplitPane
    inspectorTabComponent={
      <div>Inspector Tab</div>
    }
    editorComponent={
      <div>Foo</div>
    }
    documentationComponent={
      <div>Bar</div>
    }
    inspectorComponent={
      <div>Inspector</div>
    }
    showInspector={false}
    editorAndDocumentationSplit={true}

  />);
  expect(screen.getByText("Foo")).toBeInTheDocument();
  expect(screen.getByText("Bar")).toBeInTheDocument();
});

it("renders playground without left when split is false", () => {
  render(<PlaygroundSplitPane
    editorComponent={
      <div>Foo</div>
    }
    documentationComponent={
      <div>Bar</div>
    }
    inspectorComponent={
      <div>Inspector</div>
    }
    showInspector={false}
    editorAndDocumentationSplit={false}
  />);
  expect(screen.queryByText("Foo")).toBeNull();
  expect(screen.getByText("Bar")).toBeInTheDocument();
});

