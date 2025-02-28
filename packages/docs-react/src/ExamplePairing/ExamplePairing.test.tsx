import { it, expect } from 'vitest';
import React from 'react';
import ExamplePairing from './ExamplePairing';
import examples from '@open-rpc/examples';
import refParser from '@apidevtools/json-schema-ref-parser';
import { OpenrpcDocument, ExamplePairingObject, MethodObject } from '@open-rpc/meta-schema';
import { render, screen } from '@testing-library/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isMethodObject = (method: any): method is MethodObject => {
  return method && typeof method === 'object' && 'name' in method && 'params' in method;
};

it('renders handles no method', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render(<ExamplePairing methodName={undefined} examplePairing={{} as any} />);
  expect(document.body.textContent).toBe('');
});

it('renders handles no method examples', async () => {
  render(<ExamplePairing methodName={'foo'} />);
  expect(document.body.textContent).toBe('');
});

it('renders examples', async () => {
  const simpleMath = (await refParser.dereference(examples.simpleMath)) as OpenrpcDocument;
  const method = simpleMath.methods[0];
  if (!isMethodObject(method)) {
    throw new Error('Expected method to be a MethodObject');
  }

  render(
    <ExamplePairing
      methodName={method.name}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      examplePairing={method.examples && (method.examples[0] as any)}
    />
  );

  expect(screen.getAllByText('2')).toHaveLength(2);
  expect(screen.getByText('4')).toBeInTheDocument();
});

it('renders examples with params by-name', async () => {
  const method: MethodObject = {
    examples: [
      {
        name: 'fooExample',
        params: [
          {
            name: 'foo',
            value: 'bar',
          },
        ],
        result: {
          name: 'exampleResultThing',
          value: 'potato',
        },
      },
    ],
    name: 'myMethod',
    paramStructure: 'by-name',
    params: [
      {
        name: 'foo',
        schema: {
          type: 'string' as const,
        },
      },
    ],
    result: {
      name: 'resultThing',
      schema: {
        type: 'string' as const,
      },
    },
  };

  render(
    <ExamplePairing
      methodName={method.name}
      examplePairing={method.examples && (method.examples[0] as ExamplePairingObject)}
      paramStructure={method.paramStructure || 'by-position'}
    />
  );
  expect(screen.getByText('foo')).toBeInTheDocument();
  expect(screen.getByText('bar')).toBeInTheDocument();
});
