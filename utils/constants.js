export const elementsValue = [
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

// конфиг для валидации
export const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__submit-inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const cardListSelector = '.elements';