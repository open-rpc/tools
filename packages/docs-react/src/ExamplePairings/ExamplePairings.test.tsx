import { it, expect } from 'vitest';
import React from 'react';
import ExamplePairings from './ExamplePairings';
import examples from '@open-rpc/examples';
import refParser from '@apidevtools/json-schema-ref-parser';
import { OpenrpcDocument, ExamplePairingObject, MethodObject } from '@open-rpc/tool-types';
import { render, screen, fireEvent } from '@testing-library/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isMethodObject = (method: any): method is MethodObject => {
  return method && typeof method === 'object' && 'name' in method && 'params' in method;
};

it('renders without crashing', () => {
  render(<ExamplePairings />);
});

it('renders empty with no example', () => {
  render(<ExamplePairings />);
  expect(document.body.textContent).toBe('');
});

it('renders empty with empty example', () => {
  render(<ExamplePairings examples={[]} />);
  expect(document.body.textContent).toBe('');
});

it('renders examples', async () => {
  const simpleMath = (await refParser.dereference(examples.simpleMath)) as OpenrpcDocument;
  const method = simpleMath.methods[0];
  if (!isMethodObject(method)) {
    throw new Error('Expected method to be a MethodObject');
  }

  render(<ExamplePairings method={method} examples={method.examples as ExamplePairingObject[]} />);

  expect(screen.getByText('simpleMathAdditionTwo')).toBeInTheDocument();
  expect(screen.getAllByText('2')).toHaveLength(2);
  expect(screen.getByText('4')).toBeInTheDocument();
});

it('renders examples with only schema examples', async () => {
  const testDoc: OpenrpcDocument = {
    info: {
      title: 'test',
      version: '0.0.0',
    },
    methods: [
      {
        name: 'test',
        params: [
          {
            name: 'testParam',
            schema: {
              examples: ['test'],
              type: 'string' as const,
            },
          },
        ],
        result: {
          name: 'test',
          schema: {
            examples: ['test'],
            type: 'string' as const,
          },
        },
      } as MethodObject,
    ],
    openrpc: '1.0.0',
  };
  const method = testDoc.methods[0];
  if (!isMethodObject(method)) {
    throw new Error('Expected method to be a MethodObject');
  }

  render(<ExamplePairings method={method} examples={method.examples as ExamplePairingObject[]} />);
  expect(screen.getAllByText(/test/)).toHaveLength(3);
});

it('renders examples with only schema examples with no params', async () => {
  const testDoc: OpenrpcDocument = {
    info: {
      title: 'test',
      version: '0.0.0',
    },
    methods: [
      {
        name: 'test-method',
        params: [],
        result: {
          name: 'test-method-result',
          schema: {
            examples: ['potato'],
            type: 'string' as const,
          },
        },
      } as MethodObject,
    ],
    openrpc: '1.0.0',
  };
  const method = testDoc.methods[0];
  if (!isMethodObject(method)) {
    throw new Error('Expected method to be a MethodObject');
  }

  render(<ExamplePairings method={method} examples={method.examples as ExamplePairingObject[]} />);

  expect(screen.getByText('potato')).toBeInTheDocument();
  expect(screen.queryByText('bob')).not.toBeInTheDocument();
});

it('renders examples with multiple param schema examples and no method', async () => {
  const testDoc: OpenrpcDocument = {
    info: {
      title: 'test',
      version: '0.0.0',
    },
    methods: [
      {
        name: 'test-method',
        params: [
          {
            name: 'testparam1',
            schema: {
              examples: ['bob'],
              type: 'string' as const,
            },
          },
          {
            name: 'testparam2',
            schema: {
              examples: ['bob2'],
              type: 'string' as const,
            },
          },
        ],
        result: {
          name: 'test-method-result',
          schema: {
            examples: ['potato'],
            type: 'string' as const,
          },
        },
      } as MethodObject,
    ],
    openrpc: '1.0.0',
  };
  const method = testDoc.methods[0];
  if (!isMethodObject(method)) {
    throw new Error('Expected method to be a MethodObject');
  }

  render(<ExamplePairings method={method} />);

  expect(screen.getByText('bob')).toBeInTheDocument();
  expect(screen.getByText('bob2')).toBeInTheDocument();
});

