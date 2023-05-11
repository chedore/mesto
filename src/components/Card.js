export default class Card {
  constructor({data, templateSelector, handleCardClick, handleCardDelete}) {
    this._src = data.link || '';
    this._alt = data.name || '';
    this._name = data.name || '';
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this.cardData = data; 
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
    this._cardLikesCount = this._element.querySelector('.element__span');

    this._setEventListeners(); //слушатель событий

    //Добавим данные

    this._cardImage.src = this._src;
    this._cardImage.alt = this._alt;
    this._element.querySelector('.element__info-title').textContent = this._name;

    this.renderCardLike(this.cardData);

    return this._element;
  }

  renderCardLike(card) {
    this.cardData = card;
    const likes = card.likes;
    if (likes.length === 0) {
      this._cardLikesCount.textContent = 0;
    }
    else {
      this._cardLikesCount.textContent = likes.length;

    }
  }

  /**поставиь лайк */
  _handleLikeClick() {
    this._likeButton.classList.toggle('element__info-button-active');
  }

  // /**удалить карточку */
  // _handleBasketClick() {
  //   this._element.remove()
  // }
  
  _setEventListeners() {
    /**поставиь лайк */
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    /**удалить карточку */
    this._basketButton.addEventListener('click', () => this._handleCardDelete(this));

    /**открыть картинку */
    this._cardButton.addEventListener('click', () => {
      this._handleCardClick(
          {name: this._name, link: this._src}
        );
    });
  }
}