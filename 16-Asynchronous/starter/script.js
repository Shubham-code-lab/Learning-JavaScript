'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//AJAX  (Asynchronous JavaScript And XML)

const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
}


const renderCountry  = function(countryData, className = ''){
    const html = `  
        <article class="country  ${className}">
            <img class="country__img" src="${countryData[0].flags.png}" />
            <div class="country__data">
                <h3 class="country__name">${countryData[0].name.common}</h3>
                <h4 class="country__region"${countryData[0].region}</h4>
                <p class="country__row"><span>👫</span>${((+countryData[0].population)/1000000).toFixed(1)} M people</p>
                <p class="country__row"><span>🗣️</span>${Object.keys(countryData[0].languages).map(key=>countryData[0].languages[key]).join(', ')}</p>
                <p class="country__row"><span>💰</span>${Object.keys(countryData[0].currencies).map(key=>countryData[0].currencies[key].name).join(', ')}</p>
            </div>
        </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

const getCountry = function(country){
    //how ajax call used to handle using event and callback
    const request =  new XMLHttpRequest();  //old way 
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);   //type of http request to get data is GET  
    request.send();     //send  request to above link   //ajax call is done in (async)background so we don't get data immeditate

    request.addEventListener('load', function(){
        // console.log(request.responseText);
        //OR
        // console.log(this.responseText);   //return json object

        const countryData = JSON.parse(this.responseText);
        console.log(countryData);
        renderCountry(countryData);

        //neightbour country
        const request2 =  new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v3.1/alpha/${countryData[0].borders[0]}`);
        request2.send();
        request2.addEventListener('load', function(){              //callback hell
            const countryData2 = JSON.parse(this.responseText);
            renderCountry(countryData2, 'neighbour');
        })
    })
}

//function call is syncro by request recieve are asyncro so order or data arrive are diffrent
// getCountry('india');
// getCountry('usa');




//ajax call using fetch API
//promise is only settle once it can be either [fulfilled] or [rejected]
const getCounrtyData = function(country){
    fetch(`https://restcountries.com/v3.1/name/${country}`)     //fetch return a promise[placeholder for futher value from async operation(ajax call)]
    .then(response=>{              //callback function in then is executed when promise is fulfilled
        console.log(response);
        return response.json();    //json() method is avalilable on all response object coming from fetch  //json() method return a new pormise
    })
    .then(countryData=>{
        console.log(countryData);
        renderCountry(countryData);
        if(!countryData[0].borders[0]) return;
        // return 45;  // what we return become fulfilled(response) value of the promise
        return fetch(`https://restcountries.com/v3.1/alpha/${countryData[0].borders[0]}`);   //don't call directly then() here as it same as callback hell
    })
    .then(response=>response.json())
    .then(neightbourCountryData=>{
        renderCountry(neightbourCountryData, 'neighbour');
    })
    .catch(err=>{  //if error accour in one of the then() then all other future chained then() stop executing and catch is called 
        console.error(err)
        renderError(err);
    })
    .finally(()=>{   //called no matter pormise fulfilled or rejected
        countriesContainer.style.opacity = 1;
    })   
}

btn.addEventListener('click', function(){
    getCounrtyData('usa');
})
