import axios from "axios"

const URL = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = process.env.REACT_APP_API_KEY

const getWeatherData = (city) => {
  return (
    axios
      .get(`${URL}?q=${city}&units=metric&appid=${API_KEY}`)
      .then(response => response.data)
      .then(({main, weather, wind}) => ({main, weather, wind})) //keep only needed data
      .catch(err => console.log(err))
  )
}

export default { getWeatherData }