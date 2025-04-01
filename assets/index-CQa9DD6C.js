(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=i(t);fetch(t.href,e)}})();document.addEventListener("DOMContentLoaded",()=>{const c=document.getElementById("app");function r(){fetch("https://restcountries.com/v3.1/all").then(o=>o.json()).then(o=>{const t=`
          <h1>Countries of the World</h1>
          <div class="country-list">
            ${o.map(e=>{var n;return`
              <div class="country-card" data-code="${e.cca3}">
                <img src="${e.flags.svg}" alt="${e.name.common} flag" crossorigin="anonymous" width="50">
                <h3>${e.name.common}</h3>
                <p>Capital: ${((n=e.capital)==null?void 0:n[0])||"N/A"}</p>
              </div>
            `}).join("")}
          </div>
        `;c.innerHTML=t,document.querySelectorAll(".country-card").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-code");i(n)})})}).catch(o=>{c.innerHTML=`<p class="error">Failed to load countries: ${o.message}</p>`})}function i(o){fetch(`https://restcountries.com/v3.1/alpha/${o}`).then(t=>t.json()).then(t=>{var s;const e=t[0],n=`
          <button id="back-button">← Back to all countries</button>
          <div class="country-detail">
            <img src="${e.flags.svg}" alt="${e.name.common} flag" crossorigin="anonymous" width="100">
            <h1>${e.name.common}</h1>
            <p>Official Name: ${e.name.official}</p>
            <p>Capital: ${((s=e.capital)==null?void 0:s[0])||"N/A"}</p>
            <p>Region: ${e.region}</p>
            <p>Population: ${e.population.toLocaleString()}</p>
            <p>Languages: ${Object.values(e.languages||{}).join(", ")||"N/A"}</p>
            <p>Currency: ${e.currencies?Object.values(e.currencies).map(a=>`${a.name} (${a.symbol})`).join(", "):"N/A"}</p>
          </div>
        `;c.innerHTML=n,document.getElementById("back-button").addEventListener("click",r)}).catch(t=>{c.innerHTML=`<p class="error">Failed to load country details: ${t.message}</p>`})}r()});
