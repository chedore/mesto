// конфиг для валидации
const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__submit-inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

/**
 * Функция, которая добавляет класс с ошибкой
 * 
 * @param {*} formElement html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме
 * @param {*} inputElement проверяемое поле ввода
 * @param {*} errorMessage текст ошибки валидации
 */
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

/**
 * Функция, которая удаляет класс с ошибкой
 * 
 * @param {*} formElement html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме
 * @param {*} inputElement проверяемое поле ввода
 */
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};


/**
 * Функция принимает массив полей
 * 
 * @param {*} inputList проходим по массиву, если поле не валидно, колбэк вернёт true
 * @returns 
 */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

/**
 * 
 * @param {*} inputsIsInvalid булевое значение, проверяет невалидный инпут
 * @param {*} buttonElement кнопка формы
 */
const disableSubmitButton = (inputsIsInvalid, buttonElement, config) => {
  if (inputsIsInvalid) {
    // сделай кнопку неактивной
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = 1;
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.classList.add('button');
    buttonElement.disabled = 0;
  }
}

/**
 * Функция принимает массив полей ввода
 * и элемент кнопки, состояние которой нужно менять
 * 
 * @param {*} inputList массив инпутов
 * @param {*} buttonElement кнопка формы
 */
const toggleButtonState = (inputList, buttonElement, config) => {
    // Если есть хотя бы один невалидный инпут
    disableSubmitButton(hasInvalidInput(inputList), buttonElement, config)
};

/**
 * Функция, которая проверяет валидность поля
 * @param {*} formElement html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме
 * @param {*} inputElement проверяемое поле ввода
 */
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, config);
  }
};

/**
 * Функция выбирает все инпуты на форме
 * и следит за их валидацией
 * 
 * @param {*} formElement форма с которой работаем
 */
const setEventListeners = (formElement, config) => {
  // Находим все поля внутри формы
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, config);

      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

/**
 * Функция выбирает все формы с указанным классом в DOM.
 * Для каждой формы вызовем функцию setEventListeners.
 * 
 */
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};


enableValidation(formValidationConfig);