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
