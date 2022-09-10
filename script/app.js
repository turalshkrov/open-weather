const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '473a205b131744294b15d5b1be0e7f53';

let temp;
let city = 'Baku';
let date = new Date().toISOString().slice(0, 10);
let degree = 'c';
let iconSource;

const searchFrom = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const degreeList = document.querySelector('.degree-list');
const tempUi = document.querySelector('.degree');
const cityUi = document.querySelector('.location');
const dateUi = document.querySelector('.date');
const weatherTextUi = document.querySelector('.weather-text');
const visibilityUi = document.querySelector('#visibility');
const windUi = document.querySelector('#wind');
const timezoneUi = document.querySelector('#timezone');
const humidityUi = document.querySelector('#humidity');
const pressureUi = document.querySelector('#pressure');
const countryUi = document.querySelector('#country');
const iconUi = document.querySelector('.weather-icon');

degreeList.addEventListener('click', (e) => {
    degreeSelect(e);
});

searchFrom.addEventListener('submit', (e) => {
    city = searchInput.value;
    getInfoFromApi(city);
    e.preventDefault();
})

getInfoFromApi(city);


function degreeSelect(e) {
    if (e.target.parentElement.className === 'degree-list') {
        for (let i = 0; i < 2; i++) {
            e.target.parentElement.children[i].className = '';
        }
        e.target.className = 'selected';
        if (e.target.id == 'k') {
            temp += 273;
            tempUi.innerHTML = temp + '°K';
            degree = 'k';
        }
        else {
            temp -= 273;
            tempUi.innerHTML = temp + '°C';
            degree = 'c';
        }
    }
}

function setIconSource(weather) {
    switch (weather) {
        case 'Clouds':
            iconSource = 'images/clouds.png';
            break;
        case 'Snow':
            iconSource = 'images/snow.png';
            break;
        case 'Rain':
            iconSource = 'images/rain.gif';
            break;
        case 'Tornado':
            iconSource = 'images/Tornado.png';
            break;
        case 'Clear':
            iconSource = 'images/sun.gif';
            break;
        case 'Thunderstorm':
            iconSource = 'images/cloud-lighting.gif';
        default:
            iconSource = 'images/partly-cloudy-day.gif';
            break;
    }
    return iconSource;
}

async function getInfoFromApi(city){
    await fetch(url + city + '&APPID=' + apiKey)
    .then(data => data.json())
    .then((result) => {
        if (degree === 'c') {
            temp = Math.round(result.main.temp) - 273;
            tempUi.innerHTML = temp + '°C';
        }
        else {
            temp = Math.round(result.main.temp);
            tempUi.innerHTML = temp + '°K';
        }
        cityUi.innerHTML = city;
        dateUi.innerHTML = date;
        weatherTextUi.innerHTML = result.weather[0].main;
        visibilityUi.innerHTML = result.visibility / 1000;
        windUi.innerHTML = result.wind.speed;
        timezoneUi.innerHTML = result.timezone / 1000;
        humidityUi.innerHTML = result.main.humidity;
        pressureUi.innerHTML = result.main.pressure;
        countryUi.innerHTML = result.sys.country;
        iconUi.innerHTML =`<img src='${setIconSource(result.weather[0].main)}'>`;
    })
    .catch(err => {
        console.log(err);
    })
}
