// Define your API key
const apiKey = "75db5d3fb8e44d856a0dd0e204f614de";

// Function to fetch weather data by city name
function fetchWeather() {
  const cityName = document.querySelector(".input-box input[type='text']").value;
  const temperatureUnit = document.querySelector("#select-Temp").value;
  let units = "";

  // Set the units based on the user's selection
  if (temperatureUnit === "celsius") {
    units = "metric"; // Celsius
  } else if (temperatureUnit === "fahrenheit") {
    units = "imperial"; // Fahrenheit
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {

      displayWeatherData(data);
    })
    .catch((error) => {
      console.error("There was a problem fetching the weather data:", error);
      // Display an alert for the error here
      alert("Invalid city name. Please check your input.");
    });
}

// Function to display weather data
function displayWeatherData(data) {
  // Extract the relevant weather information from the data
  const cityName = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  // Display the weather information on the webpage
  const weatherInfo = `
    Weather in ${cityName}:
    Temperature: ${temperature}°
    Description: ${description}
    Humidity: ${humidity}%
    Wind Speed: ${windSpeed} m/s
  `;

  // Display the weather information on the webpage
  const weatherInfoElement = document.querySelector(".weather-info");
  weatherInfoElement.textContent = weatherInfo;
}

// Add an event listener to the form to call fetchWeather when the form is submitted
const weatherForm = document.querySelector(".detail-box.weather form");
weatherForm.addEventListener("submit", function (e) {
  e.preventDefault(); 
  fetchWeather();
});
