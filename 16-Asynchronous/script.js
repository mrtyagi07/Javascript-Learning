'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${
      Math.abs(Number(data.population)) >= 1.0e9
        ? (Math.abs(Number(data.population)) / 1.0e9).toFixed(2) + 'B'
        : // Six Zeroes for Millions
        Math.abs(Number(data.population)) >= 1.0e6
        ? (Math.abs(Number(data.population)) / 1.0e6).toFixed(2) + 'M'
        : // Three Zeroes for Thousands
        Math.abs(Number(data.population)) >= 1.0e3
        ? (Math.abs(Number(data.population)) / 1.0e3).toFixed(2) + 'K'
        : Math.abs(Number(data.population))
    }</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>
`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  //countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
///////////////////////////////////////
//? https://restcountries.com/v2/
//? https://restcountries.com/v2/name/india

/* const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data, data2] = JSON.parse(this.responseText);
    console.log(data2);
    console.log(data.languages[0].name);

    const html = `
  <article class="country">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${
      Math.abs(Number(data.population)) >= 1.0e9
        ? (Math.abs(Number(data.population)) / 1.0e9).toFixed(2) + 'B'
        : // Six Zeroes for Millions
        Math.abs(Number(data.population)) >= 1.0e6
        ? (Math.abs(Number(data.population)) / 1.0e6).toFixed(2) + 'M'
        : // Three Zeroes for Thousands
        Math.abs(Number(data.population)) >= 1.0e3
        ? (Math.abs(Number(data.population)) / 1.0e3).toFixed(2) + 'K'
        : Math.abs(Number(data.population))
    }</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>
`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// (
//   +data.population / 1000000000
// ).toFixed(1)

getCountryData('bharat');
getCountryData('usa');
getCountryData('germany'); */

/*
const getCountryAndNeighbour = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data, data2] = JSON.parse(this.responseText);

    // Render country 1
    renderCountry(data);

    // Get neighbout country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    //AJAX call country 2
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request.send();

    request.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

// (
//   +data.population / 1000000000
// ).toFixed(1)

getCountryAndNeighbour('bharat'); */

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// const request = fetch('https://restcountries.com/v2/name/bharat');
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

//! simplified code

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// const getCountryData = function (country) {
//   //country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       //const neighbour = data[0].borders?.[0];
//       const neighbour = 'ghjklbnm';
//       if (!neighbour) return;

//       //Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Neighbour Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} ⛔⛔`);
//       renderError(`Something went wrong ⛔⛔ ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  //country 1

  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');

      //Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Neighbour Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} ⛔⛔`);
      renderError(`Something went wrong ⛔⛔ ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('australia');
});
