import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../useCounter';

describe('useCounter', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should return 0 initially', () => {
        const { result } = renderHook(() => useCounter(100, 2000, false));
        expect(result.current).toBe(0);
    });

    it('should not count if startCounting is false', () => {
        const { result } = renderHook(() => useCounter(100, 2000, false));

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(result.current).toBe(0);
    });

    it('should count up to end value when startCounting is true', () => {
        const { result } = renderHook(() => useCounter(100, 2000, true));

        // Initial value
        expect(result.current).toBe(0);

        // Advance time by half duration
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        // Should be around 50
        expect(result.current).toBeGreaterThan(0);
        expect(result.current).toBeLessThanOrEqual(100);

        // Advance time to completion + buffer
        act(() => {
            jest.advanceTimersByTime(1000 + 50);
        });

        expect(result.current).toBe(100);
    });

    it('should handle different durations', () => {
        const { result } = renderHook(() => useCounter(200, 1000, true));

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(result.current).toBeGreaterThan(0);

        act(() => {
            jest.advanceTimersByTime(500 + 50);
        });

        expect(result.current).toBe(200);
    });
});
