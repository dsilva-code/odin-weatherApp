const inputButton = document.getElementById("submit");
const wName = document.getElementById("wName");
let weatherLoc = "";

inputButton.addEventListener("click", getWeatherName);

function getWeatherName(event){
    event.preventDefault();
    weatherLoc = wName.value;
    showInformation();
    
};

async function getWeather(weatherLoc) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherLoc}/?key=PKP3VEC93WKX4VJ3S32XPH32R`)
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.error(error);
    }
}

async function getData() {
    const weatherData = await getWeather(weatherLoc);

    const weatherInfo = {
        location: weatherData.address,
        timezone: weatherData.timezone,
        temp: weatherData.currentConditions.temp,
        precip: weatherData.currentConditions.precip
    };
    return weatherInfo;
    
}

const weatherLocation = document.getElementById("weatherLoc")
const weatherTime = document.getElementById("weatherTime")
const weatherTemp = document.getElementById("temp") 
const weatherPrecip = document.getElementById("precip")

async function showInformation() {
    const weatherObject = await getData();
    
    weatherLocation.innerHTML = "Location: " + weatherObject.location;
    weatherTime.innerHTML = "Timezone: " + weatherObject.timezone;
    weatherTemp.innerHTML = "Temperature: " + weatherObject.temp;
    weatherPrecip.innerHTML = "Precipitation: " + weatherObject.precip;
}