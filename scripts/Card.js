export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._src = data.img || '';
    this._alt = data.alt || '';
    this._name = data.name || '';
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    
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
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__info-button');
    this._basketButton = this._element.querySelector('.element__basket');
    this._cardButton = this._element.querySelector('.element__image');

    this._setEventListeners(); //слушатель событий

    //Добавим данные

    this._cardImage.src = this._src;
    this._cardImage.alt = this._alt;
    this._element.querySelector('.element__info-title').textContent = this._name;

    return this._element;
  }

  /**поставиь лайк */
  _handleLikeClick() {
    this._likeButton.classList.toggle('element__info-button-active');
  }

  /**удалить карточку */
  _handleBasketClick() {
    this._element.remove()
  }
  
  _setEventListeners() {
    /**поставиь лайк */
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    /**удалить карточку */
    this._basketButton.addEventListener('click', () => {
      this._handleBasketClick();
    });

    /**открыть картинку */
    this._cardButton.addEventListener('click', () => {
      this._handleCardClick(
          {name: this._name, link: this._src}
        );
    });
  }
}
