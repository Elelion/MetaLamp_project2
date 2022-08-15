/*jshint esversion: 6 */

class Chart {
  constructor(chartName) {
    this.chartName = chartName;
    this.value = 0;

    this.beginEvent();
  }

  initDOMElements() {
    this.charts = document.querySelectorAll('.' + this.chartName);
  }

  getValuePercentage() {
    return parseFloat(this.value) * 754 / 100;
  }

  setValuePercentage(value) {
    this.value = value;
  }

  drawCircle(percent) {
    return (
      `<svg width="260" height="260">
        <circle transform="rotate(-90)"
          style="stroke-dasharray: 754px;"
          r="120" cx="-130" cy="130" />

        <circle transform="rotate(-90)"
          style="stroke-dasharray:` + percent +
          `px 754px;" r="120" cx="-130" cy="130" /></svg>`
    );
  }

  drawCharts() {
    this.charts.forEach(chart => {
      this.setValuePercentage(chart.innerHTML);
      chart.innerHTML = this.drawCircle(this.getValuePercentage());
    })
  }

  beginEvent() {
    this.initDOMElements();
    this.drawCharts();
  }
}

new Chart('chart-percentages__draw-svg')

/**/

/**
 * this is the old version
 * im left the code for myself, as an example
 */
/*
const CHART_PERCENTAGE = function(chartName) {
    const CHARTS = document.querySelectorAll(chartName);

    [].forEach.call(CHARTS, function(chartDraw) {
        let setElementValue = function(receiveValue) {
            let value = receiveValue * 754 / 100;
            return value;
        }

        let elementValue = function() {
            let value = parseFloat(chartDraw.innerHTML);
            value = setElementValue(value);
            return value;
        }

        let draw = function(percent) {
            let svg =
                `<svg width="260" height="260">
                <circle transform="rotate(-90)"
                style="stroke-dasharray: 754px;"
                r="120" cx="-130" cy="130" />

                <circle transform="rotate(-90)"
                style="stroke-dasharray:` + percent +
                `px 754px;" r="120" cx="-130" cy="130" /></svg>`;

            return svg;
        }

        chartDraw.innerHTML = draw(elementValue());
    });
};

CHART_PERCENTAGE('.chart-percentages__draw-svg');
*/
