import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider } from '../../contexts/AuthContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { BrowserRouter } from 'react-router';
import { useLogin } from '../../hooks/useLogin';

const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
};

describe('useLogin', () => {
  it('should handle successful login', async () => {
    const { result } = renderHook(() => useLogin(), { wrapper: AllProviders });

    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password');
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as unknown as React.FormEvent);
    });

    expect(result.current.error).toBe('');
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle login error', async () => {
    const { result } = renderHook(() => useLogin(), { wrapper: AllProviders });

    act(() => {
      result.current.setEmail('');
      result.current.setPassword('');
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as unknown as React.FormEvent);
    });

    expect(result.current.isLoading).toBe(false);
  });
});
