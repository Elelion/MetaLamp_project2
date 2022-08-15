/* jshint esversion: 6 */

class ClassicSlider {
  constructor(id) {
    this.unit = 'px';
    this.widthClientBrowser = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    this.deviceExtensions = {
      desktop: 820,
      mobile: 560,
      oldMobile: 414,
    }

    this.initId(id);
    this.initDOMElements();
    this.beginEvent();
  }

  /**/

  initId(id) {
    this.classicSliderId = String(id);
    this.classicSliderId = this.classicSliderId.replace(/[^0-9]/g, "");

    this.classicSliderId = this.classicSliderId.length === 0
      ? 0
      : this.classicSliderId.substr(0, 1);
  }

  initDOMElements() {
    this.indicatorBlock =
      document.getElementsByClassName(
        'classic-slider__range-indicator')[this.classicSliderId];

    this.indicatorValue =
      document.getElementsByClassName(
        'classic-slider__range-title')[this.classicSliderId];

    this.sliderTrack =
      document.getElementsByClassName(
        'classic-slider__track')[this.classicSliderId];
  }

  /**/

  getPosition() {
    return this.sliderTrack.value;
  }

  /**/

  setDesktopExtension(pos) {
    if (this.widthClientBrowser > this.deviceExtensions.desktop) {
      this.indicatorBlock.style.marginLeft = pos * 6.5 + this.unit;
    }
  }

  setTabletExtension(pos) {
    if (this.widthClientBrowser <= this.deviceExtensions.desktop) {
      this.indicatorBlock.style.marginLeft = pos * 4.4 + this.unit;
    }
  }

  setMobileExtension(pos) {
    if (this.widthClientBrowser <= this.deviceExtensions.mobile) {
      this.indicatorBlock.style.marginLeft = pos * 2.9 + this.unit;
    }
  }

  setOldMobileExtension(pos) {
    if (this.widthClientBrowser <= this.deviceExtensions.oldMobile) {
      this.indicatorBlock.style.marginLeft = pos * 1.9 + this.unit;
    }
  }

  setIndicatorPosition(pos) {
    this.setDesktopExtension(pos);
    this.setTabletExtension(pos);
    this.setMobileExtension(pos);
    this.setOldMobileExtension(pos);
  }

  setIndicatorValue(val) {
    this.indicatorValue.innerHTML = val.value;
  }

  /**/

  positionTrackBar() {
    this.setIndicatorPosition(this.getPosition());
    this.setIndicatorValue(this.sliderTrack);
  }

  beginEvent() {
    this.sliderTrack.onclick = () => this.positionTrackBar();
    this.sliderTrack.mouseenter = () => this.positionTrackBar();
    this.sliderTrack.onmousemove = () => this.positionTrackBar();
    this.sliderTrack.mousedown = () => this.positionTrackBar();
    this.sliderTrack.mouseup = () => this.positionTrackBar();

    this.sliderTrack.addEventListener('touchend', () => {
      this.positionTrackBar();
    })
  }
}

/**/

(function () {
  let classicSlider = document.getElementsByClassName('classic-slider__range-indicator');

  for (let i = 0; i < classicSlider.length; i++) {
    new ClassicSlider(i);
  }
}());
