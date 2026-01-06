const btns = document.querySelectorAll(".button-group");
const counterValue = document.querySelector("#counterValue");
const decrementBtn = document.querySelector("#decrementBtn");
const incrementBtn = document.querySelector("#incrementBtn");
const resetCounterBtn = document.querySelector("#resetCounterBtn");

const timerDisplay = document.querySelector("#timerDisplay");
const timeInput = document.querySelector("#timeInput");
const startTimerBtn = document.querySelector("#startTimerBtn");
const stopTimerBtn = document.querySelector("#stopTimerBtn");
const resetTimerBtn = document.querySelector("#resetTimerBtn");

let counter = 0;

btns.forEach((group) => {
  group.addEventListener("click", (e) => {
    e.preventDefault();
    const btn = e.target.closest("button");

    if (!btn) return;

    if (btn.id === "incrementBtn") {
      counter++;
      counterValue.textContent = counter;
    }
    if (btn.id === "decrementBtn") {
      if (counter > 0) {
        counter--;
      }
      counterValue.textContent = counter;
    }
    localStorage.setItem("counter", JSON.stringify(counter));

    if (btn.id === "startTimerBtn") {
      startTimer();
    }

    if (btn.id === "stopTimerBtn") {
      stopTimer();
    }
  });
});

resetCounterBtn.addEventListener("click", () => {
  counter = 0;
  counterValue.textContent = counter;
  localStorage.setItem("counter", JSON.stringify(counter));
});

window.addEventListener("load", () => {
  counter = JSON.parse(localStorage.getItem("counter"));
  counterValue.textContent = counter;
});

let endTime = null;
let remainingSeconds = 0;
let timer = null;
let isRunning = false;

function startTimer() {
  if (isRunning) return;

  const now = Date.now();

  if (remainingSeconds > 0) {
    endTime = now + remainingSeconds * 1000;
  } else {
    if (!timeInput.value) {
      alert("Please Enter Seconds");
      return;
    }
    endTime = now + Number(timeInput.value) * 1000;
  }

  isRunning = true;
  startTimerBtn.disabled = true;

  timer = setInterval(() => {
    const now = Date.now();
    remainingSeconds = Math.ceil((endTime - now) / 1000);

    if (remainingSeconds <= 0) {
      timerDisplay.textContent = "00:00";
      clearInterval(timer);
      isRunning = false;
      startTimerBtn.disabled = false;
      remainingSeconds = 0;
      endTime = null;
      return;
    }

    timerDisplay.textContent = formatTime(remainingSeconds);
  }, 100);
}

function formatTime(sec) {
  const minute = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const second = (sec % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
}

function stopTimer() {
  if (!isRunning) return;

  const now = Date.now();
  remainingSeconds = Math.ceil((endTime - now) / 1000);
  clearInterval(timer);
  isRunning = false;
  startTimerBtn.disabled = false;
}

resetTimerBtn.addEventListener("click", resetTimer);

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  endTime = null;
  remainingSeconds = 0;
  timeInput.value = "";
  startTimerBtn.disabled = false;
  timerDisplay.textContent = formatTime(remainingSeconds);
}
