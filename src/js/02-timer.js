import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    calendar: document.querySelector("#datetime-picker"),
    daysField: document.querySelector("span[data-days]"),
    hoursField: document.querySelector("span[data-hours]"),
    minutesField: document.querySelector("span[data-minutes]"),
    secondsField: document.querySelector("span[data-seconds]"),
    btnStart: document.querySelector("button[data-start]"),
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      let targetDate = selectedDates[0].getTime();
      localStorage.setItem("targetDate", JSON.stringify(targetDate));
      if (targetDate < Date.now()) {
          Notiflix.Notify.failure("Please choose a date in the future");
          refs.btnStart.setAttribute("disabled", "");
          return;
      }
      refs.btnStart.removeAttribute("disabled");
    },
    onOpen() {
        localStorage.removeItem("targetDate");
  }
};

refs.btnStart.setAttribute("disabled", "");
flatpickr(refs.calendar, options);
refs.btnStart.addEventListener("click", onStartClick);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function onStartClick() {
    const timerId = setInterval(() => {
        const currentDate = Date.now();
        const targetDate = Number(localStorage.getItem("targetDate"));
        const remainingTime = convertMs(targetDate - currentDate);
        refs.btnStart.setAttribute("disabled", "");
        refs.calendar.setAttribute("disabled", "");
        const isTimeFinished = targetDate <= currentDate;
        if (isTimeFinished) {
            clearInterval(timerId);
            refs.calendar.removeAttribute("disabled");
            Notiflix.Notify.success("Time is finished");
            return;
        }
        updateTimerValues(remainingTime);
    }, 1000)
}
function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}
function updateTimerValues({ days, hours, minutes, seconds }) {
    refs.daysField.textContent = addLeadingZero(days);
    refs.hoursField.textContent = addLeadingZero(hours);
    refs.minutesField.textContent = addLeadingZero(minutes);
    refs.secondsField.textContent = addLeadingZero(seconds);
}