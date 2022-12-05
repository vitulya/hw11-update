// let lightbox = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: 250});
import './sass/index.scss';
import Notiflix from 'notiflix';
import imageTemplate from './template/imageCard.hbs'
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImage } from './indexAPI';
const refs = {
    formEl: document.querySelector('.search-form'),
    containerEl: document.querySelector('.gallery'),
    loadMoreEl: document.querySelector('.load-more')
}
let searchQuery = '';
let page = 1;
const limit = 40;
let totalPage = 0;
let lightbox;
refs.loadMoreEl.classList.add('hidden');
refs.formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    refs.containerEl.innerHTML = '';
    refs.loadMoreEl.classList.add('hidden');
    page = 1;
    // refs.containerEl.addEventListener('click', onImageClick());
    
    
    searchQuery = e.target.elements.searchQuery.value.trim();
    getImage(searchQuery, page, limit).then(data => {
 
        totalPage = Math.ceil(data.totalHits / limit);
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        if (data.hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        
        } else if (searchQuery && totalPage > 1) {
            renderImage(data.hits);
            refs.loadMoreEl.classList.remove('hidden');
        } else { 
        renderImage(data.hits);
            refs.loadMoreEl.classList.add('hidden');
        }
  onImageClick();
    })
})
   
function onImageClick() {
     lightbox = new SimpleLightbox('.gallery a');
}
refs.loadMoreEl.addEventListener('click', () => {
    page += 1;
    
    getImage(searchQuery, page, limit).then(data => {
        totalPage = Math.ceil(data.totalHits / limit);
        if (totalPage === page ) {
            refs.loadMoreEl.classList.add('hidden');
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }
        renderImage(data.hits);
        lightbox.refresh();
    })
})
function renderImage(desk) {
    const murkup = imageTemplate(desk);
    refs.containerEl.innerHTML += murkup;
}
// function renderImage(desk) {
//     const murkup = desk.map(({webformatURL,tags,likes,views,comments,downloads }) => {
//         return `
//         <div class="photo-card">
//             <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//             <div class="info">
//                 <p class="info-item">
//                       <b>Likes: ${likes}</b>
//                 </p>
//                 <p class="info-item">
//                      <b>Views: ${views}</b>
//                 </p>
//                 <p class="info-item">
//                   <b>Comments: ${comments}</b>
//                 </p>
//                 <p class="info-item">
//                     <b>Downloads: ${downloads}</b>
//                 </p>
//             </div>
//         </div>`
//     }).join('');
//     refs.containerEl.innerHTML = murkup;
// }
