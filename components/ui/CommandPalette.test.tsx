import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CommandPalette from './CommandPalette';
import { useRouter } from 'next/navigation';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CommandPalette', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    pushMock.mockClear();
  });

  test('renders command palette when open', () => {
    render(<CommandPalette />);

    // CommandPalette is closed by default. We need to open it.
    // It opens on Cmd+K or Ctrl+K.
    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    expect(screen.getByPlaceholderText('Type a command...')).toBeInTheDocument();
  });

  test('filters commands based on search', () => {
    render(<CommandPalette />);

    // Open the palette
    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    const input = screen.getByPlaceholderText('Type a command...');
    fireEvent.change(input, { target: { value: 'Home' } });

    // "Go to Home" should be visible
    expect(screen.getByText('Go to Home')).toBeInTheDocument();

    // "Go to Work" should NOT be visible
    // Note: The text might be split in spans, but getByText usually handles it if it's in the same node.
    // Actually in the code: <span className="flex-1 text-left">{cmd.label}</span>
    // So getByText('Go to Work') should find it if it's there.
    expect(screen.queryByText('Go to Work')).not.toBeInTheDocument();
  });

  test('navigates when command is selected', () => {
    render(<CommandPalette />);

    // Open the palette
    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    // Find "Go to Home" button and click it
    // The button contains the text.
    const homeButton = screen.getByText('Go to Home');
    fireEvent.click(homeButton);

    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
