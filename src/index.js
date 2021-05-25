import './sass/main.scss';
import countryMarkup from './templates/one-country.hbs';
import coutryListMarkup from './templates/country-list.hbs';
import { error } from '@pnotify/core';


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
    refs.countryList.innerHTML = "";

    fetch(`https://restcountries.eu/rest/v2/name/${refs.input.value}`)
        .then(responce => {
            return responce.json();
        })
        .then(country => {
            //if (country.length > 10) {
            //    const myError = error({
            //        text: "I'm an error message."
            //    });
            //    myError;
            //        
            //}
            if (country.length === 1) {
                refs.countryList.insertAdjacentHTML('beforeend', createCountryMarkup(country));
                return
            };
            if (1 < country.length <= 10) {
                refs.countryList.insertAdjacentHTML('beforeend', createCountryListMarkup(country));
            }
        })
        .catch(error => {
            console.log(error);
        })
}

refs.input.addEventListener('input', add);