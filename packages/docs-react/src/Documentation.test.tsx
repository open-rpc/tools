import { it, expect } from 'vitest';
import React from 'react';
import Documentation from './Documentation';
import { render, screen } from '@testing-library/react';
/* eslint-disable @typescript-eslint/no-explicit-any */
it('renders without crashing', () => {
  render(<Documentation schema={{} as any} />);
});

it('renders without crashing with no schema', () => {
  render(<Documentation />);
});

it('render contentDescriptors', () => {
  render(
    <Documentation
      schema={
        {
          components: {
            contentDescriptors: {
              Foo: { name: 'foo', schema: true },
            },
          },
        } as any
      }
    />
  );
  expect(screen.getByText('ContentDescriptors')).toBeInTheDocument();
});

it('doesnt render contentDescriptors if uiSchema contentDescriptors hidden is passed', () => {
  render(
    <Documentation
      schema={
        {
          components: {
            contentDescriptors: {
              Foo: { name: 'foo', schema: true },
            },
          },
        } as any
      }
      uiSchema={{ contentDescriptors: { 'ui:hidden': true } }}
    />
  );
  expect(screen.queryByText('ContentDescriptors')).not.toBeInTheDocument();
});

it('renders a single extension', () => {
  render(
    <Documentation
      schema={
        {
          'x-extensions': [
            {
              name: 'x-test-extension',
              version: '1.0.0',
              summary: 'Test Extension',
            },
          ],
        } as any
      }
    />
  );
  expect(screen.getByText('Extensions')).toBeInTheDocument();
  expect(screen.getByText('x-test-extension')).toBeInTheDocument();
  expect(screen.getByText('Test Extension')).toBeInTheDocument();
  expect(screen.getByText('v1.0.0')).toBeInTheDocument();
});

it('renders multiple extensions', () => {
  render(
    <Documentation
      schema={
        {
          'x-extensions': [
            {
              name: 'x-test-extension-1',
              version: '1.0.0',
              summary: 'Test Extension 1',
            },
            {
              name: 'x-test-extension-2',
              version: '2.0.0',
              summary: 'Test Extension 2',
            },
          ],
        } as any
      }
    />
  );
  expect(screen.getByText('Extensions')).toBeInTheDocument();
  expect(screen.getByText('x-test-extension-1')).toBeInTheDocument();
  expect(screen.getByText('Test Extension 1')).toBeInTheDocument();
  expect(screen.getByText('x-test-extension-2')).toBeInTheDocument();
  expect(screen.getByText('Test Extension 2')).toBeInTheDocument();
});
