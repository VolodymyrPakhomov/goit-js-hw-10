import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
// import {Notify} from 'notiflix';


const DEBOUNCE_DELAY = 300;


const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function onInputChange(e) {

    // clear all html
    iutputClear();
    const userInp = e.target.value.trim();
    if (userInp != '') {

        fetchCountries(userInp).then(handleCounties).catch(() => {
            Notify.failure("Oops, there is no country with that name");
        });
        


    }


}

const handleCounties = (countries) => {
    if (countries.length > 10) {
       // Notify "Too many matches found. Please enter a more specific name."
       Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (countries.length >=2 ) {
        // render countries
        renderPrewiewMarkup(countries);
    } else {
        renderCountryInfoMarkup(countries.pop());
    }
}

searchInput.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function iutputClear() {
    searchInput.innerHTML = '';
    countryList.innerHTML = '';
  }

  function renderPrewiewMarkup(countries) {
    const markup = countries.map(createPrewiewMarkup).join('');
    console.log(markup);
    countryList.innerHTML = markup;
  }
  
  function renderCountryInfoMarkup(country) {
    const markup = createCountryInfoMurkup(country);
    console.log(markup);
    countryList.innerHTML = markup;

  }
  

  function createPrewiewMarkup({ flags, name }) {
    return `<li class="country-list__item">
        <img
          class="country-list__flag"
          src="${flags.svg}"
          width="30px"
          height="20px"
        />
        <p class="country-list__name">${name.official}</p>
      </li>`;
  }
  
  function createCountryInfoMurkup({
    flags,
    name,
    capital,
    population,
    languages,
  }) {
    const langStr = Object.values(languages).join(', ');
  
    return ` 
      <div class="country-list__item">
      <img class="country-list__flag" width="60px" height="40px" src="${flags.svg}"></img>
      <p class="country-list__name accent">${name.official}</p></div>
      <div class="description">
      <p class="description__name">Capital: <span class="description__second-name" >${capital}</span><p>
      <p class="description__name">Population: <span class="description__second-name">  ${population}</span></p>
      <p class="description__name">Languages: <span class="description__second-name" >${langStr}</span></p>
      </div>`;
  }