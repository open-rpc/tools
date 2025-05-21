import { render, screen } from '@testing-library/react';
import React from 'react';
import { expect, test } from 'vitest';
import JSONSchemaTree from './containers/JSONSchemaTree';

test('renders properties from schema', () => {
  render(<JSONSchemaTree schema={{ type: 'object', properties: { foo: { type: 'string' } } }} />);
  expect(screen.getByText('Object')).toBeInTheDocument();
});
