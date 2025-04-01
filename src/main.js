document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  
  // Главная страница со списком стран
  function renderHome() {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(countries => {
        const html = `
          <h1>Countries of the World</h1>
          <div class="country-list">
            ${countries.map(country => `
              <div class="country-card" data-code="${country.cca3}">
                <img src="${country.flags.png}" alt="${country.name.common} flag" width="50">
                <h3>${country.name.common}</h3>
                <p>Capital: ${country.capital?.[0] || 'N/A'}</p>
              </div>
            `).join('')}
          </div>
        `;
        app.innerHTML = html;
        
        // Добавляем обработчики событий для карточек стран
        document.querySelectorAll('.country-card').forEach(card => {
          card.addEventListener('click', () => {
            const countryCode = card.getAttribute('data-code');
            renderCountryDetail(countryCode);
          });
        });
      })
      .catch(error => {
        app.innerHTML = `<p class="error">Failed to load countries: ${error.message}</p>`;
      });
  }
  
  // Страница с детальной информацией о стране
  function renderCountryDetail(countryCode) {
    fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      .then(response => response.json())
      .then(data => {
        const country = data[0];
        const html = `
          <button id="back-button">← Back to all countries</button>
          <div class="country-detail">
            <img src="${country.flags.png}" alt="${country.name.common} flag" width="100">
            <h1>${country.name.common}</h1>
            <p>Official Name: ${country.name.official}</p>
            <p>Capital: ${country.capital?.[0] || 'N/A'}</p>
            <p>Region: ${country.region}</p>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Languages: ${Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
            <p>Currency: ${country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A'}</p>
          </div>
        `;
        app.innerHTML = html;
        
        document.getElementById('back-button').addEventListener('click', renderHome);
      })
      .catch(error => {
        app.innerHTML = `<p class="error">Failed to load country details: ${error.message}</p>`;
      });
  }
  
  // Инициализация приложения
  renderHome();
});