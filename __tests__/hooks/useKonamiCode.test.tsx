import { renderHook, act } from '@testing-library/react';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('useKonamiCode', () => {
    const sequence = [
        "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
        "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
        "b", "a",
    ];

    let callback: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        callback = vi.fn();
    });

    it('should trigger callback when the full sequence is entered', () => {
        renderHook(() => useKonamiCode(callback));

        sequence.forEach((key) => {
            act(() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key }));
            });
        });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should NOT trigger callback if sequence is incomplete', () => {
        renderHook(() => useKonamiCode(callback));

        sequence.slice(0, sequence.length - 1).forEach((key) => {
            act(() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key }));
            });
        });

        expect(callback).not.toHaveBeenCalled();
    });

    it('should reset sequence when a wrong key is pressed', () => {
        renderHook(() => useKonamiCode(callback));

        // Type first 3 keys correctly
        sequence.slice(0, 3).forEach((key) => {
            act(() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key }));
            });
        });

        // Type a wrong key
        act(() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'x' }));
        });

        // Type the rest of the sequence (which should fail now)
        sequence.slice(3).forEach((key) => {
            act(() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key }));
            });
        });

        expect(callback).not.toHaveBeenCalled();

        // If we now type the full sequence, it should work (proving reset to 0)
        sequence.forEach((key) => {
            act(() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key }));
            });
        });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should reset sequence after successful completion', () => {
        renderHook(() => useKonamiCode(callback));

        // First completion
        sequence.forEach((key) => {
            act(() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key }));
            });
        });

        expect(callback).toHaveBeenCalledTimes(1);

        // Second completion
        sequence.forEach((key) => {
            act(() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key }));
            });
        });

        expect(callback).toHaveBeenCalledTimes(2);
    });
});
