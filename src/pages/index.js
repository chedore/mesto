import '../pages/index.css';

import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js';
import { 
  formValidationConfig,

  cardListSelector,
  cardTemplateSelector,
  cardPopupSelector,
  popupButtonСard,
  popupProofDeleteCardSelector,  

  profilePopupSelector,
  openButtonProfile,
  profileNameSelector,
  profileJobSelector,
  profileAvatarSelector,
  popupAvatarSelector,
  popupButtonAvatar,

  popupImageSelector,
  popupImageImgSelector,
  popupImageNameSelector,

  apiConfig

} from '../utils/constants.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api';
import PopupProofDeleteCard from '../components/PopupProofDeleteCard.js';

/**------------------Работа с сервером---------------------- */
const api = new Api(apiConfig);

// Создаём массив с промисами
const promises = [api.getInitialUser(), api.getInitialCards()]
let curentUserId;

// Передаём массив с промисами методу Promise.all
Promise.all(promises)
  .then(([user, cards]) => {
    console.log('ok', cards)
    console.log('user', {user})
    curentUserId = user._id;
    userInfo.setUserInfo(user);
    defaultCardList.renderItems(cards, curentUserId);
  })
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

/**------------------Попап подтверждения удаления карточки---------------------- */

const cardDeletePopup = new PopupProofDeleteCard({
  selectorPopup: popupProofDeleteCardSelector,
  submitCallback: (cardId, card) => {
    api.deleteCard(cardId)
    .then(() => {
      card.handleBasketClick();
      cardDeletePopup.close();
    })
    .catch(error => alert(error));
  }
});

/**------------------Попап для редактирования аватар-профиля---------------------- */

const popupFormAvatar = new PopupWithForm({
  selectorPopup: popupAvatarSelector,
  selectorForm: '.popup__form',
  selectorInput: '.popup__input',
  submitCallback: (data) => {
    popupFormAvatar.renderPreloader(true, 'Сохранение...')
    api.setUserAvatar(data.url)
    .then((user) => {
      userInfo.setUserAvatar(data.url);
    })
    .catch(error => alert(error))
    .finally(() => {
      popupFormAvatar.renderPreloader(false);
    });
  }
});

/**Открыть попап добавления карточки */
popupButtonAvatar.addEventListener('click', () => {
  popupFormAvatar.open();
  resetValidationStyle(document.forms['avatar']);
});

/**------------------Карточки с изображением---------------------- */

/** Функция создания карточки */
const createCard = (cardData) => {
  const card = new Card({
    data: cardData, 
    userID: curentUserId,
    templateSelector: cardTemplateSelector, 
    handleCardClick: (image) => {
      cardImagePopup.open(image);
    },
    handleCardDelete: (cardId, cardElement) => {
      cardDeletePopup.open(cardId, cardElement);
    },
    handleCardLikeUp: (cardId) => {
      api.setLikeUp(cardId)
      .then((res) => {
        card.renderCardLike(res);
      })
    .catch(error => alert(error));

    },
    handleCardLikeDown: (cardId) => {
      api.setLikeDown(cardId)
      .then((res) => {
        card.renderCardLike(res);
      })
    .catch(error => alert(error));

    }

  });
  return card.generateCard();
}

// Создаем карточки
const defaultCardList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    defaultCardList.addItem(cardElement);
  },
},
cardListSelector
); 

/**------------------Попап профильпользователя---------------------- */
/** Все о попап - профиль */
// Информация из профля пользователя
const userInfo = new UserInfo({
  selectorName: profileNameSelector,
  selectorJob: profileJobSelector,
  selectorAvatar: profileAvatarSelector
})

/**Сохранить попап редактировапния профиля */
const profilePopup = new PopupWithForm({
  selectorPopup: profilePopupSelector,
  selectorForm: '.popup__form',
  selectorInput: '.popup__input',
  submitCallback: (data) => {
    profilePopup.renderPreloader(true, 'Сохранение...')
    api.setInfolUser(data)
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .catch(error => alert(error))
    .finally(() => {
      profilePopup.renderPreloader(false);
    });
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
    popupFormAddCards.renderPreloader(true, 'Сохранение...')
    api.addNewCard(data)
    .then(newCard => {
      defaultCardList.addItem( createCard(newCard) )
    })
    .catch(error => alert(error))
    .finally(() => {
      popupFormAddCards.renderPreloader(false);
    });
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
cardDeletePopup.setEventListeners();
popupFormAvatar.setEventListeners();