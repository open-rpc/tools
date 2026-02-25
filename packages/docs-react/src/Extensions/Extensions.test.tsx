import { it, expect } from 'vitest';
import React from 'react';
import Extensions from './Extensions';
import { OpenrpcDocument } from '@open-rpc/tool-types';
import { render, screen } from '@testing-library/react';

it('renders without crashing', () => {
  render(<Extensions />);
});

it('renders empty with no schema', () => {
  render(<Extensions />);
  expect(document.body.textContent).toBe('');
});

it('renders empty with empty schema', () => {
  const emptySchema = {} as OpenrpcDocument;
  render(<Extensions schema={emptySchema} />);
  expect(document.body.textContent).toBe('');
});

it('renders empty with schema but no extensions', () => {
  const schemaWithoutExtensions = {
    openrpc: '1.0.0',
    info: { title: 'Test API', version: '1.0.0' },
    methods: [],
  } as OpenrpcDocument;
  render(<Extensions schema={schemaWithoutExtensions} />);
  expect(document.body.textContent).toBe('');
});

it('renders extensions', () => {
  const schema = {
    'x-extensions': [
      {
        name: 'x-test-extension',
        version: '1.0.0',
        summary: 'Test Extension',
      },
    ],
  } as unknown as OpenrpcDocument;

  render(<Extensions schema={schema} disableTransitionProps={true} />);
  expect(screen.getByText('Extensions')).toBeInTheDocument();
  expect(screen.getByText('x-test-extension')).toBeInTheDocument();
  expect(screen.getByText('Test Extension')).toBeInTheDocument();
  expect(screen.getByText('v1.0.0')).toBeInTheDocument();
});

it('renders multiple extensions', () => {
  const schema = {
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
  } as unknown as OpenrpcDocument;

  render(<Extensions schema={schema} disableTransitionProps={true} />);
  expect(screen.getByText('Extensions')).toBeInTheDocument();
  expect(screen.getByText('x-test-extension-1')).toBeInTheDocument();
  expect(screen.getByText('Test Extension 1')).toBeInTheDocument();
  expect(screen.getByText('v1.0.0')).toBeInTheDocument();
  expect(screen.getByText('x-test-extension-2')).toBeInTheDocument();
  expect(screen.getByText('Test Extension 2')).toBeInTheDocument();
  expect(screen.getByText('v2.0.0')).toBeInTheDocument();
});
