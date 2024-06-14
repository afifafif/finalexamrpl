document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "/weather";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching the weather data:", error);
        });

    function displayWeather(data) {
        const locationElem = document.getElementById("location");
        const coordinatesElem = document.getElementById("coordinates");
        const weatherIconElem = document.getElementById("weather-icon");
        const weatherMainElem = document.getElementById("weather-main");
        const weatherDescriptionElem = document.getElementById("weather-description");
        const tempElem = document.getElementById("temp");
        const feelsLikeElem = document.getElementById("feels-like");
        const sunriseElem = document.getElementById("sunrise");
        const sunsetElem = document.getElementById("sunset");

        locationElem.textContent = data.name;
        coordinatesElem.textContent = `Lon: ${data.coord.lon}, Lat: ${data.coord.lat}`;
        weatherIconElem.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        weatherMainElem.textContent = data.weather[0].main;
        weatherDescriptionElem.textContent = data.weather[0].description;
        tempElem.textContent = data.main.temp;
        feelsLikeElem.textContent = data.main.feels_like;

        const sunriseDate = new Date(data.sys.sunrise * 1000);
        const sunsetDate = new Date(data.sys.sunset * 1000);
        sunriseElem.textContent = sunriseDate.toLocaleTimeString();
        sunsetElem.textContent = sunsetDate.toLocaleTimeString();
    }
});
