import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useContactForm } from '../../hooks/useContactForm';
import { LanguageProvider } from '../../contexts/LanguageContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe('useContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    expect(result.current.formData).toEqual({
      name: '',
      dateOfBirth: '',
      city: '',
      email: '',
      phone: '',
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.submitted).toBe(false);
  });

  it('should update form data when handleChange is called', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.formData.name).toBe('John Doe');
  });

  it('should validate form and submit when all fields are valid', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
      } as React.ChangeEvent<HTMLInputElement>);

      result.current.handleChange({
        target: { name: 'dateOfBirth', value: '1990-01-01' },
      } as React.ChangeEvent<HTMLInputElement>);

      result.current.handleChange({
        target: { name: 'city', value: 'New York' },
      } as React.ChangeEvent<HTMLInputElement>);

      result.current.handleChange({
        target: { name: 'email', value: 'john@example.com' },
      } as React.ChangeEvent<HTMLInputElement>);

      result.current.handleChange({
        target: { name: 'phone', value: '123-456-7890' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent;

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(result.current.submitted).toBe(true);
    expect(result.current.formData).toEqual({
      name: '',
      dateOfBirth: '',
      city: '',
      email: '',
      phone: '',
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.submitted).toBe(false);
  });

  it('should validate form and show errors for invalid data', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'invalid-email' },
      } as React.ChangeEvent<HTMLInputElement>);

      result.current.handleChange({
        target: { name: 'phone', value: '123' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent;

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(result.current.errors.name).toBeDefined();
    expect(result.current.errors.email).toBeDefined();
    expect(result.current.errors.phone).toBeDefined();
    expect(result.current.submitted).toBe(false);
  });

  it('should reset form when resetForm is called', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    // Fill form with some data
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
      } as React.ChangeEvent<HTMLInputElement>);

      result.current.handleChange({
        target: { name: 'email', value: 'john@example.com' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // Reset form
    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData).toEqual({
      name: '',
      dateOfBirth: '',
      city: '',
      email: '',
      phone: '',
    });
    expect(result.current.errors).toEqual({});
  });
});
