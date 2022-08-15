/*jshint esversion: 6 */

/**/

const GET_CURRENT_DATE = new Date();
const CURRENT_DAY = GET_CURRENT_DATE.getDate();

// since the numbering is from 0...11, then +1
const CURRENT_MONTH = GET_CURRENT_DATE.getMonth() + 1;
const CURRENT_YEAR = GET_CURRENT_DATE.getFullYear();
const CURRENT_MONTH_FOR_TODAY_BUTTON = CURRENT_MONTH;

/**/

class Calendar {
  constructor() {
    this.calendarClasses = {
      dayTitle: 'calendar__day-title',
      monthTitle: 'calendar__month-title',
      disabledDay: 'calendar__disabled-day',
      listYear: 'calendar__list-year',
      listMonth: 'calendar__list-month',
    }

    this.tableHTMLCalendar = '';

    this.currentStatus = true;
    this.currentMonth = CURRENT_MONTH;
    this.currentDate = '';
    this.pastDays = [];

    this.initDOMElements();
    this.beginEvent();
  }

  initDOMElements() {
    // fields
    this.calendarAllCells = document.getElementsByClassName('calendar__cell');

    // chapter
    this.calendarDayTitle = document.getElementsByClassName('calendar__day-title')[0];
    this.currentMonthTitle = document.getElementsByClassName('calendar__month')[0];

    // select
    this.currentDate = document.getElementById('currentDate');
    this.currentDay = document.getElementById('currentDay');

    // buttons
    this.calendarBackDateButton = document.getElementsByClassName('calendar__button-month')[0];
    this.calendarNextDateButton = document.getElementsByClassName('calendar__button-month')[1];
    this.calendarContentButton = document.getElementsByClassName('calendar__content')[0];
    this.currentDateButton = document.getElementsByClassName('button-standard__extension-calendar')[0];

    // calendar
    this.calendar = document.getElementById('calendar');
  }

  /**/

  getTableHTMLCalendar() {
    return (
      '<table class='+ this.calendarClasses.listYear + '>' +
      '<tr>' +
      '<th class=' + this.calendarClasses.listMonth + '>MON</th>' +
      '<th class=' + this.calendarClasses.listMonth + '>TUE</th>' +
      '<th class=' + this.calendarClasses.listMonth + '>WED</th>' +
      '<th class=' + this.calendarClasses.listMonth + '>THU</th>' +
      '<th class=' + this.calendarClasses.listMonth + '>FRI</th>' +
      '<th class=' + this.calendarClasses.listMonth + '>SAT</th>' +
      '<th class=' + this.calendarClasses.listMonth + '>SUM</th>' +
      '</tr><tr>'
    );
  }

  setCaseFillEmptyCalendarDaysAfter(after) {
    let remainingDays = [6,5,4,3,2,1];
    let indexShifting = after - 1;

    this.fillEmptyCalendarDaysAfter(remainingDays[indexShifting]);
  }

  buildCalendarCellsWithDates(date, month) {
    while (date.getMonth() === month) {

      // setting the id for the cell where the current date will be
      if (date.getDate() === CURRENT_DAY) {
        this.tableHTMLCalendar += '<td id=currentDate class=calendar__cell>' + date.getDate() + '</td>';
        console.log("today: " + CURRENT_DAY);
      } else {
        this.tableHTMLCalendar += '<td class=calendar__cell>' + date.getDate() + '</td>';
      }

      // sunday, last day - line feed
      if (this.daysOfWeek(date) % 7 === 6) {
        this.tableHTMLCalendar += '</tr><tr>';
      }

      date.setDate(date.getDate() + 1);
    }
  }

  createCalendar(year, month) {
    // months in JS go from 0 to 11, not from 1 to 12
    let mon = month - 1;
    let d = new Date(year, mon);
    let daysBefore = this.daysOfWeek(d);
    this.tableHTMLCalendar = this.getTableHTMLCalendar();

    this.fillEmptyDaysBefore(daysBefore);
    this.buildCalendarCellsWithDates(d, mon);

    if (this.daysOfWeek(d) !== 0) {
      this.setCaseFillEmptyCalendarDaysAfter(this.daysOfWeek(d));
    }

    // close the table
    this.tableHTMLCalendar += '</tr></table>';
    this.calendar.innerHTML = this.tableHTMLCalendar;

    // we call it only after creating the elements !!!
    this.initDOMElements();
  }

  setCurrentDayForBlock(month,year) {
    this.currentDate = new Date(year, month, 0).getDate();
  }

  setFillEmptyCalendarDays(days) {
    this.tableHTMLCalendar += `<td class=calendar__disabled><div class=${this.calendarClasses.disabledDay}>${days}</div></td>`;
  }

