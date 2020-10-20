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

const openPopUp = function (event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;
  popUp.classList.add('is-open')
  popUpImg.src = event.target.dataset.source;
  console.log(popUpImg.src)
}
const closePopUp = function () {
  popUp.classList.remove('is-open')
  popUpImg.src = ''
}

const pressKeyChange = function (event) {
  if (popUp.classList.contains('is-open')) {
    if (event.key === 'Escape') closePopUp();
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      let index
      pictures.forEach((el, idx) => { if (el.original === event.target.getAttribute('href')) index = idx })
      if (event.key === 'ArrowLeft') {
        if (event.target.getAttribute('href') === pictures[0].original) {
          popUpImg.src = pictures[pictures.length - 1].original;
          event.target.setAttribute('href', `${popUpImg.src}`)
        } else {
          popUpImg.src = pictures[index - 1].original;
          event.target.setAttribute('href', `${popUpImg.src}`)
        }
      } else if (event.key === 'ArrowRight') {
        if (event.target.getAttribute('href') === pictures[pictures.length - 1].original) {
          popUpImg.src = pictures[0].original;
          event.target.setAttribute('href', `${popUpImg.src}`)
        } else {
          popUpImg.src = pictures[index + 1].original;
          event.target.setAttribute('href', `${popUpImg.src}`)
        }
      }
    }
  }
}
  
gallery.addEventListener('click', openPopUp)
popUpBtn.addEventListener('click', closePopUp)
overlay.addEventListener('click', closePopUp)
window.addEventListener('keydown', pressKeyChange);
