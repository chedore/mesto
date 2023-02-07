const profile = document.querySelector('.profile'); 
const openButtonProfile = profile.querySelector('.profile__edit-button'); 
const nameProfile = profile.querySelector('.profile__info-title');
const jobProfile = profile.querySelector('.profile__info-subtitle');


const popupProfile = document.querySelector('.popup_place_profile'); 
const closeButtonProfile = popupProfile.querySelector('.popup__close-button');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_job');


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


/**Открыть попап профиля */
openButtonProfile.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupProfile);
}); 

/**Сохранить попап профиля */
popupProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupProfile);
}); 

/**Закрыть попап профиля */
closeButtonProfile.addEventListener('click', () => closePopup(popupProfile)); 
