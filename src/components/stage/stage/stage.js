/*jshint esversion: 6 */

class Stage {
  constructor(id = 0) {
    this.stageId = Number(id);
    this.pointQuantity = 0;
    this.unit = 'px';

    this.fillColorPoint = '#E75735';
    this.fillColorFont = 'white';
    this.emptyColorPoint = '#E5E5E5';
    this.emptyColorFont = '#6F6F6F';

    this.initDOMElements();
    this.beginEvent();
  }

  initDOMElements() {
    this.stage = document.getElementsByClassName('stage__track')[this.stageId];
    this.stageFill = document.getElementsByClassName('stage__range-fill')[this.stageId];
    this.points = document.querySelectorAll('.stage__track-point');
  }

  /**/

  setPaintPoint(index, fillColor, fontColor) {
    this.points[index].style.backgroundColor = fillColor;
    this.points[index].style.color = fontColor;
  }

  setPaintPoints(currentPointNumber, fillColor, fontColor) {
    for (let i = 0; i <= currentPointNumber; i++) {
      this.setPaintPoint(i, fillColor, fontColor);

      for (let j = this.pointQuantity; j > i; j--) {
        this.setPaintPoint(j, this.emptyColorPoint, this.emptyColorFont);
      }
    }
  }

  setPaintTrackPosition(pos) {
    this.stageFill.style.width = pos + this.unit;
  }

  /**/

  setFillStage(currentPointNumber) {
    /**
     * we divide the full width (this.stage.offsetWidth)
     * by the number of steps (this.pointQuantity)
     * and multiply by the current step (i)
     */
    let posStep = (this.stage.offsetWidth / this.pointQuantity) * currentPointNumber;

    this.setPaintTrackPosition(posStep);
    this.setPaintPoints(currentPointNumber, this.fillColorPoint, this.fillColorFont);
  }

  // **

  beginEvent() {
    this.pointQuantity = this.points.length - 1;
    this.stage.value = 0;
    this.setFillStage(0);

    this.points.forEach((point, index) => {
      point.addEventListener('click', () => {
        this.setFillStage(index);
      })
    });
  }
}

/**/

(function () {
  let stageRange = document.getElementsByClassName('stage__range-fill');

  for (let i = 0; i < stageRange.length; i++) {
    new Stage(i);
  }
}());
