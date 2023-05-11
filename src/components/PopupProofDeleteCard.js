import Popup from './Popup.js';

export default class PopupProofDeleteCard extends Popup {
  constructor({selectorPopup, submitCallback}) {
    super(selectorPopup);
    this._submitCallback = submitCallback;
    this._buttonSubmit = this._popup.querySelector('.popup__save-button');
  }
  open(cardId, cardElement) {
    super.open();
    this.cardId = cardId;
    this.cardElement = cardElement;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', () => {
      this._submitCallback(this.cardId, this.cardElement);
    });
  }
}