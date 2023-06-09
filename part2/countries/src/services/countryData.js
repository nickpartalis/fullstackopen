import axios from "axios"

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"

const getCountryNameList = () => {
  return (
    axios
      .get(baseUrl + "/all")
      .then(response => response.data)
      .then(data => data.map(country => country.name.common))
  )
}

const getCountryInfo = (countryName) => {
  return (
    axios
      .get(baseUrl + `/name/${countryName.toLowerCase()}`)
      .then(response => response.data)
      .then(({ name, capital, area, languages, flags }) =>
        ({ name, capital, area, languages, flags })) //keep only needed data
      .catch(err => console.log(err))
  )
}

export default { getCountryNameList, getCountryInfo }