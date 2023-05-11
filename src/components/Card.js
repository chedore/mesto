export default class Card {
  constructor({data, userID, templateSelector, handleCardClick, handleCardDelete, handleCardLikeUp, handleCardLikeDown}) {
    this._src = data.link || '';
    this._alt = data.name || '';
    this._name = data.name || '';
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLikeUp = handleCardLikeUp;
    this._handleCardLikeDown = handleCardLikeDown;
    this.cardData = data; 
    this.userID = userID;
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

    //Выставляем лайки, которые пришли от сервера
    this.renderCardLike(this.cardData);

    //Показываем корзину, только владельцу карточки
    if (this.userID !== this.cardData.owner._id)
    {
      this._basketButton.remove();
    }

    return this._element;
  }

  /**Проверка лайков */
  checkLike() {
    return this.cardData.likes.some(like => like._id === this.userID);
  };


  renderCardLike(card) {
    this.cardData = card;
    const likes = card.likes;

    if (likes.length === 0) {
      this._cardLikesCount.textContent = 0;
    }
    else {
      this._cardLikesCount.textContent = likes.length;
    }

    if (this.checkLike()) {
      this._likeButton.classList.add('element__info-button-active');
    }
    else {
      this._likeButton.classList.remove('element__info-button-active');
    }

  }

  /**поставиь лайк */
  _handleLikeClick() {
    this._likeButton.classList.toggle('element__info-button-active');
    if (!this.checkLike()) {
      this._handleCardLikeUp(this.cardData._id);
    }
    else {
      this._handleCardLikeDown(this.cardData._id);
    }

  }

  /**удалить карточку */
  handleBasketClick(){
    this._element.remove();
  }
  
  _setEventListeners() {
    /**поставиь лайк */
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    /**удалить карточку по кнопке */
    this._basketButton.addEventListener('click', () => this._handleCardDelete(this.cardData._id, this));

    /**открыть картинку */
    this._cardButton.addEventListener('click', () => {
      this._handleCardClick(
          {name: this._name, link: this._src}
        );
    });
  }
}