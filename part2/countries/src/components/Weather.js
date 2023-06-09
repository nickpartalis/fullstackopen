import { useState, useEffect } from "react"

import weatherData from "../services/weatherData"

const imageUrl = "https://openweathermap.org/img/wn"

const Weather = ({ city }) => {
  const [data, setData] = useState({})

  useEffect(() => {
    weatherData
      .getWeatherData(city)
      .then(data => setData(data))
  }, [])

  if (Object.keys(data).length === 0) return null

  return (
    <div>
      <h2>Weather in {city}</h2>
      <div><strong>Temperature:</strong> {data.main.temp} Celsius</div>
      <img src={`${imageUrl}/${data.weather[0].icon}@2x.png`} />
      <div><strong>Wind:</strong> {data.wind.speed} m/s</div>
    </div>
  )
}

export default Weather