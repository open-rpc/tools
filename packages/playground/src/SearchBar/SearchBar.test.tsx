import React from 'react';
import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

it('renders without crashing', () => {
  render(<SearchBar searchBarUrl={undefined} />);
});

it('renders uiSchema inputPlaceholder', () => {
  render(
    <SearchBar
      searchBarUrl={undefined}
      uiSchema={
        {
          appBar: {
            'ui:inputPlaceholder': 'enter url',
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any
      }
    />
  );

  expect(screen.getByPlaceholderText('enter url')).toBeInTheDocument();
});
