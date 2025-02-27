import React from 'react';
import { it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { SnackBar, NotificationType } from './SnackBar';

it('renders notifications', () => {
  for (const notificationType in NotificationType) {
    if (typeof notificationType === 'string') {
      cleanup(); // Clean up before each render
      const type = NotificationType[
        notificationType as keyof typeof NotificationType
      ] as NotificationType;
      render(<SnackBar close={() => null} notification={{ message: 'hello', type }} />);

      // Use getAllByText and check length to ensure only one match
      const elements = screen.getAllByText('hello');
      expect(elements.length).toBe(1);
      expect(elements[0]).toBeInTheDocument();
    } else {
      throw new Error('NotificationType contains mixed types');
    }
  }
});
