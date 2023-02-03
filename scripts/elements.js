const elements = [
  {
    name: 'Байкал',
    img: './images/baikal.png',
    alt: 'Изображение сколы с чайками'
  },
  {
    name: 'п-ов Гамова',
    img: './images/gamova.jpg',
    alt: 'Фотография полуострова Гамова'
  },
  {
    name: 'Кисловодск',
    img: './images/kislovodsk.jpg',
    alt: 'Кольцо гора'
  }
]
let elementsContainer = document.querySelector('.elements')


function addElement(element) {
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
