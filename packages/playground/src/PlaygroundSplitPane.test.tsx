import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { it, expect, afterEach } from 'vitest';
import PlaygroundSplitPane from './PlaygroundSplitPane';

afterEach(() => {
  cleanup();
});

it('renders without crashing', () => {
  render(
    <PlaygroundSplitPane
      editorComponent={<div>Foo</div>}
      documentationComponent={<div>Bar</div>}
      inspectorComponent={<div>Inspector</div>}
      inspectorTabComponent={<div>Inspector Tab</div>}
      showInspector={false}
      editorAndDocumentationSplit={true}
    />
  );
});

it('renders playground with left and right with split true', () => {
  render(
    <PlaygroundSplitPane
      inspectorTabComponent={<div>Inspector Tab</div>}
      editorComponent={<div>Foo</div>}
      documentationComponent={<div>Bar</div>}
      inspectorComponent={<div>Inspector</div>}
      showInspector={false}
      editorAndDocumentationSplit={true}
    />
  );
  expect(screen.getByText('Foo')).toBeInTheDocument();
  expect(screen.getByText('Bar')).toBeInTheDocument();
});

it('renders playground without left when split is false', () => {
  render(
    <PlaygroundSplitPane
      editorComponent={<div>Foo</div>}
      documentationComponent={<div>Bar</div>}
      inspectorComponent={<div>Inspector</div>}
      showInspector={false}
      editorAndDocumentationSplit={false}
    />
  );

  // Find the Foo element
  const fooElement = screen.getByText('Foo');

  // Get the panel element that contains Foo (parent with data-panel attribute)
  const panelElement = fooElement.closest('[data-panel]');

  // Check that the panel has a size of 0
  expect(panelElement).toHaveAttribute('data-panel-size', '0.0');

  // Bar should still be visible
  expect(screen.getByText('Bar')).toBeInTheDocument();
});
