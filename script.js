'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const input = document.querySelector(`.input__field`);
const button = document.querySelector(`.input__button`);
const buttonClear = document.querySelector(`.clear`);

///////////////////////////////////////
let id = 0;

const showCountry = () => {
  const request = new XMLHttpRequest();
  request.open(`GET`, `https://restcountries.com/v3.1/name/${input.value}`);
  request.send();
  request.addEventListener(`load`, () => {
    id += 1;
    const [data] = JSON.parse(request.responseText);
    console.log(data);
    const [lang] = Object.values(data.languages);
    const [currency] = Object.values(data.currencies);
    const country = !data.altSpellings[1]
      ? input.value.slice(0, 1).toUpperCase() +
        input.value.slice(1).toLowerCase()
      : data.altSpellings[1];
    console.log(typeof input.value);
    const html = `<article class="country" id="${id}">
    <button class="card__button" data-id="${id}">Clear</button>
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${country}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>🏰</span>${data.capital}</p>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} mln people</p>
    <p class="country__row"><span>🗣️</span>${lang}</p>
    <p class="country__row"><span>💰</span>${currency.name}</p>
  </div>
</article>`;
    countriesContainer.insertAdjacentHTML(`beforeend`, html);
    countriesContainer.style.opacity = 1;
    const closeBtns = document.querySelectorAll(`.card__button[data-id]`);
    closeBtns.forEach(clk => {
      clk.addEventListener(`click`, () => {
        document.getElementById(+clk.dataset.id).classList.add(`hidden`);
      });
    });
    input.value = ``;
  });
};
button.addEventListener(`click`, showCountry);
input.addEventListener(`keydown`, e => {
  if (e.key === `Enter`) {
    input.blur();
    showCountry();
  }
});

buttonClear.addEventListener(`click`, () => {
  countriesContainer.innerHTML = ``;
  id = 0;
});
