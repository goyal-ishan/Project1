const apiKey = "faa0dbeefd636807cce71eb3a74492f1";


async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      console.error("❌ API Error:", data.message);
      return;
    }

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temp").textContent = data.main.temp + " °C";
    document.getElementById("feels").textContent = data.main.feels_like + " °C";
    document.getElementById("humidity").textContent = data.main.humidity + " %";
    document.getElementById("condition").textContent = data.weather[0].description;
    document.getElementById("wind").textContent = data.wind.speed + " m/s";
    document.getElementById("sunrise").textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    document.getElementById("sunset").textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  } catch (error) {
    console.error("❌ Network Error:", error);
  }
}


async function fetchAndDisplayTableCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      console.error(`❌ Error fetching data for ${city}:`, data.message);
      return;
    }

    document.getElementById(`${city}-temp`).textContent = data.main.temp + " °C";
    document.getElementById(`${city}-feels`).textContent = data.main.feels_like + " °C";
    document.getElementById(`${city}-humidity`).textContent = data.main.humidity + " %";
    document.getElementById(`${city}-condition`).textContent = data.weather[0].description;
    document.getElementById(`${city}-wind`).textContent = data.wind.speed + " m/s";
    document.getElementById(`${city}-sunrise`).textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    document.getElementById(`${city}-sunset`).textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  } catch (error) {
    console.error(`❌ Network error for ${city}:`, error);
  }
}


window.addEventListener("load", () => {
  fetchWeather("Delhi");

  const tableCities = ["Lucknow", "Singapore", "London", "Jammu"];
  tableCities.forEach(city => fetchAndDisplayTableCity(city));
});


document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault();
  const city = document.getElementById("city").value.trim();
  if (city) fetchWeather(city);
});


document.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", function () {
    const city = this.textContent.trim();
    document.getElementById("city").value = city;
    fetchWeather(city);
  });
});
