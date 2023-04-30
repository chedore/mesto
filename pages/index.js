/* КАРТОЧКИ */
// export const cardsContainer = document.querySelector('.elements')             // контейнер 
const cardPopup = document.querySelector('.popup_add_element');               // попап
const openButtonСard = document.querySelector('.profile__add-button');        // кнопка сохранить

/* ПРОФИЛЬ */
// const profile = document.querySelector('.profile');                           // блок profile
// const profilePopup = document.querySelector('.popup_place_profile');          // попап
//const openButtonProfile = document.querySelector('.profile__edit-button');     // кнопка редактирования


/* КАРТИНКА */
export const popupImage = document.querySelector('.popup_type_image');               // попап
export const popupImageImg = popupImage.querySelector('.popup__img');                // попап элемент image
export const popupImageName = popupImage.querySelector('.popup__name');              // попап элемент name

/** Список всех popup */
const popupList = document.querySelectorAll('.popup'); 

import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js';
import {
  elementsValue, 
  formValidationConfig,
  cardListSelector,
  profilePopupSelector,
  openButtonProfile
} from '../utils/constants.js'
import UserInfo from '../components/UserInfo.js';



/**
 * 
 * @param {*} formElement форма
 */
const resetValidationStyle = (formElement) => {
  formValidators[formElement.getAttribute('name')].clearValidation();
};




/**
 * Управление попапом элемента. Позволяет зонировать функцию.
 * 
 * @param {object} popup ссылка на вызываемый попап
 * @param {object} openButton кнопка открыть
 */
function manageCardPopup (popup, openButton){
  const nameInput = popup.querySelector('.popup__input_type_name');
  const urlInput = popup.querySelector('.popup__input_type_url');
  const cardForm = document.forms['card'];

  /**Открыть попап */
  openButton.addEventListener('click', () => {
    resetValidationStyle(cardForm);
    openPopup(popup); 
  }); 

  const saveCardForm = (evt) => {
    evt.preventDefault();

    const data = {
      name: nameInput.value,
      img: urlInput.value,
      alt: nameInput.value
    }
    
    addElements(data);/**Создаем карточку */

    closePopup(popup);
  };

  /**Сохранить попап */
  cardForm.addEventListener('submit', saveCardForm); 
}

/** Все о попап - элемент */
manageCardPopup(cardPopup, openButtonСard);


const formValidators = {}

/**
 * Функция выбирает все формы с указанным классом в DOM.
 * Для каждой формы вызовем функцию enableValidationList.
 * 
 */
const enableValidationList = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  
  formList.forEach((formElement) => {
    // setEventListeners(formElement, config);
    const validator = new FormValidator(formElement, config);

    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidationList(formValidationConfig);

/** Открыть попап для картинки */
export const handleCardClick = (data) => {
  popupImageImg.src = data.link;
  popupImageImg.alt = data.name;
  popupImageName.textContent = data.name;
  openPopup(popupImage);
}

//======

// Создаем карточки
const defaultCardList = new Section({
  items: elementsValue,
  renderer: (item) => {
    const card = new Card(item, '#element-template', handleCardClick);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  },
},
cardListSelector
); 
defaultCardList.renderItems();

/** Все о попап - профиль */
// Информация из профля пользователя
const userInfo = new UserInfo({
  selectorName: '.profile__info-title',
  selectorJob: '.profile__info-subtitle'
})
/**Сохранить попап редактировапния профиля */
const profilePopup = new PopupWithForm({
  selectorPopup: profilePopupSelector,
  selectorForm: '.popup__form',
  selectorInput: '.popup__input',
  submitCallback: (data) => {
    userInfo.setUserInfo(data);
  }
});
profilePopup.setEventListeners();

/**Открыть попап редактировапния профиля */
openButtonProfile.addEventListener('click', () => {
  resetValidationStyle(document.forms['profile']);
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open();
}); 