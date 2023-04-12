import {elementsValue} from './elements.js'
import {cardsContainer, popupImageImg, popupImageName, openPopup, popupImage} from './index.js'

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
    const cardImg = this._element.querySelector('.element__image');

    this._setEventListeners(); //слушатель событий

    //Добавим данные

    cardImg.src = this._src;
    cardImg.alt = this._alt;
    this._element.querySelector('.element__info-title').textContent = this._name;

    return this._element;
  }

  /**поставиь лайк */
  _handleLikeClick() {
    this._element.querySelector('.element__info-button').classList.toggle('element__info-button-active');
  }

  /**удалить карточку */
  _handleBasketClick() {
    this._element.remove()
  }

  /** Открыть попап для картинки */
  _handleCardClick() {
    popupImageImg.src = this._src;
    popupImageImg.alt = this._alt;
    popupImageName.textContent = this._name;
    openPopup(popupImage);
  }

  _setEventListeners() {
    /**поставиь лайк */
    this._element.querySelector('.element__info-button').addEventListener('click', () => {
      this._handleLikeClick();
    });

    /**удалить карточку */
    this._element.querySelector('.element__basket').addEventListener('click', () => {
      this._handleBasketClick();
    });

    /**открыть картинку */
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}

// Создаем карточки
elementsValue.forEach((item) => {
  const card = new Card(item, '#element-template');
  const cardElement = card.generateCard();
  /**добавить в контейнер */
  cardsContainer.prepend(cardElement);
});