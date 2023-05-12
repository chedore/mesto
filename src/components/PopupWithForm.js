import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({selectorPopup, selectorForm, selectorInput, submitCallback }) {
    super(selectorPopup);
    this._formSubmit = this._popup.querySelector(selectorForm);
    this._inputList = Array.from(this._formSubmit.querySelectorAll(selectorInput));
    this._submitCallback = submitCallback;
  }

  // Функция возвращает значения из формы input
  _getInputValues() {
    const inputsValues = {};
    this._inputList.forEach((input) => {
      inputsValues[input.name] = input.value;
    });
    return inputsValues;
  }

  // Функция наполнения формы input
  setInputValues = (data) => {
    this._inputList.forEach((input, key) => {
      input.value = Object.values(data)[key];
    });
  }

  _saveProfileForm = (evt) => {
    evt.preventDefault();
    this._submitCallback(this._getInputValues());
    this.close();
       
  };

  setEventListeners() {
    super.setEventListeners();
    this._formSubmit.addEventListener('submit', this._saveProfileForm.bind(this)); 
  }

  close() {
    this._formSubmit.reset();
    super.close();
  }
}
