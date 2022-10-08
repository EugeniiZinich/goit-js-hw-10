import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import {
  createMarkupCountries,
  createMarkupCountry,
} from './js/markup-countries';
import { refs } from './js/refs';

const DEBOUNCE_DELAY = 300;

const onInputSearch = e => {
  const valueInput = e.target.value.trim().toLowerCase();

  fetchCountries(valueInput)
    .then(countries => {
      if (countries.length > 10) {
        Report.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      } else if (countries.length > 2 && countries.length < 10) {
        refs.countryInfo.innerHTML = '';
        createMarkupCountries(countries);
      } else if (countries.length === 1) {
        refs.countryList.innerHTML = '';
        createMarkupCountry(countries);
      } else if (valueInput === '') {
        clearMarkup();
      }
    })
    .catch(error => console.log(error));
};

function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));
