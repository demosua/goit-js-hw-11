function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},a=t.parcelRequirea610;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},t.parcelRequirea610=a);var r=a("fZKcF"),i=a("7Y9D8"),s=a("2shzp"),l=a("50Kfe");e(i).Notify.init({width:"280px",position:"center-top",distance:"54px",timeout:1e3,clickToClose:!0}),API_KEY_PIXABAY="34930678-f4d511ae74090860518da87d0";let d=1,c="";const u={gallery:document.querySelector(".gallery"),form:document.querySelector("#search-form"),inputQuery:document.forms[0].elements.searchQuery,loadmoreBtn:document.querySelector(".load-more")};function f(){e(i).Notify.failure("Sorry, there are no images matching your search query. Please try again.")}function p(){e(i).Notify.failure("We're sorry, but you've reached the end of search results."),u.loadmoreBtn.classList.add("is-hidden")}function m(t){t&&(e(i).Notify.success(`Hooray! We found ${t} images.`),setTimeout((()=>{u.loadmoreBtn.classList.remove("is-hidden")}),500))}function g({data:t,totalHits:n}){try{if(0===n)return void f();if(0===t.length)return void p();const o=function(e){return e.map((({webformatURL:e,largeImageURL:t,tags:n,likes:o,views:a,comments:r,downloads:i})=>`<a class="photo-card-link" href="${t}">\n        <div class="photo-card">\n            <img class="photo-card-image" src="${e}" alt="${n}" loading="lazy" />\n            <div class="info">\n                <p class="info-item">\n                <b>Likes</b>\n                <span>${o.toLocaleString("uk")}</span>\n                </p>\n                <p class="info-item">\n                <b>Views</b>\n                <span>${a.toLocaleString("uk")}</span>\n                </p>\n                <p class="info-item">\n                <b>Comments</b>\n                <span>${r.toLocaleString("uk")}</span>\n                </p>\n                <p class="info-item">\n                <b>Downloads</b>\n                <span>${i.toLocaleString("uk")}</span>\n                </p>\n            </div>\n        </div> \n        </a>`)).join("")}(t);u.gallery.insertAdjacentHTML("beforeend",o);new(e(r))(".gallery a");return function(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:2*e,behavior:"smooth"})}(),n}catch(e){console.log(e)}}async function h(e,t){try{return(await s.default.get(`/?key=34930678-f4d511ae74090860518da87d0&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&per_page=200&page=${t}`,{baseURL:"https://pixabay.com/api",transformResponse:[function(e){const t=JSON.parse(e).totalHits,n=JSON.parse(e).hits,o=[];for(const e of n){const{webformatURL:t,largeImageURL:n,tags:a,likes:r,views:i,comments:s,downloads:l}=e;o.push({webformatURL:t,largeImageURL:n,tags:a,likes:r,views:i,comments:s,downloads:l})}return{data:o,totalHits:t}}]})).data}catch(e){console.error(e)}}u.loadmoreBtn.classList.add("is-hidden"),u.loadmoreBtn.addEventListener("click",(function(){d+=1,h(c,d).then(g).catch(p)})),u.form.addEventListener("submit",(function(t){if(t.preventDefault(),c!==u.inputQuery.value)return c=u.inputQuery.value,u.gallery.innerHTML="",void h(c,d).then(g).then(m).catch(f);if(c=u.inputQuery.value,!c)return void e(i).Notify.info("Please, enter some text.")})),u.inputQuery.addEventListener("input",e(l)((function(e){d=1,u.loadmoreBtn.classList.add("is-hidden")}),500));
//# sourceMappingURL=homework.8de16d6c.js.map
