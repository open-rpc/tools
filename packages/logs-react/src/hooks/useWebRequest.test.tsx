import { it, expect, vi } from 'vitest';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import useWebRequest from './useWebRequest';
import { IJSONRPCLog } from '../components/logsReact/logsReact';

it('handles batched request and response', async () => {
  let history: IJSONRPCLog[] = [];
  const onUpdate = (h: IJSONRPCLog[]) => {
    history = h;
  };

  let capturedListener: (request: any) => void = () => {};
  const addListener = vi.fn((cb) => {
    capturedListener = cb;
  });
  const removeListener = vi.fn();
  (global as any).chrome = {
    devtools: {
      network: {
        onRequestFinished: { addListener, removeListener },
      },
    },
  };

  const TestComp = () => {
    const [logs] = useWebRequest();
    React.useEffect(() => {
      onUpdate(logs);
    }, [logs]);
    return null;
  };

  render(<TestComp />);
  expect(addListener).toHaveBeenCalled();

  const req1 = { jsonrpc: '2.0', id: 1, method: 'foo', params: [] };
  const req2 = { jsonrpc: '2.0', id: 2, method: 'bar', params: [] };
  const res1 = { jsonrpc: '2.0', id: 1, result: 'ok1' };
  const res2 = { jsonrpc: '2.0', id: 2, result: 'ok2' };

  const fakeRequest = {
    request: {
      url: 'http://test',
      postData: { text: JSON.stringify([req1, req2]) },
    },
    startedDateTime: new Date().toISOString(),
    time: 5,
    getContent: (cb: any) => cb(JSON.stringify([res1, res2])),
  };

  capturedListener(fakeRequest);

  await waitFor(() => {
    expect(history.length).toBe(4);
  });

  expect(history[0].method).toBe('foo');
  expect(history[1].method).toBe('bar');
  expect(history[2].method).toBe('foo');
  expect(history[3].method).toBe('bar');
});
