import { renderHook, act } from '@testing-library/react';
import useModal from './useModal';

describe('useModal hook', () => {
  it('should initialize with isOpen false', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isOpen).toBe(false);
  });

  it('should open the modal', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('should close the modal', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
