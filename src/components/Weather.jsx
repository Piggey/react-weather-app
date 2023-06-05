import { useEffect } from "react";
import { useState } from "react";
import { fetchWeatherData } from "../api";

export const WEATHER_FORECAST_DAYS = 8;

function Weather() {
  const [cityName, setCityName] = useState('Lodz');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric');


  // get weather data just once when component is mounted
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (cityName) {
      getWeatherData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (!cityName) return;

    if (e.key === "Enter") {
      getWeatherData();
    }
  }

  const handleSwitch = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const getWeatherData = async () => {
    try {
      const data = await fetchWeatherData(cityName);
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  }

  function createDate(dateTime) {
    const newDate = new Date(dateTime);
    return newDate.toDateString().slice(3);
  }

  function createDay(dt, type) {
    const day = new Date(dt);
    if (type === "long") {
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return day.toLocaleString("en-us", options);
    } else {
      return day.toLocaleString("en-us", { weekday: "long" });
    }
  }

  if (!weatherData) {
    return (
      <span>Fetching weather data...</span>
    );
  }
  return (
    <>
      <aside>
        <div className="aside Dark">
          <div className="aside-container">
            <div className="aside-header">
              <h3>City:</h3>
              <input type="text" value={cityName} onChange={handleInputChange} onKeyDown={handleInputKeyDown}/>
            </div>
            <div className="aside-main">
              <h1>{weatherData.location.name}</h1>
              <h2>
                <span>{createDate(weatherData.location.localtime)}</span>
                <span>{createDay(weatherData.location.localtime)}</span>
              </h2>
              <img src={`http:${weatherData.current.condition.icon}`} alt="current weather" />
              <span className="aside-degree">
                {unit === "metric" ? (
                  <span>{weatherData.current.temp_c} &#8451;</span>
                ) : (
                  <span>{weatherData.current.temp_f} &#8457;</span>
                )}
              </span>
              <div className="aside-main-item">
                <div>
                  <span className="material-symbols-rounded">
                    device_thermostat
                  </span>
                  Feels Like
                </div>
                <span>
                  {unit === "metric" ? (
                    <span>{weatherData.current.feelslike_c} &#8451;</span>
                  ) : (
                    <span>{weatherData.current.feelslike_f} &#8457;</span>
                  )}
                </span>
              </div>
              <div className="aside-main-item">
                <div>
                  <span className="material-symbols-rounded">light_mode</span>
                  Day
                </div>
                <span>
                  {unit === "metric" ? (
                    <span>{weatherData.forecast.forecastday[0].day.maxtemp_c} &#8451;</span>
                  ) : (
                    <span>{weatherData.forecast.forecastday[0].day.maxtemp_f} &#8457;</span>
                  )}
                </span>
              </div>
              <div className="aside-main-item">
                <div>
                  <span className="material-symbols-rounded">bedtime</span>
                  Night
                </div>
                <span>
                  {unit === "metric" ? (
                    <span>{weatherData.forecast.forecastday[0].day.mintemp_c} &#8451;</span>
                  ) : (
                    <span>{weatherData.forecast.forecastday[0].day.mintemp_f} &#8457;</span>
                  )}
                </span>
              </div>
              <div className="aside-main-item">
                <div>
                  <ion-icon name="water"></ion-icon>
                  Humidity
                </div>
                <span>{weatherData.current.humidity}%</span>
              </div>
              <div className="aside-main-item">
                <div>
                  <span className="material-symbols-rounded">air</span>
                  Wind
                </div>
                <span>
                  {unit === "metric" ? (
                    <span>{weatherData.current.wind_kph} km/h</span>
                  ) : (
                    <span>{weatherData.current.wind_mph} mph</span>
                  )}
                </span>
              </div>
            </div>
            <div className="aside-footer">
              <div className="unity">
                <div>metric</div>
                <div>
                  <label className="switch">
                    <input type="checkbox" onChange={handleSwitch} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div>imperial</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <section>
        <div className="section-container">
          {weatherData.forecast.forecastday.map((forecastDay, i) => (
            <div key={i} className="grid-item Dark">
              <div className="grid-item-header">{createDate(forecastDay.date)}</div>
              <div className="grid-item-container">
                <img src={`http:${forecastDay.day.condition.icon}`} alt="forecast day condition icon"/>
                <span>{createDay(forecastDay.date)}</span>
                <span>{forecastDay.day.condition.text}</span>
              </div>
              <div className="grid-item-footer">
                <div>
                  {unit === "metric" ? (
                    <div>
                      Min: {Math.round(forecastDay.day.mintemp_c)}
                      <span>&#8451;</span>
                    </div>
                  ) : (
                    <div>
                      Min: {Math.round(forecastDay.day.mintemp_f)}
                      <span>&#8457;</span>
                    </div>
                  )}
                </div>
                <div>
                  {unit === "metric" ? (
                    <div>
                      Max: {Math.round(forecastDay.day.maxtemp_c)}
                      <span>&#8451;</span>
                    </div>
                  ) : (
                    <div>
                      Max: {Math.round(forecastDay.day.maxtemp_f)}
                      <span> &#8457;</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Weather;
