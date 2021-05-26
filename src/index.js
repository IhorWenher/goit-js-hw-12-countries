import './sass/main.scss';
import countryMarkup from './templates/one-country.hbs';
import coutryListMarkup from './templates/country-list.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import { alert, Stack } from '@pnotify/core'
import { defaults } from '@pnotify/core';
import { debounce } from "debounce";





const refs = {
    input: document.querySelector('.js-input'),
    countryList: document.querySelector('.country-list')
}

function createCountryMarkup(country) {
    return country.map(countryMarkup).join('');
}

function createCountryListMarkup(country) {
    return country.map(coutryListMarkup).join('');
}




const add = () => {

    fetch(`https://restcountries.eu/rest/v2/name/${refs.input.value}`)
        .then(responce => {
            return responce.json();
        })
        .then(country => {
            refs.countryList.innerHTML = "";

            if (country.length > 10) {
                defaults.delay = '100';
                defaults.sticker = false;

                const myError = error({
                    text: "Too many matches found. Enter more specific query"
                });

                return myError;
            }

            if (country.length === 1) {
                refs.countryList.insertAdjacentHTML('beforeend', createCountryMarkup(country));
                return
            };

            if (1 < country.length <= 10) {
                refs.countryList.insertAdjacentHTML('beforeend', createCountryListMarkup(country));
                return
            }

        })
        .catch(error => {
            console.log(error);
        })
}

refs.input.addEventListener('input', debounce(add, 500));