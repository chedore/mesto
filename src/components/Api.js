export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
    console.log(this._authorization);
  }
  _checkResponse(res){
    return new Promise(function (resolve, reject) {  
      if (res.ok) {
        resolve('Запрос обработан успешно');
      } else {
        reject('Запрос отклонён');
      }
    });
  }

  getInitialCards() {
    fetch(`${this._baseUrl}/cards1`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(res => this._checkResponse(res))
    // .catch(error => console.log(error + ', нам жаль :('))
    // .then(res => res.json())
    // .then((result) => {
    //   console.log(result);
    //   console.log('ok');
    // });
    }
}
