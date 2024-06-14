document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "http://localhost:3000/weather";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherData = new WeatherData(data);
            displayWeather(weatherData);
        })
        .catch(error => {
            console.error("Error fetching the weather data:", error);
        });

    function displayWeather(weatherData) {
        const locationElem = document.getElementById("location");
        const coordinatesElem = document.getElementById("coordinates");
        const weatherIconElem = document.getElementById("weather-icon");
        const weatherMainElem = document.getElementById("weather-main");
        const weatherDescriptionElem = document.getElementById("weather-description");
        const tempElem = document.getElementById("temp");
        const feelsLikeElem = document.getElementById("feels-like");
        const sunriseElem = document.getElementById("sunrise");
        const sunsetElem = document.getElementById("sunset");

        locationElem.textContent = weatherData.getLocation();
        coordinatesElem.textContent = weatherData.getCoordinates();
        weatherIconElem.src = weatherData.getWeatherIconUrl();
        weatherMainElem.textContent = weatherData.getWeatherMain();
        weatherDescriptionElem.textContent = weatherData.getWeatherDescription();
        tempElem.textContent = weatherData.getTemperature();
        feelsLikeElem.textContent = weatherData.getFeelsLike();
        sunriseElem.textContent = weatherData.getSunrise();
        sunsetElem.textContent = weatherData.getSunset();
    }

    class WeatherData {
        constructor(data) {
            this.data = data;
        }

        getLocation() {
            return this.data.name;
        }

        getCoordinates() {
            return `Lon: ${this.data.coord.lon}, Lat: ${this.data.coord.lat}`;
        }

        getWeatherIconUrl() {
            return `https://openweathermap.org/img/wn/${this.data.weather[0].icon}.png`;
        }

        getWeatherMain() {
            return this.data.weather[0].main;
        }

        getWeatherDescription() {
            return this.data.weather[0].description;
        }

        getTemperature() {
            return this.data.main.temp;
        }

        getFeelsLike() {
            return this.data.main.feels_like;
        }

        getSunrise() {
            return this.convertUnixToReadable(this.data.sys.sunrise);
        }

        getSunset() {
            return this.convertUnixToReadable(this.data.sys.sunset);
        }

        convertUnixToReadable(unixTimestamp) {
            const date = new Date(unixTimestamp * 1000);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            return date.toLocaleDateString("en-US", options);
        }
    }
});
