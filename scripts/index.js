const profile = document.querySelector('.profile'); 

const popupProfile = document.querySelector('.popup_place_profile'); 
const openButtonProfile = profile.querySelector('.profile__edit-button'); 
const closeButtonProfile = popupProfile.querySelector('.popup__close-button');

const popupElement = document.querySelector('.popup_add_element'); 
const openButtonElement = profile.querySelector('.profile__add-button'); 
const closeButtonElement = popupElement.querySelector('.popup__close-button');

const popupImage = document.querySelector('.popup_type_image'); 
const openButtonImage = document.querySelector('.elements'); 
const closeButtonImage = popupImage.querySelector('.popup__close-button');

/** Все о попап - профиль */
managingPopupProfile(popupProfile, openButtonProfile, closeButtonProfile);

/** Все о попап - элемент */
managingPopupElement(popupElement, openButtonElement, closeButtonElement);

/** Все о попап - картинка */
managingPopupImage(popupImage, openButtonImage, closeButtonImage);


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
 * Управление попапом профиля
 * 
 * @param {object} popup ссылка на вызываемый попап
 * @param {object} popupToOpen кнопка открыть и сохранить попап
 * @param {object} popupToClose кнопка закрыть попап
 */
function managingPopupProfile (popup, popupToOpen, popupToClose){
  const nameProfile = profile.querySelector('.profile__info-title');
  const jobProfile = profile.querySelector('.profile__info-subtitle');
  const nameInput = popup.querySelector('.popup__input_type_name');
  const jobInput = popup.querySelector('.popup__input_type_job');

  /**Открыть попап */
  popupToOpen.addEventListener('click', () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopup(popup);
  }); 

  /**Сохранить попап */
  popup.addEventListener('submit', (evt) => {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popup);
  }); 

  /**Закрыть попап */
  popupToClose.addEventListener('click', () => closePopup(popup)); 
}

/**
 * Управление попапом элемента
 * 
 * @param {object} popup ссылка на вызываемый попап
 * @param {object} popupToOpen кнопка открыть и сохранить попап
 * @param {object} popupToClose кнопка закрыть попап
 */
function managingPopupElement (popup, popupToOpen, popupToClose){
  const nameInput = popup.querySelector('.popup__input_type_name');
  const urlInput = popup.querySelector('.popup__input_type_url');

  /**Открыть попап */
  popupToOpen.addEventListener('click', () => {
    openPopup(popup);
  }); 

  /**Сохранить попап */
  popup.addEventListener('submit', (evt) => {
    evt.preventDefault();
    /**Создаем карточку */
    addElements(urlInput.value, nameInput.value, nameInput.value);

    nameInput.value = ""
    urlInput.value = ""

    closePopup(popup);
  }); 

  /**Закрыть попап */
  popupToClose.addEventListener('click', () => closePopup(popup)); 
}


/**
 * Управление попапом картинка
 * 
 * @param {object} popup ссылка на вызываемый попап
 * @param {object} popupToOpen кнопка открыть попап
 * @param {object} popupToClose кнопка закрыть попап
 */
function managingPopupImage (popup, popupToOpen, popupToClose){
  
  /**Открыть попап */
  popupToOpen.addEventListener('click', (evt) => {
    const imgInput = evt.target; 
    const imgOutput = document.querySelector('.popup__img');
    const nameOutput = document.querySelector('.popup__name');

    imgOutput.src = imgInput.src;
    imgOutput.alt = imgInput.alt;
    nameOutput.textContent = evt.target.closest('.element').textContent;

    openPopup(popup);
  }); 

  /**Закрыть попап */
  popupToClose.addEventListener('click', () => closePopup(popup)); 
}