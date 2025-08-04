async function getWeather() {
  const city = document.getElementById("cityName").value.trim();
  const output = document.getElementById("weatherOutput");

  if (!city) {
    output.textContent = "Please enter a city name.";
    return;
  }

  const apiKey = '56809a904d1ca09606d1ffd96e08a362'; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      if (response.status === 404) {
        output.textContent = "City not found. Please try again.";
      } else {
        output.textContent = "Error fetching weather data.";
      }
      return;
    }

    const data = await response.json();

    const name = data.name;
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    output.innerHTML = `
      Weather in ${name}:
      Temperature: ${temp} °C
      Description: ${description}
      <img src="${iconUrl}" alt="Weather icon" />
    `;
  } catch (error) {
    console.error(error);
    output.textContent = "Failed to fetch weather. Please try again.";
  }
}
