/* КАРТОЧКИ */
export const cardsContainer = document.querySelector('.elements')                    // контейнер 
const cardPopup = document.querySelector('.popup_add_element');               // попап
const openButtonСard = document.querySelector('.profile__add-button');         // кнопка сохранить

/* ПРОФИЛЬ */
const profile = document.querySelector('.profile');                           // блок profile
const profilePopup = document.querySelector('.popup_place_profile');          // попап
const openButtonProfile = profile.querySelector('.profile__edit-button');     // кнопка редактирования


/* КАРТИНКА */
export const popupImage = document.querySelector('.popup_type_image');               // попап
export const popupImageImg = popupImage.querySelector('.popup__img');                // попап элемент image
export const popupImageName = popupImage.querySelector('.popup__name');              // попап элемент name

/** Список всех popup */
const popupList = document.querySelectorAll('.popup'); 

/**
 * 
 * @param {object} popup открыть попап
 */
export const openPopup = (popup) => { 
  popup.classList.add('popup_opened'); 
  document.addEventListener('keydown', handleClosePopupKeydown);
};

/**
 * 
 * @param {object} popup закрыть попап
 */
const closePopup  = (popup) => { 
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopupKeydown);
};

/**
 * 
 * @param {*} popup сброс всех полей у попап
 */
const resetValidationStyle = (popup) => {
  const config = formValidationConfig;
  disableSubmitButton(true, popup.querySelector(config.submitButtonSelector), config); // сделай кнопку неактивной
  resetFormInputs(popup, config); // очистить все инпуты
};



/**
 * 
 * @param {*} popup сброс все инпут полей у попап 
 * @param {*} config конфиг для валидации, переменная formValidationConfig
 */
const resetFormInputs = (popup, config) => {
  const formElement = popup.querySelector(config.formSelector); 
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  formElement.reset();// очищаем инпут поля
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config); // очищаем от ошибок валидации
  });
}

/**
 * Функция обработки события.
 * - закрытие попапа кликом на оверлей;
 * - закрытие попапа клипом на крестик.
 * 
 * @param {*} evt 
 */
const handleClosePopupClick = (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__close")) {
    closePopup(evt.target.closest('.popup'));
  }
};


/**
 * Функция обработки события.
 * - закрытие попапа нажатием на Esc.
 * 
 * @param {*} evt 
 */
const handleClosePopupKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};


popupList.forEach((popup) => {
  popup.addEventListener('click', handleClosePopupClick);
});



/**
 * Управление попапом профиля. Позволяет зонировать функцию.
 * 
 * @param {object} popup ссылка на вызываемый попап
 * @param {object} openButton кнопка открыть
 */
function managePopupProfile (popup, openButton) {
  const nameProfile = profile.querySelector('.profile__info-title');
  const jobProfile = profile.querySelector('.profile__info-subtitle');
  const nameInput = popup.querySelector('.popup__input_type_name');
  const jobInput = popup.querySelector('.popup__input_type_job');
  const profileForm = document.forms['profile'];

  /**Открыть попап */
  openButton.addEventListener('click', () => {
    resetValidationStyle(popup);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopup(popup);
  }); 

  const saveProfileForm = (evt) => {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popup);
  };

  /**Сохранить попап */
  profileForm.addEventListener('submit', saveProfileForm); 
}

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
    resetValidationStyle(popup);
    openPopup(popup); 
  }); 

  const saveCardForm = (evt) => {
    evt.preventDefault();
    addElements(urlInput.value, nameInput.value, nameInput.value); /**Создаем карточку */
    closePopup(popup);
  };

  /**Сохранить попап */
  cardForm.addEventListener('submit', saveCardForm); 
}

/** Все о попап - профиль */
managePopupProfile(profilePopup, openButtonProfile);

/** Все о попап - элемент */
manageCardPopup(cardPopup, openButtonСard);