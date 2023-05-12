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

  /**Поставить лайк и отправить на сервер*/
  async setLikeUp(cardId) {
    return await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => this._checkResponse(res));
  }

  /**Удалить лайк и отправить на сервер*/
  async setLikeDown(cardId) {
    return await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._checkResponse(res));
  }
  
  /**Изменить аватарку профиля*/
  async setUserAvatar(url) {
    console.log('!!!',url)
    return await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(res => this._checkResponse(res));
  }

}
