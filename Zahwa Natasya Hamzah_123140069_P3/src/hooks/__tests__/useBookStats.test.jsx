import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../useBookStats';

// Mock 'useBooks'
vi.mock('../../context/BookContext', () => ({
  useBooks: vi.fn(),
}));

const mockBooks = [
  { status: 'milik' },
  { status: 'milik' },
  { status: 'baca' },
  { status: 'beli' },
];

describe('useBookStats Hook', () => {
  // Test 5: Cek custom hook
  it('seharusnya menghitung statistik dengan benar', () => {
    useBooks.mockReturnValue({ books: mockBooks });
    const { result } = renderHook(() => useBookStats());

    expect(result.current.total).toBe(4);
    expect(result.current.owned).toBe(2);
    expect(result.current.reading).toBe(1);
    expect(result.current.toBuy).toBe(1);
  });
});