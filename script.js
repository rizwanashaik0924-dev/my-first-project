const apiKey = "55387adf9c7f17b054d74f731e36925b";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const message = document.getElementById("message");

const cityName = document.getElementById("cityName");
const dateTime = document.getElementById("dateTime");

const weatherIcon = document.getElementById("weatherIcon");

const temperature = document.getElementById("temperature");
const temperatureDetail = document.getElementById("temperatureDetail");

const humidity = document.getElementById("humidity");
const country = document.getElementById("country");

const description = document.getElementById("description");


/* Search button */

searchBtn.addEventListener("click", getWeather);


/* Press Enter to search */

cityInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        getWeather();
    }

});


/* Get Weather */

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {

        message.textContent =
            "Please enter a city name.";

        return;
    }


    /* Check API key */

    if (
        apiKey === "YOUR_API_KEY_HERE" ||
        apiKey.trim() === ""
    ) {

        message.textContent =
            "Please add your OpenWeather API key in script.js.";

        return;
    }


    message.textContent = "Loading weather...";


    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;


        const response = await fetch(url);

        const data = await response.json();

        console.log("API Response:", data);


        /* Handle errors */

        if (!response.ok) {

            if (response.status === 401) {

                message.textContent =
                    "Invalid API key or API key is not activated yet.";

            }

            else if (response.status === 404) {

                message.textContent =
                    "City not found. Please check the city name.";

            }

            else {

                message.textContent =
                    data.message ||
                    "Something went wrong.";

            }

            return;
        }


        /* Clear message */

        message.textContent = "";


        /* City */

        cityName.textContent =
            data.name;


        /* Temperature */

        const temp =
            Math.round(data.main.temp);

        temperature.textContent =
            `${temp}°C`;

        temperatureDetail.textContent =
            `${temp}°C`;


        /* Humidity */

        humidity.textContent =
            `${data.main.humidity}%`;


        /* Country */

        country.textContent =
            data.sys.country;


        /* Weather description */

        description.textContent =
            data.weather[0].description;


        /* Weather icon */

        const iconCode =
            data.weather[0].icon;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        weatherIcon.alt =
            data.weather[0].description;


        /* Date and time */

        const currentDate =
            new Date();

        dateTime.textContent =
            currentDate.toLocaleString(
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

    }

    catch (error) {

        console.error(
            "Weather API Error:",
            error
        );

        message.textContent =
            "Unable to connect to the weather service.";
    }

}