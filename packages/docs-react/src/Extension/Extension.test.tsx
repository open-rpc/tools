import { it, expect } from 'vitest';
import React from 'react';
import Extension from './Extension';
import { render, screen } from '@testing-library/react';

it('renders without crashing', () => {
  render(<Extension />);
});

it('renders empty with no extension', () => {
  render(<Extension />);
  expect(document.body.textContent).toBe('');
});

it('renders empty with empty extension', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emptyExtension = {} as any;
  render(<Extension extension={emptyExtension} />);
  expect(document.body.textContent).toBe('');
});

it('renders a name', () => {
  render(
    <Extension extension={{ name: 'x-test-extension', schema: {} }} disableTransitionProps={true} />
  );
  const nameElement = screen.getByText('x-test-extension');
  expect(nameElement.textContent).toBe('x-test-extension');
});

it('renders version', () => {
  render(
    <Extension
      extension={{ name: 'x-test-extension', version: '1.0.0' }}
      disableTransitionProps={true}
    />
  );
  const versionElement = screen.getByText('v1.0.0');
  expect(versionElement.textContent).toBe('v1.0.0');
});

it('renders summary', () => {
  render(
    <Extension
      extension={{ name: 'x-test-extension', summary: 'Test summary' }}
      disableTransitionProps={true}
    />
  );
  const summaryElement = screen.getByText('Test summary');
  expect(summaryElement.textContent).toBe('Test summary');
});

it('renders restricted fields as chips', () => {
  render(
    <Extension
      extension={{ name: 'x-test-extension', restricted: ['methodObject', 'infoObject'] }}
      disableTransitionProps={true}
    />
  );
  const restrictedLabel = screen.getByText('Restricted to');
  const methodObjectChip = screen.getByText('methodObject');
  const infoObjectChip = screen.getByText('infoObject');

  expect(restrictedLabel).toBeInTheDocument();
  expect(methodObjectChip).toBeInTheDocument();
  expect(infoObjectChip).toBeInTheDocument();
});

it('renders external documentation as a button', () => {
  render(
    <Extension
      extension={{
        name: 'x-test-extension',
        externalDocumentation: {
          description: 'Test docs',
          url: 'https://example.com',
        },
      }}
      disableTransitionProps={true}
    />
  );

  const externalDocLabel = screen.getByText('External Documentation');
  const descriptionText = screen.getByText('Test docs');
  const docButton = screen.getByText('View Documentation');

  expect(externalDocLabel).toBeInTheDocument();
  expect(descriptionText).toBeInTheDocument();
  expect(docButton).toBeInTheDocument();
  expect(docButton.closest('a')).toHaveAttribute('href', 'https://example.com');
});
