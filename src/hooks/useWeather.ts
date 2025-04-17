import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export interface UseWeatherReturn {
  city: string;
  setCity: (city: string) => void;
  weatherData: WeatherData | null;
  loading: boolean;
  error: string;
  fetchWeather: (cityName: string) => Promise<void>;
  handleSubmit: (e: React.FormEvent) => void;
}

export const useWeather = (): UseWeatherReturn => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language, t } = useLanguage();

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&lang=${language}&units=metric`,
      );

      if (!response.ok) {
        throw new Error(
          response.status === 404 ? t('weather.cityNotFound') : t('weather.errorFetching'),
        );
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('weather.errorFetching'));
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return {
    city,
    setCity,
    weatherData,
    loading,
    error,
    fetchWeather,
    handleSubmit,
  };
};
