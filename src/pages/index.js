import '../pages/index.css';

import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js';
import {
  elementsValue, 
  formValidationConfig,

  cardListSelector,
  cardTemplateSelector,
  cardPopupSelector,
  popupButtonСard,  

  profilePopupSelector,
  openButtonProfile,
  profileNameSelector,
  profileJobSelector,

  popupImageSelector,
  popupImageImgSelector,
  popupImageNameSelector,

  apiConfig

} from '../utils/constants.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api';

/**------------------Работа с сервером---------------------- */
const api = new Api(apiConfig);

// Создаём массив с промисами
const promises = [api.getInitialCards()]

// Передаём массив с промисами методу Promise.all
Promise.all(promises)
  .then(result => console.log('ok'))
  .catch(error => alert(error))

/**------------------Валидация---------------------- */
/**
 * @param {*} formElement форма
 */
const resetValidationStyle = (formElement) => {
  formValidators[formElement.getAttribute('name')].clearValidation();
};

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

/**------------------Попап карточка---------------------- */
/** Все о попап - карточка */
const cardImagePopup = new PopupWithImage({
  selectorPopup: popupImageSelector,
  selectorCardImg: popupImageImgSelector,
  selectorCardName: popupImageNameSelector
});

/**------------------Карточки с изображением---------------------- */

/** Функция создания карточки */
const createCard = (cardData) => {
  const card = new Card(cardData, cardTemplateSelector, (image) => {
    cardImagePopup.open(image);
  });
  return card.generateCard();
}

// Создаем карточки
const defaultCardList = new Section({
  items: elementsValue,
  renderer: (item) => {
    const cardElement = createCard(item);
    defaultCardList.addItem(cardElement);
  },
},
cardListSelector
); 
defaultCardList.renderItems();

/**------------------Попап профильпользователя---------------------- */
/** Все о попап - профиль */
// Информация из профля пользователя
const userInfo = new UserInfo({
  selectorName: profileNameSelector,
  selectorJob: profileJobSelector
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

/**Открыть попап редактировапния профиля */
openButtonProfile.addEventListener('click', () => {
  resetValidationStyle(document.forms['profile']);
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open();
}); 

/**Попап для добавления карточки */
const popupFormAddCards = new PopupWithForm({
  selectorPopup: cardPopupSelector,
  selectorForm: '.popup__form',
  selectorInput: '.popup__input',
  submitCallback: (data) => {
    {
      defaultCardList.addItem(
        createCard({
          name: data.title,
          img: data.url,
          alt: data.title
        })
      )
    }
  }
});

/**Открыть попап добавления карточки */
popupButtonСard.addEventListener('click', () => {
  popupFormAddCards.open();
  resetValidationStyle(document.forms['card']);
});

/**------------------Слушатель для попапов---------------------- */
profilePopup.setEventListeners();
cardImagePopup.setEventListeners();
popupFormAddCards.setEventListeners();