  setPastDaysReverse(step) {
    let monthDays = this.currentDate;
    let pastDay;

    /**
     * we fill the array with the days that have passed,
     * for example: 31, 30, 29...
     */
    for (let i = 0; i <= step; i++) {
      pastDay = monthDays - i;
      this.pastDays[i] = pastDay;
    }
  }

  getPastDaysReverse() {
    /**
     * we change the values backwards, i.e. it was 31, 30, 29
     * it will become: 29, 30, 31...
     */
    return this.pastDays.reverse();
  }

  fillEmptyDaysBefore(step) {
    // last day of the previous month
    this.setCurrentDayForBlock(CURRENT_MONTH_FOR_TODAY_BUTTON - 1, CURRENT_YEAR);

    // we fill in the past days BEFORE the beginning of the month
    this.setPastDaysReverse(step);
    let pastDaysReverse = this.getPastDaysReverse()

    // we enter the reverse values in the table
    for (let i = 1; i <= step; i++) {
      this.setFillEmptyCalendarDays(pastDaysReverse[i]);
    }
  }

  fillEmptyCalendarDaysAfter(emptyNumber) {
    for (let i = 1; i <= emptyNumber; i++) {
      this.setFillEmptyCalendarDays(i);
    }
  }

  /**
   * get the number of the day of the week, from 0(Min) to 6(Sun)
   */
  daysOfWeek(date) {
    let day = date.getDay();

    if (day === 0) {
      day = 7;
    }

    return day - 1;
  }

  /**/

  setCurrentMonthForTitle(month) {
    this.currentMonthTitle.innerHTML = `<div class=${this.calendarClasses.monthTitle}>${month}</div>`;
  }

  displayCurrentMonthForTitle(monthNumber) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    let indexShifting = monthNumber - 1;

    this.setCurrentMonthForTitle(months[indexShifting]);
  }

  displayCurrentDayForTitle() {
    this.currentDay.innerHTML = `<div class=${this.calendarClasses.dayTitle}> ${CURRENT_DAY}</div>`;
  }

  /**/

  paintSelectedCurrentDate(status) {
    if (status === 'reset') {
      this.currentStatus = true;
      this.currentDate.style.background = '#E5E5E5';
      this.currentDate.style.color = 'black';
    } else {
      this.currentStatus = this.currentStatus === false;
      this.currentDate.style.background = this.currentStatus === false ? '#E75735' : '#E5E5E5';
      this.currentDate.style.color = this.currentStatus === false ? 'white' : 'black';
    }
  }

  selectCurrentCell() {
    for (let i = 0; i < this.calendarAllCells.length; i++) {
      /**
       * adding an event to each td with the cell class (where you click
       * on the cell will be)
       */
      this.calendarAllCells[i].addEventListener('click', () => {
        let currentClickCellNumber = i + 1;
        this.calendarDayTitle.innerHTML = `<div class=${this.calendarClasses.dayTitle}>${currentClickCellNumber}</div>`;

        // reset current date selected
        this.paintSelectedCurrentDate('reset')
      });
    }
  }

  /**/

  buttonBackDate() {
    if (this.currentMonth > 1) {
      this.currentMonth--;

      this.displayCurrentMonthForTitle(this.currentMonth);
      this.createCalendar(CURRENT_YEAR, this.currentMonth);
      this.selectCurrentCell();
    }
  }

  buttonNextDate() {
    if (this.currentMonth < 12) {
      this.currentMonth++;

      this.displayCurrentMonthForTitle(this.currentMonth);
      this.createCalendar(CURRENT_YEAR, this.currentMonth);
      this.selectCurrentCell();
    }
  }

  buttonCurrentDate() {
    this.currentMonth = CURRENT_MONTH_FOR_TODAY_BUTTON;

    this.displayCurrentDayForTitle();
    this.displayCurrentMonthForTitle(CURRENT_MONTH_FOR_TODAY_BUTTON);
    this.createCalendar(CURRENT_YEAR, CURRENT_MONTH_FOR_TODAY_BUTTON);
    this.paintSelectedCurrentDate();
    this.selectCurrentCell();
  }

  /**/

  beginEvent() {
    this.displayCurrentDayForTitle();
    this.displayCurrentMonthForTitle(this.currentMonth);
    this.createCalendar(CURRENT_YEAR, CURRENT_MONTH_FOR_TODAY_BUTTON);
    this.selectCurrentCell();

    this.calendarBackDateButton.addEventListener('click', () => {
      this.buttonBackDate();
    })

    this.calendarNextDateButton.addEventListener('click', () => {
      this.buttonNextDate();
    })

    this.calendarContentButton.addEventListener('click', () => {
      this.selectCurrentCell();
    })

    this.currentDateButton.addEventListener('click', () => {
      this.buttonCurrentDate();
    })
  }
}

new Calendar();
