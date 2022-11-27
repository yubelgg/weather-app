const content = document.querySelector(".main-box"),
  input = content.querySelector(".input"),
  inputInfo = input.querySelector(".input-text"),
  inputField = input.querySelector("input"),
  locationDetail = content.querySelector(".location"),
  temperature = content.querySelector(".number"),
  tempHigh = content.querySelector(".high-low .tempHigh"),
  tempLow = content.querySelector(".high-low .tempLow"),
  weatherDesc = content.querySelector(".desc"),
  weatherIcon = content.querySelector(".weather-box img");

let apikey = "9fd4e122e74c1b16ae48a4dd3dde4e95";

inputField.addEventListener("keyup", (click) => {
  if (click.key == "Enter" && inputField != "") {
    show(inputField.value);
  }
});

function show(city) {
  let api = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apikey}`;
  fetch(api)
    .then((response) => response.json())
    .then((result) => {
      weatherApi(result);
    });
}

function weatherApi(result) {
  if (result.cod == "404" || result[0] == null) {
    locationDetail.innerText = `${inputField.value} is not a city`;
    inputField.value = "";
  } else {
    const { lon, lat } = result[0];
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apikey}`;
    fetch(api)
      .then((response) => response.json())
      .then((result) => {
        weatherInfo(result);
      });
  }
}

function weatherInfo(result) {
  const name = result.name;
  const temp = Math.floor(result.main.temp);
  const tempHigh = Math.floor(result.main.temp_max);
  const tempLow = Math.floor(result.main.temp_min);
  const { description, id } = result.weather[0];

  if (id == 800) {
    weatherIcon.src = "icons/day.svg";
  } else if (id >= 200 && id <= 232) {
    weatherIcon.src = "icons/thunder.svg";
  } else if (id >= 300 && id <= 321) {
    weatherIcon.src = "icons/rainy-1.svg";
  } else if (id >= 500 && id <= 531) {
    weatherIcon.src = "icons/rainy-6.svg";
  } else if (id >= 600 && id <= 622) {
    weatherIcon.src = "icons/snowy-6";
  } else if (id >= 700 && id <= 781) {
    weatherIcon.src = "icons/mist.png";
  } else if (id >= 801 && id <= 804) {
    weatherIcon.src = "icons/cloudy.svg";
  } else {
    weatherIcon.src = "icons/day.svg";
  }

  locationDetail.innerText = name;
  temperature.innerText = temp;
  weatherDesc.innerText = description;
  tempHigh.innerText = `H: ${tempHigh} F°`;
  tempLow.innerText = `L: ${tempLow} F°`;
  inputField.value = "";
}
