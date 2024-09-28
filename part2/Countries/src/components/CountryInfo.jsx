/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

const CountryInfo = ({ countryName }) => {
	const [countryData, setCountryData] = useState({});

	useEffect(() => {
		axios
			.get(
				`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`
			)
			.then((response) => {
				const data = {
					name: response.data.name.common,
					capital: response.data.capital,
					area: response.data.area,
					languages: response.data.languages,
					flagImg: response.data.flags.png,
				};
				setCountryData(data);
			})
			.catch((error) => console.error("there was an error ", error));
	}, [countryName]);

	return (
		<div>
			{countryData ? (
				<>
					<h1>{countryData.name}</h1>
					<p>Capital: {countryData.capital}</p>
					<p>Area: {countryData.area}</p>
					<h3>Languages: </h3>
					<ul>
						{countryData.languages &&
							Object.values(countryData.languages).map((language) => (
								<li key={language}>{language}</li>
							))}
					</ul>
					<img src={countryData.flagImg && countryData.flagImg} alt="coountry flag" />
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default CountryInfo;
