// import {handleCardClick} from '../pages/index.js';

export default class Section {
  constructor({items, renderer}, selector) {
    this._initialArray = items;
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
  renderItems() {
    this._initialArray.forEach(element => {
      this._renderer(element);
    });
  }


}