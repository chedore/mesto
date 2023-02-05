const profile = document.querySelector('.profile'); 
const openButtonProfile = profile.querySelector('.profile__edit-button'); 
let nameProfile = profile.querySelector('.profile__info-title');
let jobProfile = profile.querySelector('.profile__info-subtitle');


const popupProfile = document.querySelector('.popup_place_profile'); 
const closeButtonProfile = popupProfile.querySelector('.popup__close-button');
const saveButtonProfile = popupProfile.querySelector('.popup__save-button');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_job');


/**Открыть попап профиля */
openButtonProfile.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popupProfile.style.visibility = "visible";
}); 

/**Сохранить попап профиля */
saveButtonProfile.addEventListener('click', (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupProfile.style.visibility = "hidden";
}); 

/**Закрыть попап профиля */
closeButtonProfile.addEventListener('click', () => popupProfile.style.visibility = "hidden"); 
