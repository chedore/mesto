// конфиг для валидации
export const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__submit-inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export class FormValidator {
  constructor(formElement, config) {
    this._form = formElement;
    this._config = config;
  };

  /**Функция валидации формы */
  enableValidation() {
    this._setEventListeners();
  };
  /**Функция очисткиформы формы */
  clearValidation() {
    const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));

    //отлючим кнопку
    const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    this._disableSubmitButton(true, buttonElement);

    this._form.reset();// очищаем инпут поля

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement); // очищаем от ошибок валидации
    });
  }

  /**Функция выбирает все инпуты на форме и следит за их валидацией*/
  _setEventListeners() {
    // Находим все поля внутри формы
    const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));

    // Найдём в текущей форме кнопку отправки
    const buttonElement = this._form.querySelector(this._config.submitButtonSelector);

    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement);

        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  /**Функция, которая проверяет валидность поля */
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  };
  
  /**Функция, которая добавляет класс с ошибкой */
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  /**Функция, которая удаляет класс с ошибкой */
  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  };

  /** Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять */
  _toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    this._disableSubmitButton(this._hasInvalidInput(inputList), buttonElement)
  };

  _disableSubmitButton = (inputsIsInvalid, buttonElement) => {
    if (inputsIsInvalid) {
      // сделай кнопку неактивной
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.disabled = 1;
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.classList.add('button');
      buttonElement.disabled = 0;
    }
  };

  /**Функция принимает массив полей, проходим по массиву, если поле не валидно, колбэк вернёт true*/
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

}


/**
 * Функция выбирает все формы с указанным классом в DOM.
 * Для каждой формы вызовем функцию enableValidationList.
 * 
 */
const enableValidationList = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  // const validationList = []
  
  formList.forEach((formElement) => {
    // setEventListeners(formElement, config);
    const validation = new FormValidator(formElement, config);
    validation.enableValidation();
    // validationList.append(validation);
  });
  // console.log(validationList);
};


enableValidationList(formValidationConfig);




