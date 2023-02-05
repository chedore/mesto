const elements = [
  {
    name: 'Байкал',
    img: './images/baikal.png',
    alt: 'Байкал'
  },
  {
    name: 'п-ов Гамова',
    img: './images/gamova.jpg',
    alt: 'Полуострова Гамова'
  },
  {
    name: 'Мурманск',
    img: './images/murmansk.jpg',
    alt: 'Cверное сияние'
  },
  {
    name: 'Сочи',
    img: './images/krasnaya_polyana.jpg',
    alt: 'Красная поляна'
  },
  {
    name: 'Кисловодск',
    img: './images/kislovodsk.jpg',
    alt: 'Кольцо гора'
  },
  {
    name: 'Республика Алтай',
    img: './images/altai.jpg',
    alt: 'Лес'
  }
]
let elementsContainer = document.querySelector('.elements')

/**
 * Создание карточек на странице
 * @param {object} element - структура одной карточки
 */
function addElement(element) {
  console.log(typeof element)
  elementsContainer.insertAdjacentHTML('beforeend', `
  <figure class="element">
    <img src=${element.img} alt="${element.alt}" class="element__image">
    <div class="element__info">
      <h2 class="element__info-title">${element.name}</h2>
      <button class="button button_place_element element__info-button"></button>
    </div>
  </figure>
  `);

}

elements.forEach((item) => {
  addElement(item);
});
