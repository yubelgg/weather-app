const content = document.querySelector(".main-box"),
  input = content.querySelector(".input"),
  inputInfo = input.querySelector(".input-text"),
  inputField = input.querySelector("input"),
  locationDetail = content.querySelector(".location");

inputField.addEventListener("keyup", (click) => {
  if (click.key == "Enter" && inputField != "") {
    CallDisplay(inputField.value);
  }
});

function CallDisplay(city) {
  let apikey;
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apikey}`;
  fetch(api)
    .then((response) => response.json())
    .then((result) => {
      // would be better for all this to be a function
      // result.weather returning undefined values (unable to update weather conditions)
      if (result.cod == "404") {
        content.querySelector(
          ".location"
        ).innerText = `${inputField.value} is not a city`;
      } else {
        const name = result.name;
        const temp = Math.floor(result.main.temp);
        const tempHigh = Math.floor(result.main.temp_max);
        const tempLow = Math.floor(result.main.temp_min);

        locationDetail.innerText = name;
        content.querySelector(".number").innerText = temp;
        content.querySelector(
          ".high-low .tempHigh"
        ).innerText = `H: ${tempHigh} F°`;
        content.querySelector(
          ".high-low .tempLow"
        ).innerText = `L: ${tempLow} F°`;
      }
    });
}
