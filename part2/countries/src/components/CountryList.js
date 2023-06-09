const CountryList = ({ countries, displayCountry }) => {
  if (countries.length < 2) return null
  if (countries.length > 10) {
    return "Too many matches, specify another filter"
  }
  return (
    <ul style={{listStyleType: "none", padding: 0}}>
      {countries.map(country => (
        <div key={country}>
          <li>
            {country}
            {" "}
            <button onClick={() => displayCountry(country)}>show</button>
          </li>

        </div>
      ))}
    </ul>
  )
}

export default CountryList