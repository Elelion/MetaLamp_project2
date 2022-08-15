/*jshint esversion: 6 */

class RippleEffect {
  constructor(buttonName) {
    this.unit = 'px';
    this.buttonName = buttonName;

    this.effectBlock = '';
    this.effectValue = 0;
    this.effectRect = 0;
    this.effectDiv = '';

    this.beginEvent();
  }

  initDOMElements() {
    this.buttons = document.querySelectorAll('.' + this.buttonName);
    this.effectBlock = document.createElement('div');
  }

  /**
   * insert it into the <div> button with the ripple_standard class
   */
  setEffectBlock(object) {
    this.effectBlock.classList.add('ripple_standard');
    object.appendChild(this.getEffectBlock());
  }

  getEffectBlock() {
    return this.effectBlock;
  }

  getStyleEffectBlock() {
    return this.effectBlock.style;
  }

  setEffect(object) {
    this.effectValue = Math.max(object.clientWidth, object.clientHeight);
    this.effectRect  = object.getBoundingClientRect();
    this.effectDiv = this.getStyleEffectBlock();
  }

  calcEffect(event) {
    this.effectDiv.width = this.effectDiv.height = this.effectValue + this.unit;
    this.effectDiv.left = event.clientX - this.effectRect.left - (this.effectValue / 2) + this.unit;
    this.effectDiv.top = event.clientY - this.effectRect.top - (this.effectValue / 2) + this.unit;
  }

  applyRippleEffect() {
    this.buttons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();

        this.setEffectBlock(button);
        this.setEffect(button);
        this.calcEffect(event);
      })
    })
  }

  beginEvent() {
    this.initDOMElements();
    this.applyRippleEffect();
  }
}

new RippleEffect('button-standard');
new RippleEffect('button-arrow');
