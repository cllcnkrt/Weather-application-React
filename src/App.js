import React, { useState } from "react";
import "./App.css";
import Weather from "./components/WeatherResult";
function App() {
  const API_KEY = "e83b47b4de6848d0b61115846211207";
  let cityInput = "";
  const [weatherData, setWeatherData] = useState([]);
  
  function inputHandler() {
    document.querySelector("input").addEventListener("input", (e) => {
      e.preventDefault();
      cityInput = e.target.value;
      
    });
  }

  async function getData(city) {
    if (city === "") return;
    const data = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
    );
    const result = await data.json();
    setWeatherData(result.forecast.forecastday);
    console.log(weatherData);
  }

  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Search a city"
          onChange={inputHandler}
        />
        <button onClick={() => getData(cityInput)}>Search</button>
      </div>
      {weatherData.map((data) => {
        <Weather
          key={data.date}
          date={data.date}
          minTemp={data.day.mintemp_c}
          maxTemp={data.day.maxtemp_c}
          condition={data.day.condition.text}
          icon={data.day.condition.icon}/>
      })}
      
    </div>
  );
}

export default App;
