const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');


async function checkWeather(city){
    const api_key = "f49bb4eb32c11b8c0ad86573eaa1593d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;


    switch(weather_data.weather[0].main){

    case 'Clouds':
        weather_img.src = "/assets/cloud.png";
        document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
        break;

    case 'Clear':
        weather_img.src = "/assets/clear.png";
        document.body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
        break;

    case 'Rain':
        weather_img.src = "/assets/rain.png";
        document.body.style.background = "linear-gradient(to right, #4e73df, #1cc88a)";
        break;

    case 'Mist':
        weather_img.src = "/assets/mist.png";
        document.body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
        break;

    case 'Snow':
        weather_img.src = "/assets/snow.png";
        document.body.style.background = "linear-gradient(to right, #e6dada, #274046)";
        break;

    default:
        document.body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
}

    console.log(weather_data);
}


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});