import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Weather from '../../components/weather/Weather';
import { LanguageProvider } from '../../contexts/LanguageContext';
import * as useWeatherModule from '../../hooks/useWeather';

// Mock the useWeather hook
vi.mock('../../hooks/useWeather', async () => {
  const actual = await vi.importActual('../../hooks/useWeather');
  return {
    ...actual,
    useWeather: vi.fn(),
  };
});

describe('Weather Component', () => {
  it('renders initial state correctly', () => {
    // Mock the hook return value
    vi.mocked(useWeatherModule.useWeather).mockReturnValue({
      city: '',
      setCity: vi.fn(),
      weatherData: null,
      loading: false,
      error: '',
      fetchWeather: vi.fn(),
      handleSubmit: vi.fn(),
    });

    render(
      <LanguageProvider>
        <Weather />
      </LanguageProvider>,
    );

    expect(screen.getByText('Weather')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter city name')).toBeInTheDocument();
    expect(screen.getByText('No city selected')).toBeInTheDocument();
  });

  it('renders weather data when available', () => {
    // Mock the hook return value with weather data
    vi.mocked(useWeatherModule.useWeather).mockReturnValue({
      city: 'London',
      setCity: vi.fn(),
      weatherData: {
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
      },
      loading: false,
      error: '',
      fetchWeather: vi.fn(),
      handleSubmit: vi.fn(),
    });

    render(
      <LanguageProvider>
        <Weather />
      </LanguageProvider>,
    );

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('clear sky')).toBeInTheDocument();
    expect(screen.getByText('16°C')).toBeInTheDocument(); // Rounded from 15.5
    expect(screen.getByText('15°C')).toBeInTheDocument(); // Rounded from 14.8
    expect(screen.getByText('76%')).toBeInTheDocument();
    expect(screen.getByText('3.6 m/s')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    const user = userEvent.setup();
    const mockHandleSubmit = vi.fn((e) => e.preventDefault());
    const mockSetCity = vi.fn();

    // Mock the hook return value
    vi.mocked(useWeatherModule.useWeather).mockReturnValue({
      city: 'New York',
      setCity: mockSetCity,
      weatherData: null,
      loading: false,
      error: '',
      fetchWeather: vi.fn(),
      handleSubmit: mockHandleSubmit,
    });

    render(
      <LanguageProvider>
        <Weather />
      </LanguageProvider>,
    );

    const input = screen.getByPlaceholderText('Enter city name');
    const searchButton = screen.getByLabelText('Search');

    await user.type(input, 'New York');
    await user.click(searchButton);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
