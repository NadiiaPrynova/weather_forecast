const elements = {
    searchForm: document.querySelector('.js-search-form'),
    list: document.querySelector('.js-list')
}
elements.searchForm.addEventListener('submit', onFormSubmit);
function onFormSubmit(evt) {
    evt.preventDefault();

    // console.dir(evt.currentTarget);
    const { city, days } = evt.currentTarget.elements;
    serviceWeather(city.value, days.value)
        .then(data => elements.list.innerHTML = createMarkup(data.forecast.forecastday))
        .catch(err => console.log(err))
    .finally(() => evt.target.reset())
    // console.log(city.value);
    // console.log(days.value);
}

function serviceWeather(city, days) {
    const BASE_URL = 'http://api.weatherapi.com/v1';
    const END_POINT = '/forecast.json';
    const API_KEY = '480872f1fc5b49d2b1c112419232309'

    const params = new URLSearchParams({
    key: API_KEY,
    q: city,
    days: days,
    lang: "uk",
  });

    return fetch(`${BASE_URL}${END_POINT}?${params}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
            return resp.json()
        });

    
    // fetch(`${BASE_URL}${END_POINT}?key=${API_KEY}&q=${city}&days=${days}&lang=uk`)
}


function createMarkup(arr) {
    return arr.map(({date, day : {avgtemp_c, condition : {icon, text}}}) => `<li class="weather-card">
        <img src="${icon}" alt="${text}" class="weather-icon"/>
        <h2 class="date">${date}</h2>
        <h3 class="weather-text">${text}</h3>
        <h3 class="temperature">${avgtemp_c} °C</h3>
      </li>`).join('')
}
