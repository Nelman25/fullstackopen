import axios from "axios";
import { useState, useEffect } from "react";
import CountryInfo from "./components/CountryInfo";

const App = () => {
	const [countryName, setCountryName] = useState([]);
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
	};

	return (
		<div>
			<form>
				search country <input value={searchedCountry} onChange={handleSearch} />
			</form>
			<ul>
				{filteredCountry.length >= 10 ? (
					<p>Too many matches, specify another filter.</p>
				) : (
					filteredCountry.map((name) => <li key={name}>{name}</li>)
				)}
			</ul>
			{filteredCountry.find((country) => country === searchedCountry) ? (
				<CountryInfo countryName={searchedCountry} />
			) : (
				<></>
			)}
		</div>
	);
};

export default App;
