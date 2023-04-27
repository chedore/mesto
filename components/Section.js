import Card from '../components/Card.js';
import {handleCardClick} from '../pages/index.js';

export default class Section {
  constructor({data}, selector) {
    this._initialArray = data;
    this._container = document.querySelector(selector);
  }

  // визуализируем карточки
  // функция создания одной карточки
  renderItems() {
    this._initialArray.forEach((item) => {
      const card = new Card(item, '#element-template', handleCardClick);
      const cardElement = card.generateCard();

      this.setItem(cardElement);
    })

  }

  // вставим разметкуна страницу
  // добавить в контейнер
  setItem(element) {
    this._container.prepend(element);
  }
}