import Weather from "./Weather"

const CountryInfo = ({ country }) => {
  return (
    <div>
      <div>
        <h1>{country.name.common}</h1>
        <div><strong>Capital:</strong> {country.capital}</div>
        <div><strong>Area:</strong> {country.area}</div>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} style={{maxWidth: 200}}/>
      </div>
      <Weather city={country.capital} />
    </div>
  )
}

export default CountryInfo