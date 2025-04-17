import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWeather } from '../../hooks/useWeather';
import { LanguageProvider } from '../../contexts/LanguageContext';

// Mock fetch
global.fetch = vi.fn();

// Mock weather data response
const mockWeatherData = {
  name: 'London',
  main: {
    temp: 15.5,
    humidity: 76,
    feels_like: 14.8,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  wind: {
    speed: 3.6,
  },
};

// Helper function to wrap hook with providers
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe('useWeather', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('VITE_WEATHER_API_KEY', 'mock-api-key');
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useWeather(), { wrapper });

    expect(result.current.city).toBe('');
    expect(result.current.weatherData).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('');
  });

  it('should update city when setCity is called', () => {
    const { result } = renderHook(() => useWeather(), { wrapper });

    act(() => {
      result.current.setCity('London');
    });

    expect(result.current.city).toBe('London');
  });

  it('should fetch weather data successfully', async () => {
    // Mock successful fetch response
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    });

    const { result } = renderHook(() => useWeather(), { wrapper });

    await act(async () => {
      await result.current.fetchWeather('London');
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather?q=London&appid=mock-api-key&lang=en&units=metric',
    );
    expect(result.current.weatherData).toEqual(mockWeatherData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('');
  });

  it('should handle fetch error when city is not found', async () => {
    // Mock failed fetch response
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useWeather(), { wrapper });

    await act(async () => {
      await result.current.fetchWeather('NonExistentCity');
    });

    expect(result.current.weatherData).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('City not found');
  });

  it('should handle form submission', async () => {
    // Mock successful fetch response
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    });

    const { result } = renderHook(() => useWeather(), { wrapper });

    // Set city
    act(() => {
      result.current.setCity('London');
    });

    // Mock form event
    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent;

    // Submit form
    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather?q=London&appid=mock-api-key&lang=en&units=metric',
    );
    expect(result.current.weatherData).toEqual(mockWeatherData);
  });
});
