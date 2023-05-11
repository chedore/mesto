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
export const popupProofDeleteCardSelector = '.popup_type_delete';                     // попап для подтверждения удаления карточки

/* ПРОФИЛЬ */
export const profilePopupSelector = '.popup_place_profile';                           // попап ПРОФИЛЬ
export const openButtonProfile = document.querySelector('.profile__edit-button');     // кнопка сохранить для попапа ПРОФИЛЬ
export const profileNameSelector = '.profile__info-title';                            // данные о профиле имя 
export const profileJobSelector = '.profile__info-subtitle';                          // данные о профиле работа
export const profileAvatarSelector = '.profile__avatar';                              // url аватарки профиля

/* КАРТИНКА */
export const popupImageSelector = '.popup_type_image';                                // попап для карточки
export const popupImageImgSelector = '.popup__img';                                   // попап элемент image
export const popupImageNameSelector = '.popup__name';                                 // попап элемент name

// конфиг для api (работа с сервером)
export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'fdea87e7-1df2-431a-b562-32952ab45f46',
    "Content-Type": "application/json"
  }
}