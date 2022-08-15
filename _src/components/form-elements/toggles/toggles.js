/*jshint esversion: 6 */

class Toggles {
  constructor(id) {
    this.unit = 'px';

    this.toggleCation = {
      on: 'ON',
      off: 'OFF',
    }

    this.toggleCaptionPosition = {
      on: 10,
      off: 50,
    }

    this.initDOMElements(id);
    this.beginEvent();
  }

  initDOMElements(id) {
    this.switcher = document.getElementsByClassName('toggles__switch')[id];
    this.labelSwitcher = document.getElementsByClassName('toggles__status')[id];
  }

  /**/

  setSwitcherCaption(caption) {
    this.labelSwitcher.innerHTML = caption;
  }

  setSwitcherCationPosition(position) {
    this.labelSwitcher.style.left = position + this.unit;
  }

  setSwitch(caption, position) {
    this.setSwitcherCaption(caption);
    this.setSwitcherCationPosition(position);
  }

  setSwitcherCheck(status) {
    this.switcher.checked = status;
  }

  /**/

  switchToggle() {
    if (this.switcher.checked === true) {
      this.setSwitch(this.toggleCation.on, this.toggleCaptionPosition.on);
    } else {
      this.setSwitch(this.toggleCation.off, this.toggleCaptionPosition.off);
    }
  }

  resetToggle() {
    this.setSwitcherCheck(false);
    this.setSwitcherCheck(false);
    this.setSwitcherCationPosition(this.toggleCaptionPosition.off);
  }

  /**/

  beginEvent() {
    this.resetToggle();

    this.switcher.addEventListener('click', () => {
      this.switchToggle();
    })
  }
}

/**/

(function () {
  let toggles = document.getElementsByClassName('toggles__switch');

  for (let i = 0; i < toggles.length; i++) {
    new Toggles(i);
  }
}());
