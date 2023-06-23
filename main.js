const apiKey = 'f51c6a2302c546d7b50224353232206';

// Path: city
const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');


form.onsubmit = function (e) {

    e.preventDefault();


    let city = input.value.trim();


    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);


            //Check for mistakes
            if (data.error) {

                //Delete card
                const prevCard = document.querySelector('.card');
                if (prevCard) prevCard.remove();

                //Show on card
                const html = `<div class="card">${data.error.message}</div>`;

                //Show card on page
                header.insertAdjacentHTML('afterend', html);


            } else {
                //Delete card
                const prevCard = document.querySelector('.card');
                if (prevCard) prevCard.remove();

                //Show on card

                const html = `<div class="card">
       <h2 class="card-city">${data.location.name}<span>${data.location.country}</span></h2>
 
        <div class="card-weather">
            <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
            <img  class="card-img" src="./img/1.png" alt="Weather">
        </div>

       <div class="card-description">${data.current.condition.text}</div>
    </div>`;


                //Show card on page
                header.insertAdjacentHTML('afterend', html);
            }
        })




}  //end form.onsubmit








