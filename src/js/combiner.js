'use strict'

import {default as imagesCollection} from "./gallery-items.js";

const refGallery = document.querySelector('.gallery');
const refLightBox = document.querySelector('.lightbox');
const refPopupImg = document.querySelector('.lightbox___image');
const refCloseBtn = document.querySelector('button[data-action=close-lightbox]');
const refOverlay = document.querySelector('.lightbox__content');

const imagesToPage = imagesCollection.reduce((acc, img) => {
    img = `<li class="gallery__item">
            <a class="gallery__link" href="${img.original}">
                <img class="gallery__image" src="${img.original}" data-source="${img.original}" alt="${img.description}"/>
               
                
            </a>
        </li>`;
    return acc += img;
}, '');

refGallery.insertAdjacentHTML('afterbegin', imagesToPage);

const openPopUp = (event) => {
    if (event.target === event.currentTarget) {
        return;
    }
    event.preventDefault();
    refLightBox.classList.add('is-open');
    refPopupImg.setAttribute('src', `${event.target.getAttribute('src')}`);
}

const closePopUp = (event) => {
    if ( refLightBox.classList.contains('is-open') && event.target !== refPopupImg ) {
        refLightBox.classList.remove('is-open');
     }
    return;
}

const closeByKey = (event) => {
    if (event.keyCode === 27) 
    refLightBox.classList.remove('is-open');
}

refGallery.addEventListener('click', openPopUp);
refCloseBtn.addEventListener('click', closePopUp);
refOverlay.addEventListener('click', closePopUp);
document.addEventListener('keydown', closeByKey);
