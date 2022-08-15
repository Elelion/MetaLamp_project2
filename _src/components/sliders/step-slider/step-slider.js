/* first trackBar */

class StepSlider {
  constructor(id = 0) {
    this.stepSliderId = Number(id);
    this.unit = 'px';

    this.initDOMElements();
    this.beginEvent();
  }

  initDOMElements() {
    this.sliderTrackFill =
      document.getElementsByClassName('step-slider__fill')[this.stepSliderId];

    this.sliderTrack =
      document.getElementsByClassName('step-slider__range')[this.stepSliderId];
  }

  /**/

  getTrackValue() {
    return this.sliderTrack.value;
  }

  /**/

  setTrackValue(value) {
    this.sliderTrack.value = value;
  }

  setTrackFill(currentWidth, value) {
    let width = Number((currentWidth * value) / 100);
    this.sliderTrackFill.style.width = width + this.unit;
  }

  /**/

  positionTrackBar() {
    let currentValue = this.getTrackValue();
    let currentWidth = this.sliderTrack.offsetWidth;

    this.setTrackFill(currentWidth, currentValue);
  }

  beginEvent() {
    this.setTrackValue(0);

    this.sliderTrack.addEventListener('click', (event) => {
      this.positionTrackBar();
    })
  }
}

/**/

(function () {
  let stepSlider = document.getElementsByClassName('step-slider__fill');

  for (let i = 0; i < stepSlider.length; i++) {
    new StepSlider(i);
  }
}());
