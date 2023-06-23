const apiKey = 'f51c6a2302c546d7b50224353232206';

// Path: city
const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

// Delete card
function removeCard() {
    const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
    // Show on card
    const html = `<div class="card">${errorMessage}</div>`;
    // Show card on page
    header.insertAdjacentHTML('afterend', html);
}

function showCard({ name, country, temp, condition }) {
    const html = `<div class="card">
    <h2 class="card-city">${name}<span>${country}</span></h2>
    <div class="card-weather">
      <div class="card-value">${temp}<sup>°c</sup></div>
      <img class="card-img" src="./img/1.png" alt="Weather">
    </div>
    <div class="card-description">${condition}</div>
  </div>`;
    // Show card on page
    header.insertAdjacentHTML('afterend', html);
}

async function getWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        console.log(data);
        return data;
    } catch (error) {
        throw new Error('Failed to fetch weather data.');
    }
}

form.onsubmit = async function (e) {
    e.preventDefault();

    let city = input.value.trim();

    try {
        const data = await getWeather(city);

        removeCard();

        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: data.current.condition.text,
        };

        showCard(weatherData);
    } catch (error) {
        removeCard();
        showError(error.message);
    }
};

