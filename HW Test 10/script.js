// Импортируем наш скрипт
// import { fetchCountries } from "./fetchCountries";
// Ищем наши элементы
const input = document.getElementById('search-box');
const list = document.getElementById('country-list');
const info = document.getElementById('country-info');
// Вешаем слушателя на инпутик
input.addEventListener(`input`, SearchCountry);

// Фетчим и получаем промис с API-шки
const fetchCountries = name => {
    return fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
    )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  };

// Пишем функцию поиска стран в импуте
function SearchCountry (e) {
    // Сносим базовые параметры
    e.preventDefault();
    const infoFromInput = e.target.value.trim();
    if (!infoFromInput) {
        list.innerHTML = ``;
        info.innerHTML = ``;
        return;
    }
    // Работаем с промисами на ранее прописанной функции
    fetchCountries(infoFromInput)
    .then(data => {
      if (data.length > 10) {
        list.innerHTML = `
        <p>'Too many matches found. Please enter a more specific name</p>
        `
        return;
      }
      renderMarkup(data);
    })
    .catch(err => {
        list.innerHTML = `
        <p>'Oops, there is no country with that name</p>
        `;
        info.innerHTML = '';
      });
}

const renderMarkup = data => {
    if (data.length === 1) {
        list.innerHTML = '';
        info.innerHTML = `
        <li class="country-item">
            <img class="country-flag" src="${data[0].flags.svg}" alt="flag"/>
            <h2 class="country-name">Country name: ${data[0].name.common}</h2>
            <h3 class="country-capital">Capital: <span>${data[0].capital[0]}</span></h3>
            <p class="country-population">Population: <span>${data[0].population}</span></p>
            <p class="country-language">Languages: <span>${Object.values(data[0].languages).toString().split(",").join(", ")}</span></p>
        </li>
             `;
    } else {
        info.innerHTML = '';
      const markupList = renderListMarkup(data);
      list.innerHTML = markupList;
    }
  };

  const renderListMarkup = data => {
    return data
      .map(
        ({ name, flags }) =>
          `<li class="list"><img class="flag-list" src="${flags.svg}" alt="${name.official}">${name.official}</li>`
      )
      .join('');
  };





// City Guide from YouTube

// // Ищем наши елементы
// let searchBtn = document.getElementById(`search-btn`);
// let countryInp = document.getElementById(`country-inp`);
// // Кидаем слушателя
// searchBtn.addEventListener("click", () => {
//     let countryName = countryInp.value;
//     // Тянем ссылочку с АПИшки
//     let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
//     console.log(finalURL);
//     // Фетчим
//     fetch(finalURL)
//     // НЕ ЗАБЫТЬ ПОСТАВИТЬ () ПОСЛЕ JSON
//     .then((response) => response.json())
//     .then((data) => {
//         // !!!!!!! РАБОТА С ДАННЫМИ ИЗ АПИ !!!!!!!!!!!!!!
//         // console.log(data[0]);
//         // console.log(data[0].capital[0]);
//         // console.log(data[0].flags.svg);
//         // console.log(data[0].name.common);
//         // console.log(data[0].continents[0]);
//         // console.log(Object.keys(data[0].currencies)[0]);
//         // console.log(data[0].currencies[Object.keys(data[0].currencies)].name);
//         // console.log(Object.values(data[0].languages).toString().split(",").join(", "));
//         // Вставляем в нашу ДИВку "Резалт"
//         result.innerHTML = `
//         <img src="${data[0].flags.svg}" class="flag-img"> 
//         <h2>${data[0].name.common}</h2>
//         <div class="wrapper">
//             <div class="data-wrapper">
//                 <h4>Capital:</h4> <span>${data[0].capital[0]}</span>
//             </div>
//         </div>
//         <div class="wrapper">
//             <div class="data-wrapper">
//                 <h4>Continent:</h4> <span>${data[0].continents[0]}</span>
//             </div>
//         </div>
//         <div class="wrapper">
//             <div class="data-wrapper">
//                 <h4>Population:</h4> <span>${data[0].population}</span>
//             </div>
//         </div>
//         <div class="wrapper">
//             <div class="data-wrapper">
//                 <h4>Currency:</h4> <span>${data[0].currencies[Object.keys(data[0].currencies)].name} - ${Object.keys(data[0].currencies)[0]}</span>
//             </div>
//         </div>
//         <div class="wrapper">
//             <div class="data-wrapper">
//                 <h4>Common Languages:</h4> <span>${Object.values(data[0].languages).toString().split(",").join(", ")}</span>
//             </div>
//         </div>
//         `;
//     // В нашем промисе возвращаем ошибку
//     }) .catch(() => {
//         if (countryName == 0) {
//             result.innerHTML=`<h3>The input field cannot be empty</h3>`
//         } else {
//             result.innerHTML=`<h3>Please enter valid country name</h3>`
//         }

//     })
// });