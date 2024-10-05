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
		<div className="h-[800px] flex flex-col px-32 py-16">
			<div className="shadow-2xl">
				<header className="bg-blue-100 grow-0 shrink-0 basis-[5%] flex items-center px-8 py-4">
					<input
						value={searchedCountry}
						id="searchbar"
						onChange={handleSearch}
						placeholder="Search country"
						className="rounded-full w-[20%] focus:w-[30%] transition-all duration-200 px-4 py-2"
					/>
				</header>
				<main className="bg-sky-200 h-full">
					<div className="">
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
				</main>
			</div>
		</div>
	);
};

export default App;
