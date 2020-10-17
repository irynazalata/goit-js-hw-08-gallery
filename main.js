
import pictures from './gallery-items.js'

const gallery = document.querySelector('.js-gallery');
const popUp = document.querySelector('.js-lightbox');
const popUpBtn = document.querySelector('.lightbox__button');
const popUpImg = document.querySelector('.lightbox__image');
const overlay = document.querySelector('.lightbox__overlay');

pictures.forEach(el => {
  gallery.insertAdjacentHTML('beforeend',
    `<li class="gallery__item">
    <a class="gallery__link" href="${el.original}">
    <img
      class="gallery__image"
      src="${el.preview}"
      data-source="${el.original}"
      alt="${el.description}"
    />
  </a>
</li>`)
})

const onImgClick = function(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;
  console.log(event.target.getAttribute('data-source'))
}



const openPopUp = function (event) {
  if (event.target.nodeName !== 'IMG') return;
  popUp.classList.add('is-open')
  popUpImg.src = event.target.dataset.source;
}
const closePopUp = function () {
  popUp.classList.remove('is-open')
  popUpImg.src = ''
}

const pressKeyChange = function (event) {
  if (popUp.classList.contains('is-open')) {
    if (event.key === 'Escape') closePopUp();
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      let index
      for (let i = 0; i < pictures.length; i++) {
        if (pictures[i].original === event.target.getAttribute('href')) {
          index = i;
        }
        }
        if (event.key === 'ArrowLeft') {
            if (event.target.getAttribute('href') !== pictures[0].original) {
              popUpImg.src = pictures[index - 1].original;
              event.target.setAttribute('href', pictures[index - 1].original)
            }
          } else if (event.key === 'ArrowRight') {

            if (event.target.getAttribute('href') !== pictures[pictures.length - 1].original) {
              popUpImg.src = pictures[index + 1].original;
              event.target.setAttribute('href', `${popUpImg.src}`)
          }
        }
      }
    }
  }
  
gallery.addEventListener('click', onImgClick)
gallery.addEventListener('click', openPopUp)
popUpBtn.addEventListener('click', closePopUp)
overlay.addEventListener('click', closePopUp)
window.addEventListener('keydown', pressKeyChange);
