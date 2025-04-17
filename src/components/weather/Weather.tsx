'use client';

import { MdSearch, MdWbSunny, MdCloud, MdGrain, MdThunderstorm, MdWaterDrop } from 'react-icons/md';
import { useLanguage } from '../../contexts/LanguageContext';
import { useWeather } from '../../hooks/useWeather';
import Helmet from 'react-helmet';
import styles from './Weather.module.scss';

const Weather = () => {
  const { city, setCity, weatherData, loading, error, handleSubmit } = useWeather();
  const { t } = useLanguage();

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // Get weather icon based on weather condition
  const getWeatherIcon = (weatherId: number) => {
    if (weatherId >= 200 && weatherId < 300) {
      return <MdThunderstorm size={36} />;
    } else if (weatherId >= 300 && weatherId < 600) {
      return <MdGrain size={36} />;
    } else if (weatherId >= 600 && weatherId < 700) {
      return <MdGrain size={36} />;
    } else if (weatherId >= 700 && weatherId < 800) {
      return <MdCloud size={36} />;
    } else if (weatherId === 800) {
      return <MdWbSunny size={36} />;
    } else {
      return <MdCloud size={36} />;
    }
  };

  return (
    <div className={styles.weatherContainer}>
      <h2>{t('weather.title')}</h2>

      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={t('weather.searchPlaceholder')}
          aria-label={t('weather.searchPlaceholder')}
        />
        <button type="submit" aria-label={t('weather.search')}>
          <MdSearch size={20} />
        </button>
      </form>

      {loading && <p className={styles.loading}>{t('weather.loading')}</p>}

      {error && <p className={styles.error}>{error}</p>}

      {weatherData && !loading && !error && (
        <div className={styles.weatherInfo}>
          <Helmet>
            <title>{`${weatherData.name} - ${weatherData.weather[0].description}`}</title>
            <link
              rel="icon"
              href={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            />
          </Helmet>
          <div className={styles.weatherHeader}>
            <div className={styles.weatherIcon}>{getWeatherIcon(weatherData.weather[0].id)}</div>
            <div>
              <h4>{weatherData.name}</h4>
              <p className={styles.weatherDescription}>{weatherData.weather[0].description}</p>
            </div>
          </div>

          <div className={styles.weatherDetails}>
            <div className={styles.weatherDetail}>
              <span>{t('weather.temperature')}</span>
              <span>{Math.round(weatherData.main.temp)}°C</span>
            </div>
            <div className={styles.weatherDetail}>
              <span>{t('weather.feelsLike')}</span>
              <span>{Math.round(weatherData.main.feels_like)}°C</span>
            </div>
            <div className={styles.weatherDetail}>
              <span>{t('weather.humidity')}</span>
              <span>{weatherData.main.humidity}%</span>
            </div>
            <div className={styles.weatherDetail}>
              <span>{t('weather.wind')}</span>
              <span>{weatherData.wind.speed} m/s</span>
            </div>
          </div>
        </div>
      )}

      {!weatherData && !loading && !error && (
        <div className={styles.noCitySelected}>
          <MdWaterDrop size={48} className={styles.rainIcon} />
          <p>{t('weather.noCitySelected')}</p>
        </div>
      )}

      {!API_KEY && <p className={styles.error}>{t('weather.apiKeyMissing')}</p>}
    </div>
  );
};

export default Weather;
