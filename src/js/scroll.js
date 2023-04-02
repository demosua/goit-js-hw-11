import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import axios from "axios";
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

Notiflix.Notify.init({
    width: '280px',
    position: 'center-top',
    distance: '54px',
    timeout: 1000,
    clickToClose: false,
});

const API_KEY_PIXABAY = "34930678-f4d511ae74090860518da87d0";
let page = 1;
let query = '';
let limitReached = false;

const refs = {
    gallery: document.querySelector(".gallery-scroll"),
    form: document.querySelector('#search-form'),
    inputQuery: document.forms[0].elements.searchQuery,
};


refs.form.addEventListener('submit', onSubmitClick);
refs.inputQuery.addEventListener('input', debounce(onInputChange, 500));

window.addEventListener('scroll', throttle(checkPosition, 400))
window.addEventListener('resize', throttle(checkPosition, 400))

function onInputChange(e) {
    page = 1;
}

function onSubmitClick(e) {
    e.preventDefault();

    if (query !== refs.inputQuery.value) {
        query = refs.inputQuery.value;
        refs.gallery.innerHTML = "";
        getImages(query, page)
        .then(renderGallery)
        .then(showTotalHits)
        .catch(showErrorNoImagesFound);
        return;
    }

    query = refs.inputQuery.value;
    if (!query) {
        Notiflix.Notify.info("Please, enter some text.");
        return;
    }
}

function getMoreImages() {
    page += 1;
    getImages(query, page)
    .then(renderGallery)
    .catch(showErrorImagesLimitReached);
}

function showErrorNoImagesFound() {
    Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
}

function showErrorImagesLimitReached() {
    limitReached = true;
    Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
}

function showTotalHits(totalHits) {
    if (totalHits) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
}

function renderGallery({ data, totalHits }) {
    try {
        if (totalHits === 0) {
            showErrorNoImagesFound();
            return;
        }
        if (data.length === 0) {
            showErrorImagesLimitReached();
            return;
        }
        const markup = createMarkup(data);
        refs.gallery.insertAdjacentHTML("beforeend", markup);
        const gallery = new SimpleLightbox('.gallery-scroll a');
        return totalHits;
    }
    catch(error) {
        console.log(error);
    }
}

async function getImages(query, page) {
    try {
        const response = await axios.get(`/?key=${API_KEY_PIXABAY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`, {
            baseURL: 'https://pixabay.com/api',
            transformResponse: [function (tempResponse) {
                const totalHits = JSON.parse(tempResponse).totalHits;
                const images = JSON.parse(tempResponse).hits;
                const data = [];
                for (const image of images) {
                      
                    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
                    data.push({ webformatURL, largeImageURL, tags, likes, views, comments, downloads });
                }
                return { data, totalHits };
            }],
        });
        return response.data;
    } catch(error) {
        console.error(error);
    }
}

function createMarkup(data) {
        const markup = data.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<a class="photo-card-link" href="${largeImageURL}">
        <div class="photo-card">
            <img class="photo-card-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                <b>Likes</b>
                <span>${likes.toLocaleString('uk')}</span>
                </p>
                <p class="info-item">
                <b>Views</b>
                <span>${views.toLocaleString('uk')}</span>
                </p>
                <p class="info-item">
                <b>Comments</b>
                <span>${comments.toLocaleString('uk')}</span>
                </p>
                <p class="info-item">
                <b>Downloads</b>
                <span>${downloads.toLocaleString('uk')}</span>
                </p>
            </div>
        </div> 
        </a>`
    ).join('');
    
    return markup;
}

function checkPosition() {

        const height = document.body.offsetHeight
        const screenHeight = window.innerHeight

        const scrolled = window.scrollY
        const threshold = height - screenHeight / 4
        const position = scrolled + screenHeight
        if (position >= threshold && !limitReached) {
            getMoreImages();
        }
}