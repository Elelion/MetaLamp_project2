/* jshint esversion: 6 */

class UserProfile {
  constructor(id) {
    this.selectColor = '#4EB7A8';
    this.unSelectColor = '#E5E5E5';

    this.initDOMElements(id);
    this.beginEvent();
  }

  initDOMElements(id) {
    this.userInfo = document.getElementsByClassName('user-profile__info')[id];
    this.userPhoto = document.getElementsByClassName('user-profile__photo')[id];
  }

  /**/

  setPaintBorderColor(object, color) {
    object.style.borderColor = color;
  }

  setEvent(eventName, color) {
    this.userInfo.addEventListener(eventName, () => {
      this.setPaintBorderColor(this.userPhoto, color);
      this.setPaintBorderColor(this.userInfo, color);
    });
  }

  /**/

  beginEvent() {
    this.setEvent('mouseover', this.selectColor);
    this.setEvent('mouseout', this.unSelectColor);
  }
}

/**/

(function () {
  let userProfiles = document.getElementsByClassName('user-profile');

  for (let i = 0; i < userProfiles.length; i++) {
    new UserProfile(i);
  }
}());
