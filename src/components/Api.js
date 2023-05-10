export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
  }
  _checkResponse(res){
    if (res.ok) 
      {return res.json();}
    else 
      {return Promise.reject(`Запрос отклонён, ошибка ${res.status}, нам жаль :(`)}
  }

  async getInitialCards() {
    return await fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(res => this._checkResponse(res));
  }
}
