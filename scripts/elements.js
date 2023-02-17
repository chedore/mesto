const elementsValue = [
  {
    name: 'Республика Алтай',
    img: './images/altai.jpg',
    alt: 'Лес'
  },
  {
    name: 'Кисловодск',
    img: './images/kislovodsk.jpg',
    alt: 'Кольцо гора'
  },
  {
    name: 'Сочи',
    img: './images/krasnaya_polyana.jpg',
    alt: 'Красная поляна'
  },
  {
    name: 'Мурманск',
    img: './images/murmansk.jpg',
    alt: 'Cверное сияние'
  },
  {
    name: 'п-ов Гамова',
    img: './images/gamova.jpg',
    alt: 'Полуострова Гамова'
  },
  {
    name: 'Байкал',
    img: './images/baikal.png',
    alt: 'Байкал'
  }
]

let elementsContainer = document.querySelector('.elements')

/** Создать карточки */
const addElements = (imgValue = "", altValue = "", nameValue = "") => {
  const elementTemplate = document.querySelector('#element-template').content;
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true);
  elementElement.querySelector('.element__image').src = imgValue;
  elementElement.querySelector('.element__image').alt = altValue;
  elementElement.querySelector('.element__info-title').textContent = nameValue;

  /**поставиь лайк */
  elementElement.querySelector('.element__info-button').addEventListener('click', function (envent) {envent.target.classList.toggle('element__info-button-active');});

  /**удалить карточку */
  elementElement.querySelector('.element__basket').addEventListener('click', function (envent) {envent.target.closest('.element').remove();});

  /**попап карточки */
  // elementElement.querySelector('.element__image').addEventListener('click', function (envent) {console.log('111');});


  /**добавить в контейнер */
  elementsContainer.prepend(elementElement);
}

elementsValue.forEach((item) => {
  addElements(item.img, item.alt, item.name)
});

