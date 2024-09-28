/* eslint-disable react/prop-types */

const CountryList = ({name, onShowCountry}) => {
  return (
    <li>
      {name} <button onClick={() => onShowCountry(name)}>show</button>
    </li>
  )
}

export default CountryList
