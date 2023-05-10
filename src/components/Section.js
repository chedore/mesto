// import {handleCardClick} from '../pages/index.js';

export default class Section {
  constructor({renderer}, selector) {
    this._container = document.querySelector(selector);
    this._renderer = renderer;
  }

  // вставим разметку на страницу
  // добавить в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

  // визуализируем карточки
  // функция создания одной карточки
  renderItems(elements) {
    elements.forEach(element => {
      this._renderer(element);
    });
  }


}