it('renders examples with only schema examples and no method', async () => {
  const testDoc: OpenrpcDocument = {
    info: {
      title: 'test',
      version: '0.0.0',
    },
    methods: [
      {
        name: 'test-method',
        params: [
          {
            name: 'testparam1',
            schema: {
              examples: ['bob'],
              type: 'string' as const,
            },
          },
        ],
        result: {
          name: 'test-method-result',
          schema: {
            examples: ['potato'],
            type: 'string' as const,
          },
        },
      } as MethodObject,
    ],
    openrpc: '1.0.0',
  };
  const method = testDoc.methods[0];
  if (!isMethodObject(method)) {
    throw new Error('Expected method to be a MethodObject');
  }

  render(<ExamplePairings examples={method.examples as ExamplePairingObject[]} />);
});

it('renders examples with only schema examples and no method with number', async () => {
  const testDoc: OpenrpcDocument = {
    info: {
      title: 'test',
      version: '0.0.0',
    },
    methods: [
      {
        name: 'test-method',
        params: [
          {
            name: 'testparam1',
            schema: {
              examples: [10101],
              type: 'number' as const,
            },
          },
        ],
        result: {
          name: 'test-method-result',
          schema: {
            examples: ['potato'],
            type: 'string' as const,
          },
        },
      } as MethodObject,
    ],
    openrpc: '1.0.0',
  };
  const method = testDoc.methods[0];
  if (!isMethodObject(method)) {
    throw new Error('Expected method to be a MethodObject');
  }

  render(<ExamplePairings examples={method.examples as ExamplePairingObject[]} />);
});

it('renders examples with only schema examples and no method with multiple number examples', async () => {
  const testDoc: OpenrpcDocument = {
    info: {
      title: 'test',
      version: '0.0.0',
    },
    methods: [
      {
        name: 'test-method',
        params: [
          {
            name: 'testparam1',
            schema: {
              examples: [10101, 102],
              type: 'number' as const,
            },
          },
        ],
        result: {
          name: 'test-method-result',
          schema: {
            examples: ['potato', 'bar'],
            type: 'string' as const,
          },
        },
      } as MethodObject,
    ],
    openrpc: '1.0.0',
  };
  const method = testDoc.methods[0];
  if (!isMethodObject(method)) {
    throw new Error('Expected method to be a MethodObject');
  }

  render(<ExamplePairings examples={method.examples as ExamplePairingObject[]} />);
});

it('renders examples and can switch between them', async () => {
  const simpleMath = (await refParser.dereference(examples.simpleMath)) as OpenrpcDocument;
  const { getByText } = render(
    <ExamplePairings
      method={simpleMath.methods[0] as MethodObject}
      examples={(simpleMath.methods[0] as MethodObject).examples as ExamplePairingObject[]}
    />
  );

  const firstExample = getByText('simpleMathAdditionTwo');
  fireEvent.click(firstExample);

  const secondExample = getByText('simpleMathAdditionFour');
  fireEvent.click(secondExample);

  expect(getByText('8')).toBeInTheDocument();
});

it('renders examples by-name', async () => {
  const petstoreByName = (await refParser.dereference(examples.petstoreByName)) as OpenrpcDocument;
  const method = petstoreByName.methods[0];
  if (!isMethodObject(method)) {
    throw new Error('Expected method to be a MethodObject');
  }

  render(<ExamplePairings method={method} examples={method.examples as ExamplePairingObject[]} />);

  expect(screen.getByText('listPetExample')).toBeInTheDocument();
  expect(screen.getByText('limit')).toBeInTheDocument();
  expect(screen.getAllByText('1')).toHaveLength(3);
});
