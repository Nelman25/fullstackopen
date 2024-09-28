/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

const CountryInfo = ({ countryName }) => {
	const [countryData, setCountryData] = useState({});
	const [countryLocation, setCountryLocation] = useState({});
	const [countryWeather, setCountryWeather] = useState({});

	useEffect(() => {
		const api_key = "7d3ea97ed27567aff251356392514703";

		axios
			.get(
				`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`
			)
			.then((response) => {
				const importantCountryData = {
					name: response.data.name.common,
					capital: response.data.capital,
					area: response.data.area,
					languages: response.data.languages,
					flagImg: response.data.flags.png,
				};
				setCountryData(importantCountryData);
				axios
					.get(
						`http://api.openweathermap.org/geo/1.0/direct?q=${importantCountryData.capital}&limit=1&appid=${api_key}`
					)
					.then((response) => {
						const data = response.data;
						const location = {
							lat: data[0].lat,
							lon: data[0].lon,
						};
						setCountryLocation(location);

						axios
							.get(
								`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat.toFixed(
									2
								)}&lon=${location.lon.toFixed(2)}&appid=${api_key}`
							)
							.then((response) => {
								const fetchWeatherIcon = response.data.weather[0].icon;
								const wind = `wind ${response.data.wind.speed}m/s`;
								const temperature = `${(
									response.data.main.temp - 273.15
								).toFixed(2)}°C`;
								const weatherIcon = `https://openweathermap.org/img/wn/${fetchWeatherIcon}@2x.png`;

								setCountryWeather({
									temp: temperature,
									icon: weatherIcon,
									wind: wind,
								});
							});
					});
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
					<p>Temperature: {countryWeather.temp}</p>
					<img src={countryWeather.icon} />
					<p>{countryWeather.wind}</p>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default CountryInfo;
