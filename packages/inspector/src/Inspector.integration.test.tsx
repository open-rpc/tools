import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { vi, expect, test } from 'vitest';

// Stub monaco-editor and workers
vi.mock('monaco-editor', () => ({}), { virtual: true });
vi.mock('monaco-editor/esm/vs/editor/editor.worker?worker', () => ({}), { virtual: true });
vi.mock('monaco-editor/esm/vs/language/json/json.worker?worker', () => ({}), { virtual: true });
vi.mock('monaco-editor/esm/vs/language/css/css.worker?worker', () => ({}), { virtual: true });
vi.mock('monaco-editor/esm/vs/language/html/html.worker?worker', () => ({}), { virtual: true });
vi.mock('monaco-editor/esm/vs/language/typescript/ts.worker?worker', () => ({}), { virtual: true });
vi.mock('../src/containers/userWorker.ts', () => ({}), { virtual: true });
vi.mock('react-resizable-panels', () => ({
  PanelGroup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Panel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PanelResizeHandle: () => <div />,
  ImperativePanelGroupHandle: class {},
}));

import Inspector from './containers/Inspector';

// Mock useTransport to avoid real network calls
vi.mock('@open-rpc/monaco-editor-react', () => ({
  MonacoEditor: () => null,
  addDiagnostics: () => null,
}));
vi.mock('./hooks/useTransport', () => {
  const sendData = vi.fn().mockResolvedValue({ foo: 'bar' });
  const transport = {
    sendData,
    subscribe: vi.fn(),
    unsubscribe: vi.fn(),
    close: vi.fn(),
    connect: vi.fn(),
  };
  return { default: () => [transport, vi.fn(), undefined, true] };
});

test('play button sends request and displays log', async () => {
  render(
    <Inspector
      request={{ jsonrpc: '2.0', method: 'foo', params: [], id: 1 }}
      url="http://localhost"
    />
  );
  const playButton = screen.getByRole('button', { name: /play/i });
  fireEvent.click(playButton);
  await waitFor(() => screen.getByText('foo'));
  expect(screen.getByText('foo')).toBeInTheDocument();
});
