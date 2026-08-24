const apiKey = "YOUR_API_KEY_HERE";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {

    const city = cityInput.value.trim();
    const message = document.getElementById("message");

    if (city === "") {
        message.textContent = "Please enter a city name.";
        return;
    }

    message.textContent = "Loading...";

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        const data = await response.json();

        console.log("API Response:", data);

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
                    data.message || "Something went wrong.";
            }

            return;
        }

        message.textContent = "";

        document.getElementById("cityName").textContent =
            data.name;

        document.getElementById("temperature").textContent =
            `Temperature: ${Math.round(data.main.temp)}°C`;

        document.getElementById("humidity").textContent =
            `Humidity: ${data.main.humidity}%`;

        document.getElementById("description").textContent =
            `Weather: ${data.weather[0].description}`;

        const iconCode = data.weather[0].icon;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    }

    catch (error) {

        console.error("Error:", error);

        message.textContent =
            "Unable to connect to the weather service.";
    }
}