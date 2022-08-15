/* jshint esversion: 6 */

class DropBox {
    constructor() {

        /**
         * other method, part-1:
         * this.getChoise = this.getChoise.bind(this);
         */
        this.beginEvent();
    }

    getSelectors() {
        this.dropDown = document.getElementsByClassName('drop__down')[0];
    }

    getChoise() {
        alert(this.dropDown.value);
    }

    beginEvent() {
        this.getSelectors();

        /**
         * other method, part-2:
         * this.dropDown.onchange  = this.getChoise;
         */
        this.dropDown.onchange = () => {
            this.getChoise();
        };
    }
}

new DropBox();