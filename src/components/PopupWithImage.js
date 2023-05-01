import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({selectorPopup, selectorCardImg, selectorCardName}) {
    super(selectorPopup);
    this._img = this._popup.querySelector(selectorCardImg);
    this._name = this._popup.querySelector(selectorCardName);
  }

  /** Открыть попап для картинки */
  open({link, name}){
    this._img.src = link;
    this._img.alt = name;
    this._name.textContent = name;
    super.open();
  }
}