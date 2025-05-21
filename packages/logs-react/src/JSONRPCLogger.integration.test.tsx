import { render, screen } from '@testing-library/react';
import React from 'react';
import { expect, test } from 'vitest';
import JSONRPCLogger, { JSONRPCLog } from './exports';

const logs: JSONRPCLog[] = [
  {
    type: 'request',
    method: 'foo',
    timestamp: new Date(),
    payload: { jsonrpc: '2.0', method: 'foo', id: 1 },
  },
  {
    type: 'response',
    method: 'foo',
    timestamp: new Date(),
    payload: { jsonrpc: '2.0', result: 'bar', id: 1 },
  },
];

test('renders logs with method names', () => {
  render(<JSONRPCLogger logs={logs} sidebarOpen={false} />);
  expect(screen.getAllByText('foo').length).toBeGreaterThan(0);
});
