'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//? https://restcountries.com/v2/
//? https://restcountries.com/v2/name/india

const getCountryData = function (country) {
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
getCountryData('germany');
