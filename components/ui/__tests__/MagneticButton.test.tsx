import React, { forwardRef } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import MagneticButton from '../MagneticButton'

const mockXSet = vi.fn()
const mockYSet = vi.fn()
const useMotionValueMock = vi.fn()

vi.mock('framer-motion', () => {
    // We have to define the MockMotionDiv inside the factory so it's not hoisted below its declaration
    const MockMotionDiv = forwardRef<HTMLDivElement, any>(
        ({ children, onMouseMove, onMouseLeave, className, style, ...props }, ref) => {
            if (typeof window !== 'undefined' && (window as any).simulateNullRef) {
                if (typeof ref === 'function') {
                    ref(null);
                } else if (ref) {
                    (ref as any).current = null;
                }
            }

            return (
                <div
                    data-testid="motion-div"
                    ref={typeof window !== 'undefined' && (window as any).simulateNullRef ? null : ref}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    className={className}
                    style={style}
                    {...props}
                >
                    {children}
                </div>
            )
        }
    )
    MockMotionDiv.displayName = 'MockMotionDiv'

    return {
        motion: {
            div: MockMotionDiv
        },
        useMotionValue: (...args: any[]) => useMotionValueMock(...args),
        useSpring: vi.fn((val) => val)
    }
})

describe('MagneticButton', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        useMotionValueMock.mockImplementationOnce(() => ({ set: mockXSet }))
        useMotionValueMock.mockImplementationOnce(() => ({ set: mockYSet }))
        delete (window as any).simulateNullRef
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders children correctly', () => {
        render(<MagneticButton>Click me</MagneticButton>)
        expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('applies custom className', () => {
        render(<MagneticButton className="custom-class">Click me</MagneticButton>)
        expect(screen.getByTestId('motion-div')).toHaveClass('custom-class')
    })

    it('handles mouse leave correctly', () => {
        render(<MagneticButton>Click me</MagneticButton>)
        const button = screen.getByTestId('motion-div')

        fireEvent.mouseLeave(button)

        expect(mockXSet).toHaveBeenCalledWith(0)
        expect(mockYSet).toHaveBeenCalledWith(0)
    })

    it('handles mouse move correctly with default strength', () => {
        render(<MagneticButton>Click me</MagneticButton>)
        const button = screen.getByTestId('motion-div')

        button.getBoundingClientRect = vi.fn().mockReturnValue({
            left: 100,
            top: 100,
            width: 200,
            height: 100,
        })

        fireEvent.mouseMove(button, { clientX: 250, clientY: 170 })

        expect(mockXSet).toHaveBeenCalledWith(15)
        expect(mockYSet).toHaveBeenCalledWith(6)
    })

    it('handles mouse move correctly with custom strength', () => {
        render(<MagneticButton strength={0.5}>Click me</MagneticButton>)
        const button = screen.getByTestId('motion-div')

        button.getBoundingClientRect = vi.fn().mockReturnValue({
            left: 100,
            top: 100,
            width: 200,
            height: 100,
        })

        fireEvent.mouseMove(button, { clientX: 250, clientY: 170 })

        expect(mockXSet).toHaveBeenCalledWith(25)
        expect(mockYSet).toHaveBeenCalledWith(10)
    })

    it('handles missing ref gracefully on mouse move', () => {
        (window as any).simulateNullRef = true
        render(<MagneticButton>Click me</MagneticButton>)
        const button = screen.getByTestId('motion-div')

        fireEvent.mouseMove(button, { clientX: 250, clientY: 170 })

        expect(mockXSet).not.toHaveBeenCalled()
        expect(mockYSet).not.toHaveBeenCalled()
    })
})
