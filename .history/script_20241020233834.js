async function fetchWeather(location) {
    //api
    const apiKey = "094b545dde613af5667ba10639a224f8"; 
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
  
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch weather data");
    }
  }
  //Display the weather
  function dispplayWeather(data) {
    console.log(data);
    //select the  DOM
    const weatherDisplay = document.getElementById("weather-display");
    const temperature = document.getElementById("temperature");
    const condition = document.getElementById("condition");
    const windSpeed = document.getElementById("wind-speed");
    const humidity = document.getElementById("humidity");
  
    temperature.textContent = data.main.temp;
    condition.textContent = data.weather[0].main;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed}m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherDisplay.style.display = "block";
  }
  
  function toggleElementVisibility(id, show) {
    const element = document.getElementById(id);
    element.style.display = show ? "block" : "none";
  }

  //DOM content Loaded
  document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const locationInput = document.getElementById("location-input");
    searchButton.addEventListener("click", async () => {
      toggleElementVisibility("loading", true); //Show loading
      toggleElementVisibility("error", false);
  
      //get data 
      const location = locationInput.value;
  
      try {
        const weatherData = await fetchWeather(location);
        toggleElementVisibility("loading", false); 
        dispplayWeather(weatherData);
        console.log(weatherData);
      } catch (error) {
        toggleElementVisibility("error", true); 
        toggleElementVisibility("loading", false); 
      }
    });
  });

  function randomText(){
    var text = ("!@#$%^*()")
    letters =text[Math.floor(Math.random() * text.length)];
    return letters;
}

function rain() {
    let cloud = document.querySelector('.cloud');
    let e = document.createElement('div');
    e.classList.add('drop');
    cloud.appendChild(e);

    let left = Math.floor(Math.random() * 300)
    let size = Math.random() * 1.5;
    let duration = Math.random() *1;

    e.innerText = randomText();
    e.style.left = left + 'px';
    e.style.fontSize = 0.5+size +'em';
    e.style.animationDuration = 1+duration+'s';

      setTimeout(function(){
      cloud.removeChild(e)
      },2000)
}

setInterval(function(){
    rain()
},20);