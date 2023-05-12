export default class UserInfo {
  constructor({selectorName, selectorJob, selectorAvatar}) {
    this._nameProfile = document.querySelector(selectorName);
    this._jobProfile = document.querySelector(selectorJob);
    this._avatarProfile = document.querySelector(selectorAvatar);
    this._id = ''
  }
  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      job: this._jobProfile.textContent,
    }
  }
  setUserAvatar(avatar) {
    this._avatarProfile.src = avatar;
  }
  setUserInfo({name, about, avatar, _id}) {
    this._nameProfile.textContent = name;
    this._jobProfile.textContent = about;
    this.setUserAvatar(avatar);
    this._id = _id;
  }

}