/* КАРТОЧКИ */
const cardsContainer = document.querySelector('.elements')                    // контейнер 
const cardTemplate = document.querySelector('#element-template').content;     // шаблон
const cardPopup = document.querySelector('.popup_add_element');               // попап
const openButtonСard = document.querySelector('.profile__add-button');         // кнопка сохранить

/* ПРОФИЛЬ */
const profile = document.querySelector('.profile');                           // блок profile
const profilePopup = document.querySelector('.popup_place_profile');          // попап
const openButtonProfile = profile.querySelector('.profile__edit-button');     // кнопка редактирования


/* КАРТИНКА */
const popupImage = document.querySelector('.popup_type_image');               // попап
const popupImageImg = popupImage.querySelector('.popup__img');                // попап элемент image
const popupImageName = popupImage.querySelector('.popup__name');              // попап элемент name

// Находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

/** Открыть попап для картинки */
const handleCardClick = (imgValue, altValue, nameValue) => {
  popupImageImg.src = imgValue;
  popupImageImg.alt = altValue;
  popupImageName.textContent = nameValue;
  openPopup(popupImage);
}

/** Создать 1-карточку */
function createCard(imgValue, altValue, nameValue) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImg = cardElement.querySelector('.element__image');
  cardImg.src = imgValue;
  cardImg.alt = altValue;
  cardElement.querySelector('.element__info-title').textContent = nameValue;

  /**поставиь лайк */
  cardElement.querySelector('.element__info-button').addEventListener('click', function (envent) {envent.target.classList.toggle('element__info-button-active');});

  /**удалить карточку */
  cardElement.querySelector('.element__basket').addEventListener('click', function (envent) {envent.target.closest('.element').remove();});
  
  /**открыть картинку */
  cardImg.addEventListener('click', () => handleCardClick(imgValue, altValue, nameValue));

  return cardElement;
}



/** Создать карточки и добавить в контейнер*/
const addElements = (imgValue = "", altValue = "", nameValue = "") => {
  const cardElement = createCard(imgValue, altValue, nameValue);
  /**добавить в контейнер */
  cardsContainer.prepend(cardElement);
}

// Создаем карточки
elementsValue.forEach((item) => {
  addElements(item.img, item.alt, item.name)
});


 
/** Все о попап - профиль */
managePopupProfile(profilePopup, openButtonProfile);

/** Все о попап - элемент */
manageCardPopup(cardPopup, openButtonСard);


/**
 * 
 * @param {object} popup открыть попап
 */
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};


/**
 * 
 * @param {object} popup закрыть попап
 */
const closePopup  = (popup) => {
  popup.classList.remove('popup_opened');
};



/**
 * Управление попапом профиля. Позволяет зонировать функцию.
 * 
 * @param {object} popup ссылка на вызываемый попап
 * @param {object} openButton кнопка открыть
 */
function managePopupProfile (popup, openButton){
  const nameProfile = profile.querySelector('.profile__info-title');
  const jobProfile = profile.querySelector('.profile__info-subtitle');
  const nameInput = popup.querySelector('.popup__input_type_name');
  const jobInput = popup.querySelector('.popup__input_type_job');
  const profileForm = document.forms['profile'];

  /**Открыть попап */
  openButton.addEventListener('click', () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopup(popup);
  }); 

  /**Сохранить попап */
  profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popup);
  }); 
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
    openPopup(popup);
  }); 

  /**Сохранить попап */
  cardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    /**Создаем карточку */
    addElements(urlInput.value, nameInput.value, nameInput.value);
    evt.target.reset();

    closePopup(popup);
  }); 
}
