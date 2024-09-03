//Initial References
let timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarms");
let alarmSound = new Audio("./alarm.mp3");
const setAlarm = document.getElementById("set");
class App {
  #date;
  #hours;
  #minutes;
  #seconds;
  #currentTime;
  #userTime;
  #active = false;
  constructor() {
    setInterval(() => {
      this._getCurrentTime();
      this._renderCurrentTime();
      this._checkAlarm();
    }, 1000);
    this._addAlarm();
  }
  _activation() {
    this.#active = !this.#active;
    return this.#active;
  }
  _toFalse() {
    this.#active = false;
    return this.#active;
  }
  _getCurrentTime() {
    this.#date = new Date();
    this.#hours = this._addZero(this.#date.getHours());
    this.#minutes = this._addZero(this.#date.getMinutes());
    this.#seconds = this._addZero(this.#date.getSeconds());
    this.#currentTime = this.currentTime;
  }
  get userTime() {
    return `${hourInput.value}:${minuteInput.value}`;
  }
  get currentTime() {
    return `${this.#hours}:${this.#minutes}`;
  }
  _createAlarmEl() {
    this.#userTime = this.userTime;
    let alarmEl = document.createElement("div");
    alarmEl.classList.add("alarm");
    alarmEl.setAttribute("data-id", this.id);
    alarmEl.innerHTML = `<span>${this.#userTime}</span>`;

    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.addEventListener("click", this._activation.bind(this));
    alarmEl.appendChild(checkBox);
    activeAlarms.appendChild(alarmEl);

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteBtn.classList.add("deleteButton");
    deleteBtn.addEventListener("click", function () {
      alarmEl.remove();
    });
    deleteBtn.addEventListener("click", this._toFalse.bind(this));
    alarmEl.appendChild(deleteBtn);
  }
  _addZero(num) {
    if (num < 10) {
      num = "0" + num;
    } else {
      num = "" + num;
    }
    return num;
  }
  _renderCurrentTime() {
    timerRef.textContent = `${this.#hours}:${this.#minutes}:${this.#seconds}`;
  }
  _addAlarm() {
    setAlarm.addEventListener("click", this._createAlarmEl.bind(this));
  }
  _checkAlarm() {
    if (this.#active) {
      if (this.currentTime === this.#userTime) {
        alarmSound.play();
      }
    }
  }
}
const app = new App();
// let alarmEl = document.createElement("div");
// alarmEl.classList.add("alarm");
// alarmEl.setAttribute("data-id", "2435434");
// alarmEl.innerHTML = `<span>10:10</span>`;
