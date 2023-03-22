/**
 * Функция, которая добавляет класс с ошибкой
 * 
 * @param {*} formElement html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме
 * @param {*} inputElement проверяемое поле ввода
 * @param {*} errorMessage текст ошибки валидации
 */
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

/**
 * Функция, которая удаляет класс с ошибкой
 * 
 * @param {*} formElement html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме
 * @param {*} inputElement проверяемое поле ввода
 */
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
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
const disableSubmitButton = (inputsIsInvalid, buttonElement) => {
  if (inputsIsInvalid) {
    // сделай кнопку неактивной
    buttonElement.classList.add('form__submit-inactive');
    buttonElement.disabled = 1;
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('form__submit-inactive');
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
const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    disableSubmitButton(hasInvalidInput(inputList), buttonElement)
};

/**
 * Функция, которая проверяет валидность поля
 * @param {*} formElement html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме
 * @param {*} inputElement проверяемое поле ввода
 */
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

/**
 * Функция выбирает все инпуты на форме
 * и следит за их валидацией
 * 
 * @param {*} formElement форма с которой работаем
 */
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));

  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.popup__save-button');

  // toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

/**
 * Функция выбирает все формы с указанным классом в DOM.
 * Для каждой формы вызовем функцию setEventListeners.
 * 
 */
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};


enableValidation();