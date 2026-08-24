const apiKey = "55387adf9c7f17b054d74f731e36925b";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const message = document.getElementById("message");

const cityName = document.getElementById("cityName");
const dateTime = document.getElementById("dateTime");
const weatherIcon = document.getElementById("weatherIcon");

const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

const humidity = document.getElementById("humidity");
const temperatureDetail = document.getElementById("temperatureDetail");
const country = document.getElementById("country");


// Check all HTML elements
console.log("searchBtn:", searchBtn);
console.log("cityInput:", cityInput);
console.log("message:", message);
console.log("cityName:", cityName);
console.log("dateTime:", dateTime);
console.log("weatherIcon:", weatherIcon);
console.log("temperature:", temperature);
console.log("description:", description);
console.log("humidity:", humidity);
console.log("temperatureDetail:", temperatureDetail);
console.log("country:", country);


// Search button
searchBtn.addEventListener("click", getWeather);


// Enter key
cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});


async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        message.textContent = "Please enter a city name.";
        return;
    }

    message.textContent = "Loading weather...";

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        const data = await response.json();

        console.log("API Response:", data);

        if (!response.ok) {

            if (response.status === 401) {
                message.textContent =
                    "Invalid API key.";
            }
            else if (response.status === 404) {
                message.textContent =
                    "City not found.";
            }
            else {
                message.textContent =
                    data.message || "Something went wrong.";
            }

            return;
        }


        // CITY
        cityName.textContent = data.name;


        // TEMPERATURE
        const temp = Math.round(data.main.temp);

        temperature.textContent = `${temp}°C`;
        temperatureDetail.textContent = `${temp}°C`;


        // HUMIDITY
        humidity.textContent =
            `${data.main.humidity}%`;


        // COUNTRY
        country.textContent =
            data.sys.country;


        // DESCRIPTION
        description.textContent =
            data.weather[0].description;


        // ICON
        const iconCode =
            data.weather[0].icon;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        weatherIcon.alt =
            data.weather[0].description;


        // DATE
        dateTime.textContent =
            new Date().toLocaleString(
                "en-IN",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                }
            );


        message.textContent = "";

        console.log("SUCCESS: Weather displayed.");

    }

    catch (error) {

        console.error("Weather API Error:", error);

        message.textContent =
            "Unable to connect to the weather service.";
    }
}