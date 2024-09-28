import axios from "axios";
import { useState, useEffect } from "react";
import CountryInfo from "./components/CountryInfo";
import CountryList from "./components/CountryList";

const App = () => {
	const [countryName, setCountryName] = useState([]);
	const [showCountry, setShowCountry] = useState(false);
	const [searchedCountry, setSearchedCountry] = useState("");

	useEffect(() => {
		axios
			.get("https://studies.cs.helsinki.fi/restcountries/api/all")
			.then((response) => {
				const names = response.data.map((country) =>
					country.name.common.toLowerCase()
				);
				setCountryName(names);
			})
			.catch((error) => console.error("there was an error ", error));
	}, []);

	const filteredCountry =
		searchedCountry !== ""
			? countryName.filter((name) => name.includes(searchedCountry))
			: [];

	const handleSearch = (e) => {
		setSearchedCountry(e.target.value);
		setShowCountry(false);
	};

	const handleShowCountryData = (name) => {
		setShowCountry(true);
		setSearchedCountry(name);
	};

	return (
		<div>
			search country <input value={searchedCountry} onChange={handleSearch} />
			{filteredCountry.length > 10 && searchedCountry !== "" && (
				<p>Too many matches, specify another filter.</p>
			)}
			<ul>
				{filteredCountry.length <= 10 &&
					searchedCountry !== "" &&
					!showCountry &&
					filteredCountry.map((country) => (
						<CountryList
							key={country}
							name={country}
							onShowCountry={handleShowCountryData}
						/>
					))}
			</ul>
			{showCountry && filteredCountry.length === 1 && (
				<CountryInfo countryName={searchedCountry} />
			)}
		</div>
	);
};

export default App;
