export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._buttonClose = this._popup.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened'); 
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // - закрытие попапа кликом на оверлей;
  _handleOverlayClosePopup(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    };
  }

  // - закрытие попапа нажатием на Esc.
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  // повесить слушателя
  setEventListeners() {
    // - закрытие попапа кликом на оверлей;
    this._popup.addEventListener('click', this._handleOverlayClosePopup.bind(this));
    // - закрытие попапа клипом на крестик.
    this._buttonClose.addEventListener('click', this.close.bind(this));
  }
}
