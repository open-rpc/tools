import { it, expect } from 'vitest';
import React from 'react';
import Tags from './Tags';
import { render, screen } from '@testing-library/react';

it('renders empty with empty tags', () => {
  render(<Tags tags={[]} />);
  expect(document.body.textContent).toBe('');
});

it('renders schema tags', () => {
  const tags = [
    {
      name: 'salad',
    },
    {
      name: 'mytag',
    },
  ];
  render(<Tags tags={tags} />);

  // Check for tag names
  expect(screen.getByText('salad')).toBeInTheDocument();
  expect(screen.getByText('mytag')).toBeInTheDocument();
});
