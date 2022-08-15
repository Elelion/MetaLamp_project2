/* jshint esversion: 6 */

class TickBoxes {
  constructor(id) {
    this.initDOMElements(id);
    this.beginEvent();
  }

  initDOMElements(id) {
    this.tick = document.getElementsByClassName('tick-boxes__check')[id];
  }

  /**/

  setTickStatus(check) {
    this.tick.checked = check;
  }

  /**/

  tickStatus() {
    let status = (this.tick.checked === true) ? 'true' : 'false';
    console.log('TickBox status: ' + status);
  }

  beginEvent() {
    this.setTickStatus(false);

    this.tick.addEventListener('click', () => {
      this.tickStatus()
    })
  }
}

/**/

(function () {
  let tickBoxes = document.getElementsByClassName('tick-boxes__case');

  for (let i = 0; i < tickBoxes.length; i++) {
    new TickBoxes(i);
  }
}());
