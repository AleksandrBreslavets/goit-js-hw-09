const refs = {
    btnStart: document.querySelector("button[data-start]"),
    btnStop: document.querySelector("button[data-stop]"),
    body: document.querySelector("body"),
}

refs.btnStart.addEventListener("click", onStartClick);
refs.btnStop.addEventListener("click", onStopClick);

let timerId = null;
refs.btnStop.setAttribute("disabled", "");

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
function onStartClick() {
    timerId=setInterval(() => {
        const color = getRandomHexColor();
        refs.body.style.backgroundColor = `${color}`;
    }, 1000);
    refs.btnStart.setAttribute("disabled", "");
    refs.btnStop.removeAttribute("disabled");
    
}
function onStopClick() {
    clearInterval(timerId);
        refs.btnStop.setAttribute("disabled", "");
        refs.btnStart.removeAttribute("disabled");
}


