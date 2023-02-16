const elementsValue = [
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

/** Создать карточки */
const addElements = (element) => {
  const elementTemplate = document.querySelector('#element-template').content;
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true);
  elementElement.querySelector('.element__image').src = element.img;
  elementElement.querySelector('.element__image').alt = element.alt;
  elementElement.querySelector('.element__info-title').textContent = element.name;

  elementElement.querySelector('.element__info-button').addEventListener('click', function (envent) {envent.target.classList.toggle('element__info-button-active');});



  elementsContainer.append(elementElement)
}

elementsValue.forEach((item) => {
  addElements(item)
});