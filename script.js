// script.js

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");

// Replace with your API key
const apiKey = "a6ca0914b178b03bcb737e069f65d260";

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    cityName.textContent = "Error: " + error.message;
    temperature.textContent = "";
    description.textContent = "";
    weatherIcon.src = "";
    weatherInfo.classList.remove("hidden");
  }
}

function displayWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `🌡️ ${data.main.temp}°C`;
  description.textContent = data.weather[0].description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  // Show weather info and auto-center
  weatherInfo.classList.remove("hidden");
  weatherInfo.scrollIntoView({ behavior: "smooth", block: "center" });
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
  }
});
