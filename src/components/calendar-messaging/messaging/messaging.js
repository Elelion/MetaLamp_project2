/* jshint esversion: 6 */

class Messaging {
  constructor(id = 0) {
    this.msgBtnStatus = false;

    this.initDOMElements(id);
    this.beginEvent();
  }

  initDOMElements(id) {
    this.chatWindow = document.getElementsByClassName('messaging__input-form')[id];
    this.sendMsg = document.getElementsByClassName('messaging__letter-send')[id];
    this.parent = document.getElementsByClassName('messaging__chat')[id];
    this.chatBtn = document.getElementsByClassName('messaging__button-chat')[id];
    this.buttonMsg = document.getElementsByClassName('button-standard__extension-messaging')[id];
  }

  /**/

  setMsgShowInput(display, position) {
    this.chatWindow.style.display = display;
    this.chatBtn.style.backgroundPosition = position;
  }

  getMsgShowInput() {
    if (this.msgBtnStatus === false) {
      this.setMsgShowInput('block', '-132px 8px');
      this.msgBtnStatus = true;
    } else {
      this.setMsgShowInput('none', '6px 8px');
      this.msgBtnStatus = false;
    }

    this.sendMsg.value = '';
  }

  getCreateClearBlockMessage() {
    let clear = document.createElement('div');
    clear.className = 'messaging__clear';

    return clear;
  }

  getCreateBlockMessage() {
    let div = document.createElement('div');
    div.className = 'messaging__send';
    div.innerHTML = '<p class=messaging__letter>' + this.sendMsg.value + '</p>';

    return div;
  }

  getMsgAdd() {
    if (this.msgBtnStatus === true && this.sendMsg.value != '') {
      this.parent.insertBefore(this.getCreateClearBlockMessage(), this.parent.firstChild);
      this.parent.insertBefore(this.getCreateBlockMessage(), this.parent.firstChild);
      this.sendMsg.value = '';
    }
  }

  getMsgBtnOverMouse() {
    if (this.msgBtnStatus === false) {
      this.setMsgShowInput('none', '-61px 8px');
    }
  }

  msgBtnLeaveMouse() {
    if (this.msgBtnStatus === false) {
      this.setMsgShowInput('none', '6px 8px');
    }
  }

  /**/

  beginEvent() {
    this.chatBtn.onclick = () => {
      this.getMsgShowInput();
    }

    this.chatBtn.onmouseover = () => {
      this.getMsgBtnOverMouse();
    }

    this.chatBtn.onmouseleave = () => {
      this.msgBtnLeaveMouse();
    }

    this.buttonMsg.onclick = () => {
      this.getMsgAdd();
    }
  }
}

new Messaging();
