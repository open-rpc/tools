import { it, expect } from 'vitest';
import React from 'react';
import Servers from './Servers';
import { render, screen } from '@testing-library/react';

it('renders without crashing', () => {
  render(<Servers />);
});

it('renders empty with no servers', () => {
  render(<Servers />);
  expect(document.body.textContent).toBe('');
});

it('renders empty with empty servers', () => {
  render(<Servers servers={[]} />);
  expect(document.body.textContent).toBe('');
});

it('renders schema servers', () => {
  const servers = [
    {
      description: 'foobar',
      name: 'Pet Store',
      url: 'http://petstore.openrpc.io/api',
    },
  ];
  render(<Servers servers={servers} />);

  expect(screen.getByText('Pet Store')).toBeInTheDocument();
  expect(screen.getByText('http://petstore.openrpc.io/api')).toBeInTheDocument();
  expect(screen.getByText('foobar')).toBeInTheDocument();
});

it('renders schema servers with variables', () => {
  const servers = [
    {
      description: 'foobar',
      name: 'Pet Store',
      url: 'http://{username}.open-rpc.org:{port}/{basePath}/{exampleName}',
      variables: {
        basePath: {
          default: 'jsonrpc',
        },
        exampleName: {
          default: 'petstore',
        },
        port: {
          default: '443',
          enum: ['8545', '443'],
        },
        username: {
          default: 'demo',
          description: 'this is applied to the url as the subdomain',
        },
      },
    },
  ];
  render(
    <Servers
      servers={servers}
      reactJsonOptions={{
        displayDataTypes: false,
        displayObjectSize: false,
        enableClipboard: false,
      }}
    />
  );

  // Check for server name and URL pattern
  expect(screen.getByText('Pet Store')).toBeInTheDocument();
  expect(screen.getByText(/open-rpc\.org/)).toBeInTheDocument();

  // Check for variable defaults
  expect(screen.getByText('petstore')).toBeInTheDocument();
  expect(screen.getByText('jsonrpc')).toBeInTheDocument();
  expect(screen.getAllByText(/443/)).toHaveLength(2);
  expect(screen.getByText('demo')).toBeInTheDocument();

  // Check for enum values
  expect(screen.getByText('8545')).toBeInTheDocument();

  // Check for variable description
  // NOTE this is a difference as there is auto ... truncation
  expect(screen.getByText(/this is applied to the url as/)).toBeInTheDocument();
});
