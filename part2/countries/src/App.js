import { useState, useEffect, useRef } from "react"

import countryData from "./services/countryData"
import CountryList from "./components/CountryList"
import CountryInfo from "./components/CountryInfo"

const App = () => {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [display, setDisplay] = useState({})

  const allCountries = useRef([]) //using ref instead of state since its value never changes

  useEffect(() => {
    countryData
      .getCountryNameList()
      .then(data => allCountries.current = data)
  }, [])

  const displayCountry = (name) => {
    countryData
      .getCountryInfo(name)
      .then(country => setDisplay(country))
  }

  const handleSearch = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
    
    const filteredCountries = newFilter === "" ? 
      [] :
      allCountries.current.filter(
        name => name.toLowerCase().includes(newFilter.toLowerCase())
      )
    setCountries(filteredCountries)

    if (filteredCountries.length === 1) {
      displayCountry(filteredCountries[0])
    }
    else setDisplay({})
  }

  return (
    <>
      <p>
        Find countries {""}
        <input value={filter} onChange={handleSearch} />
      </p>
      {Object.keys(display).length === 0 && 
        <CountryList countries={countries} displayCountry={displayCountry} />}
      {Object.keys(display).length !== 0 && <CountryInfo country={display} />}
    </>
  )
}

export default App
