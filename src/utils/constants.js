const altaiImage = new URL('../images/altai.jpg', import.meta.url);
const kislovodskImage = new URL('../images/kislovodsk.jpg', import.meta.url);
const sochiImage = new URL('../images/krasnaya_polyana.jpg', import.meta.url)
const murmanskImage = new URL('../images/murmansk.jpg', import.meta.url);
const gamovaImage = new URL('../images/gamova.jpg', import.meta.url);
const baikalImage = new URL('../images/baikal.png', import.meta.url)


export const elementsValue = [
  {
    name: 'Республика Алтай',
    img: altaiImage,
    alt: 'Лес'
  },
  {
    name: 'Кисловодск',
    img: kislovodskImage,
    alt: 'Кольцо гора'
  },
  {
    name: 'Сочи',
    img: sochiImage,
    alt: 'Красная поляна'
  },
  {
    name: 'Мурманск',
    img: murmanskImage,
    alt: 'Cверное сияние'
  },
  {
    name: 'п-ов Гамова',
    img: gamovaImage,
    alt: 'Полуострова Гамова'
  },
  {
    name: 'Байкал',
    img: baikalImage,
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

/* КАРТОЧКИ */
export const cardListSelector = '.elements';                                          // контейнер для карточек
export const cardTemplateSelector = '#element-template';                              // шаблон для карточки
export const cardPopupSelector = '.popup_add_element';                                // попап для добавления карточки 
export const popupButtonСard = document.querySelector('.profile__add-button');        // кнопка добавить новую карточку

/* ПРОФИЛЬ */
export const profilePopupSelector = '.popup_place_profile';                           // попап ПРОФИЛЬ
export const openButtonProfile = document.querySelector('.profile__edit-button');     // кнопка сохранить для попапа ПРОФИЛЬ
export const profileNameSelector = '.profile__info-title';                            // данные о профиле имя 
export const profileJobSelector = '.profile__info-subtitle';                          // данные о профиле работа

/* КАРТИНКА */
export const popupImageSelector = '.popup_type_image';                                // попап для карточки
export const popupImageImgSelector = '.popup__img';                                   // попап элемент image
export const popupImageNameSelector = '.popup__name';                                 // попап элемент name