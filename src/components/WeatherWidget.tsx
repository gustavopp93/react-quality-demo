import React, { useState, useEffect } from 'react'

interface WeatherData {
  city: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [city, setCity] = useState('Madrid')

  // Code smell: useEffect without cleanup
  useEffect(() => {
    fetchWeather()
  }, [city])

  // Code smell: Function with multiple responsibilities and poor error handling
  const fetchWeather = async () => {
    setLoading(true)
    setError('')

    try {
      // Code smell: Hardcoded delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Code smell: Mock data instead of real API
      const mockWeather: WeatherData = {
        city: city,
        temperature: Math.floor(Math.random() * 30) + 5,
        condition: getRandomCondition(),
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5
      }

      setWeather(mockWeather)
      setLoading(false)

      // Code smell: Console.log in production
      console.log('Weather data fetched:', mockWeather)

    } catch (err) {
      // Code smell: Generic error handling
      setError('Failed to fetch weather data')
      setLoading(false)
    }
  }

  // Code smell: Function with hardcoded values
  const getRandomCondition = () => {
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy', 'Foggy']
    return conditions[Math.floor(Math.random() * conditions.length)]
  }

  // Code smell: Complex function with multiple string concatenations
  const getWeatherIcon = (condition: string) => {
    let icon = '☀️'

    if (condition === 'Sunny') {
      icon = '☀️'
    } else if (condition === 'Cloudy') {
      icon = '☁️'
    } else if (condition === 'Rainy') {
      icon = '🌧️'
    } else if (condition === 'Snowy') {
      icon = '❄️'
    } else if (condition === 'Windy') {
      icon = '💨'
    } else if (condition === 'Foggy') {
      icon = '🌫️'
    }

    return icon
  }

  // Code smell: Inline styles for complex styling
  const cardStyle = {
    background: weather ? getBackgroundGradient(weather.condition) : '#f0f0f0',
    borderRadius: '12px',
    padding: '25px',
    color: weather ? 'white' : '#333',
    textAlign: 'center' as const,
    minHeight: '300px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  }

  // Code smell: Function with too many conditions
  const getBackgroundGradient = (condition: string) => {
    switch (condition) {
      case 'Sunny':
        return 'linear-gradient(135deg, #ff9a56 0%, #ffad56 100%)'
      case 'Cloudy':
        return 'linear-gradient(135deg, #757f9a 0%, #d7dde8 100%)'
      case 'Rainy':
        return 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)'
      case 'Snowy':
        return 'linear-gradient(135deg, #e6ddd4 0%, #d5d4d0 100%)'
      case 'Windy':
        return 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)'
      case 'Foggy':
        return 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)'
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
  }

  // Code smell: Complex conditional rendering
  const renderWeatherContent = () => {
    if (loading) {
      return (
        <div>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
          <div style={{ fontSize: '18px' }}>Loading weather...</div>
        </div>
      )
    }

    if (error) {
      return (
        <div>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>❌</div>
          <div style={{ fontSize: '18px', color: '#ff6b6b' }}>{error}</div>
          <button
            onClick={fetchWeather}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '1px solid white',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      )
    }

    if (!weather) {
      return <div>No weather data</div>
    }

    return (
      <div>
        <div style={{ fontSize: '72px', marginBottom: '10px' }}>
          {getWeatherIcon(weather.condition)}
        </div>

        <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>
          {weather.city}
        </h3>

        <div style={{ fontSize: '48px', fontWeight: 'bold', margin: '20px 0' }}>
          {weather.temperature}°C
        </div>

        <div style={{ fontSize: '20px', marginBottom: '20px' }}>
          {weather.condition}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '14px' }}>
          <div>
            <div>💧 Humidity</div>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{weather.humidity}%</div>
          </div>
          <div>
            <div>💨 Wind</div>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{weather.windSpeed} km/h</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Weather Widget</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="input"
          style={{ marginRight: '10px' }}
        />
        <button onClick={fetchWeather} className="button" disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </div>

      <div style={cardStyle}>
        {renderWeatherContent()}
      </div>

      {/* Code smell: Hardcoded cities list */}
      <div style={{ marginTop: '20px' }}>
        <h4>Quick cities:</h4>
        {['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'].map(quickCity => (
          <button
            key={quickCity}
            onClick={() => setCity(quickCity)}
            style={{
              margin: '5px',
              padding: '8px 12px',
              backgroundColor: city === quickCity ? '#5a67d8' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            {quickCity}
          </button>
        ))}
      </div>

      {/* Code smell: Unnecessary debugging info */}
      {weather && (
        <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}