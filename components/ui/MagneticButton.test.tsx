import { render, screen, fireEvent } from '@testing-library/react';
import MagneticButton from './MagneticButton';
import { useMotionValue } from 'framer-motion';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react');

  const MotionDiv = React.forwardRef(({ children, onMouseMove, onMouseLeave, style, className, ...props }: any, ref: any) => (
    <div
      ref={ref}
      data-testid="magnetic-button"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </div>
  ));

  MotionDiv.displayName = 'MotionDiv';

  return {
    motion: {
      div: MotionDiv
    },
    useMotionValue: jest.fn(),
    useSpring: jest.fn((value) => value),
    useTransform: jest.fn(),
  };
});

describe('MagneticButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    (useMotionValue as jest.Mock).mockReturnValue({ set: jest.fn(), get: () => 0 });
    render(<MagneticButton>Click me</MagneticButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    (useMotionValue as jest.Mock).mockReturnValue({ set: jest.fn(), get: () => 0 });
    render(<MagneticButton className="custom-class">Click me</MagneticButton>);
    const button = screen.getByTestId('magnetic-button');
    expect(button).toHaveClass('custom-class');
  });

  it('updates motion values on mouse move', () => {
    const xSet = jest.fn();
    const ySet = jest.fn();

    // Mock return values for x and y
    (useMotionValue as jest.Mock)
      .mockReturnValueOnce({ set: xSet, get: () => 0 }) // x
      .mockReturnValueOnce({ set: ySet, get: () => 0 }); // y

    render(<MagneticButton strength={0.5}>Hover me</MagneticButton>);
    const button = screen.getByTestId('magnetic-button');

    // Mock getBoundingClientRect
    jest.spyOn(button, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 100,
      width: 200,
      height: 100,
      x: 100,
      y: 100,
      bottom: 200,
      right: 300,
      toJSON: () => {},
    });

    // Center is (100 + 200/2, 100 + 100/2) = (200, 150)
    // Move mouse to (150, 150)
    // dx = 150 - 200 = -50
    // dy = 150 - 150 = 0
    // strength = 0.5
    // expected x = -50 * 0.5 = -25
    // expected y = 0 * 0.5 = 0

    fireEvent.mouseMove(button, { clientX: 150, clientY: 150 });

    expect(xSet).toHaveBeenCalledWith(-25);
    expect(ySet).toHaveBeenCalledWith(0);
  });

  it('resets motion values on mouse leave', () => {
    const xSet = jest.fn();
    const ySet = jest.fn();

    (useMotionValue as jest.Mock)
      .mockReturnValueOnce({ set: xSet, get: () => 0 })
      .mockReturnValueOnce({ set: ySet, get: () => 0 });

    render(<MagneticButton>Hover me</MagneticButton>);
    const button = screen.getByTestId('magnetic-button');

    fireEvent.mouseLeave(button);

    expect(xSet).toHaveBeenCalledWith(0);
    expect(ySet).toHaveBeenCalledWith(0);
  });
});
