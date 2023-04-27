export default class FormValidator {
  constructor(formElement, config) {
    this._form = formElement;
    this._config = config;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector)); // Находим все поля внутри формы
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
  };

  /**Функция валидации формы */
  enableValidation() {
    this._setEventListeners();
  };
  /**Функция очисткиформы формы */
  clearValidation() {


    //отлючим кнопку
    this._disableSubmitButton(true);

    this._form.reset();// очищаем инпут поля

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement); // очищаем от ошибок валидации
    });
  }

  /**Функция выбирает все инпуты на форме и следит за их валидацией*/
  _setEventListeners() {

    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement);

        this._toggleButtonState();
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
  _toggleButtonState = () => {
    // Если есть хотя бы один невалидный инпут
    this._disableSubmitButton(this._hasInvalidInput())
  };

  _disableSubmitButton = (inputsIsInvalid) => {
    if (inputsIsInvalid) {
      // сделай кнопку неактивной
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = 1;
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.classList.add('button');
      this._buttonElement.disabled = 0;
    }
  };

  /**Функция принимает массив полей, проходим по массиву, если поле не валидно, колбэк вернёт true*/
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
}
