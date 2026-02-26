import { it, expect, describe } from 'vitest';
import React from 'react';
import ErrorGroups, { containsErrorGroup, getErrorGroups } from './ErrorGroups';
import { render, screen } from '@testing-library/react';
import { ErrorObject, MethodObject } from '@open-rpc/tool-types';

describe('ErrorGroups Component', () => {
  it('renders without crashing', () => {
    render(<ErrorGroups />);
  });

  it('renders empty with no error groups', () => {
    render(<ErrorGroups />);
    expect(document.body.textContent).toBe('');
  });

  it('renders empty with empty error groups array', () => {
    render(<ErrorGroups errorGroups={[[]]} />);
    expect(document.body.textContent).toBe('');
  });

  it('renders a simple error group', () => {
    const errorGroups = [
      [
        {
          code: -31999,
          message: 'Gas too low',
          data: 'The gas is too low.',
        } as ErrorObject,
      ],
    ] as [ErrorObject[]];

    render(<ErrorGroups errorGroups={errorGroups} />);

    // Check for heading
    expect(screen.getByText(/Error Groups/)).toBeInTheDocument();

    // Check for table headers
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();

    // Check for error data
    expect(screen.getByText('-31999')).toBeInTheDocument();
    expect(screen.getByText('Gas too low')).toBeInTheDocument();
    expect(screen.getByText('The gas is too low.')).toBeInTheDocument();
  });

  it('renders multiple error groups', () => {
    const errorGroups = [
      [
        {
          code: -31999,
          message: 'Gas too low',
          data: 'The gas is too low.',
        } as ErrorObject,
        {
          code: -31998,
          message: 'Out of gas',
          data: 'The gas is out of gas.',
        } as ErrorObject,
      ],
    ] as [ErrorObject[]];

    render(<ErrorGroups errorGroups={errorGroups} />);

    // Check for all error data
    expect(screen.getByText('-31999')).toBeInTheDocument();
    expect(screen.getByText('Gas too low')).toBeInTheDocument();
    expect(screen.getByText('The gas is too low.')).toBeInTheDocument();

    expect(screen.getByText('-31998')).toBeInTheDocument();
    expect(screen.getByText('Out of gas')).toBeInTheDocument();
    expect(screen.getByText('The gas is out of gas.')).toBeInTheDocument();
  });

  it('renders object data using ReactJson', () => {
    const errorGroups = [
      [
        {
          code: -31999,
          message: 'Gas too low',
          data: { reason: 'insufficient', minimum: 21000, ten: '10k' },
        } as ErrorObject,
      ],
    ] as [ErrorObject[]];

    render(<ErrorGroups errorGroups={errorGroups} />);

    expect(screen.getByText('-31999')).toBeInTheDocument();
    expect(screen.getByText('Gas too low')).toBeInTheDocument();
    // We can't easily test the ReactJson output directly, but we can check that the data exists
    expect(screen.getByText('reason')).toBeInTheDocument();
    expect(screen.getByText('minimum')).toBeInTheDocument();
    expect(screen.getByText('10k')).toBeInTheDocument();
  });
});

describe('ErrorGroups utility functions', () => {
  it('containsErrorGroup returns true when method has x-error-group', () => {
    const method = {
      name: 'test',
      params: [],
      result: { name: 'result', schema: {} },
      'x-error-group': [{ code: 123, message: 'test' }],
    } as MethodObject;

    expect(containsErrorGroup(method)).toBe(true);
  });

  it('containsErrorGroup returns false when method has no x-error-group', () => {
    const method = {
      name: 'test',
      params: [],
      result: { name: 'result', schema: {} },
    } as MethodObject;

    expect(containsErrorGroup(method)).toBe(false);
  });

  it('getErrorGroups returns the error groups from a method', () => {
    const errorGroup = [{ code: 123, message: 'test' }];
    const method = {
      name: 'test',
      params: [],
      result: { name: 'result', schema: {} },
      'x-error-group': errorGroup,
    } as MethodObject;

    expect(getErrorGroups(method)).toBe(errorGroup);
  });
});
