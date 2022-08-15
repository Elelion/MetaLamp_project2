/* jshint esversion: 6 */

class FeedBack {
  constructor(id = 0) {
    this.errorColor = '#E75735';
    this.successColor = '#4EB7A8';

    this.labelTipNames = {
      nameTip: 'name',
      emailTip: 'email',
    }

    this.labelTipMessages = {
      success: 'Thanks!',
      error: 'Error...',
    }

    this.validationMessages = {
      error: 'Validation errors ☹',
      success: 'Success fields ☺ . Your message: ',
    }

    this.initDOMElements(id);
    this.beginEvent();
  }

  initDOMElements(id) {
    // inputs
    this.name =
      document.getElementsByClassName('feed-back__input-name')[id];

    this.email =
      document.getElementsByClassName('feed-back__input-email')[id];

    this.message =
      document.getElementsByClassName('feed-back__message')[id];

    // tip decorations
    this.nameTipTriangle =
      document.getElementsByClassName('feed-back__tip_triangle-name')[id];

    this.emailTipTriangle =
      document.getElementsByClassName('feed-back__tip_triangle-email')[id];


    // tip notifications
    this.nameTip =
      document.getElementsByClassName('feed-back__tip-name')[id];

    this.nameTipLabel =
      document.getElementsByClassName('feed-back__label-name')[id];

    this.emailTip =
      document.getElementsByClassName('feed-back__tip-email')[id];

    this.emailTipLabel =
      document.getElementsByClassName('feed-back__label-email')[id];

    // send button
    this.sendFormButton =
      document.getElementsByClassName('button-standard__extension-feedback')[id];
  }

  /**/

  setEmailValue(value) {
    this.email.value = value;
  }

  setChangeTipLabel(object, caption) {
    object.innerHTML = caption;
  }

  setTipLabel(name, caption) {
    let objectName = name === this.labelTipNames.nameTip
      ? this.nameTipLabel
      : this.emailTipLabel;

    this.setChangeTipLabel(objectName, caption)
  }

  setPaintBackgroundTipLabel(object, color) {
    object.style.background = color;
  }

  setPaintTriangleTip(object, color) {
    object.style.borderRight = `12px solid ${color}`;
  }

  setPaintTipColor(object, color) {
    let objectNameTriangle = object === this.nameTip
      ? this.nameTipTriangle
      : this.emailTipTriangle;

    this.setPaintBackgroundTipLabel(object, color);
    this.setPaintTriangleTip(objectNameTriangle, color)
  }

  /**/

  isCheckName() {
    return (this.name.value === '' || this.name.value.length < 2);
  }

  isCheckEmail() {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    return (!reg.test(this.email.value));
  }


  /**/

  checkName() {
    if (this.isCheckName()) {
      this.setPaintTipColor(this.nameTip, this.errorColor);
      this.setTipLabel(this.labelTipNames.nameTip, this.labelTipMessages.error);
    } else {
      this.setPaintTipColor(this.nameTip, this.successColor);
      this.setTipLabel(this.labelTipNames.nameTip, this.labelTipMessages.success);
    }
  }

  checkEmail() {
    if (this.isCheckEmail()) {
      this.setPaintTipColor(this.emailTip, this.errorColor);
      this.setTipLabel(this.labelTipNames.emailTip, this.labelTipMessages.error);
    } else {
      this.setPaintTipColor(this.emailTip, this.successColor);
      this.setTipLabel(this.labelTipNames.emailTip, this.labelTipMessages.success);
    }
  }

  applyCheck() {
    this.checkName();
    this.checkEmail();
  }

  sendForm() {
    if (this.isCheckName() || this.isCheckEmail()) {
      alert(this.validationMessages.error);
    } else {
      alert(this.validationMessages.success + this.message.value);
    }
  }

  /**/

  beginEvent() {
    this.name.onblur = () => {
      this.applyCheck();
    };

    this.email.onblur = () => {
      this.applyCheck();
    };

    this.sendFormButton.onclick = () => {
      this.sendForm();
    };

    this.setEmailValue('test@test.ru');
    this.applyCheck();
  }
}

new FeedBack();
