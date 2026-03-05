import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeProvider';

// Mock the useTheme hook
jest.mock('./ThemeProvider', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeToggle', () => {
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly in light mode', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    // In light mode, the button aria-label should say "Switch to dark mode"
    const button = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(button).toBeInTheDocument();

    // The text should show "Dark" (as a hint for what clicking does, based on the code logic or the other way around)
    // Looking at the code: {theme === "light" ? "Dark" : "Light"} -> Yes, it displays "Dark"
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('☾')).toBeInTheDocument();
  });

  it('renders correctly in dark mode', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    // In dark mode, the button aria-label should say "Switch to light mode"
    const button = screen.getByRole('button', { name: /switch to light mode/i });
    expect(button).toBeInTheDocument();

    // The text should show "Light"
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('☀')).toBeInTheDocument();
  });

  it('calls toggleTheme when the button is clicked', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(button);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
