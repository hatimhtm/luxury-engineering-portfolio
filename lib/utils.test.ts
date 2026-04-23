import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('should merge basic classes', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should handle conditional classes', () => {
    expect(cn('class1', true && 'class2', false && 'class3')).toBe('class1 class2');
  });

  it('should resolve tailwind conflicts', () => {
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
  });

  it('should handle arrays and objects', () => {
    expect(cn(['px-2', 'py-1'], { 'm-1': true, 'm-2': false })).toBe('px-2 py-1 m-1');
  });

  it('should handle null and undefined', () => {
    expect(cn('px-2', null, undefined, 'py-1')).toBe('px-2 py-1');
  });
});
