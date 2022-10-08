export { createMarkupCountries, createMarkupCountry };
import { refs } from './refs';

function createMarkupCountries(countries) {
  const markup = countries
    .map(({ flags: { svg }, name: { official } }) => {
      return `<li class="county-list__item"> 
  <img src="${svg}" alt="#" width="50" height="25" />
  <span>${official}</span>
</li>`;
    })
    .join('');

  renderCountries(markup);
}

function createMarkupCountry(country) {
  const markup = country
    .map(
      ({
        capital,
        population,
        languages,
        flags: { svg },
        name: { official },
      }) => {
        const languageVale = Object.values(languages).join(', ');

        return `<div class="country_info--container">
        <img class="country_info--img" width="100" height="50" src="${svg}" alt="#" />
        <span class="country_info--name">${official}</span>
      </div>
      <ul class="country_info--list">
        <li class="country_info-item">
          <span>Capital: <span>${capital}</span></span>
        </li>
        <li class="country_info-item">
          <span>Population: <span>${population}</span></span>
        </li>
        <li class="country_info-item">
          <span>Languages: <span>${languageVale}</span></span>
        </li>
      </ul>`;
      }
    )
    .join('');

  renderCountry(markup);
}

function renderCountries(markup) {
  refs.countryList.innerHTML = markup;
}

function renderCountry(markup) {
  refs.countryInfo.innerHTML = markup;
}
