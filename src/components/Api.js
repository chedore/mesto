export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  /**Проверить данные от сервера*/
  _checkResponse(res){
    if (res.ok) 
      {return res.json();}
    else 
      {return Promise.reject(`Запрос отклонён, ошибка ${res.status}, нам жаль :(`)}
  }
  /**Получение информации о пользователе с сервера*/
  async getInitialUser(){
    return await fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._checkResponse(res));
  }

  /**Получение карточек с сервера*/
  async getInitialCards() {
    return await fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._checkResponse(res));
  }

  /**Редактирование профиля*/
  async setInfolUser(data) {
    return await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    })
    .then(res => this._checkResponse(res));
  }

  /**Добавление новой карточки*/ 
  async addNewCard(data) {
    return await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.url
      })
    })
    .then(res => this._checkResponse(res));
  }

  /**Удаление карточки на сервере*/ 
  async deleteCard(cardId) {
    return await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._checkResponse(res));
  }

}
