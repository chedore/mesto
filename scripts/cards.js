import {elementsValue} from './elements.js'
import {cardsContainer} from './index.js'

class Card {
  constructor(data, templateSelector) {
    this._src = data.img || '';
    this._alt = data.alt || '';
    this._name = data.name || '';
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true); 
    return cardElement;
  }
  /** Создать 1-карточку */
  generateCard() {
    this._element = this._getTemplate();

    //Добавим данные
    const cardImg = this._element.querySelector('.element__image');
    cardImg.src = this._src;
    cardImg.alt = this._alt;
    this._element.querySelector('.element__info-title').textContent = this._name;

    return this._element;
  }
}

// Создаем карточки
elementsValue.forEach((item) => {
  const card = new Card(item, '#element-template');
  const cardElement = card.generateCard();
  /**добавить в контейнер */
  cardsContainer.prepend(cardElement);
});