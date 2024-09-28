/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

const CountryInfo = ({ countryName }) => {
	const [countryData, setCountryData] = useState({});
	const [countryLocation, setCountryLocation] = useState({});

	useEffect(() => {
		const api_key = "7d3ea97ed27567aff251356392514703";

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
				axios
					.get(
						`http://api.openweathermap.org/geo/1.0/direct?q=${data.capital}&limit=1&appid=${api_key}`
					)
					.then((response) => {
						response.data.map((data) => {
							const location = {
								lat: data.lat,
								lon: data.lon,
							};
							setCountryLocation(location);
							axios
								.get(
									`https://api.openweathermap.org/data/2.5/weather?lat=${data.lat.toFixed(
										2
									)}&lon=${data.lon.toFixed(2)}&appid=${api_key}`
								)
								.then((response) => {
									const data = Object.values(response.data);
									data.map((data) => {
										console.log(data);
										console.log(data.weather);
									});
								});
						});
					})
					.catch((error) => console.error(error));
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
					<img
						src={countryData.flagImg && countryData.flagImg}
						alt="country flag"
					/>
					<h2>Weather in {countryData.capital}</h2>
					<p></p>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default CountryInfo;
