let timer;
let isRunning = false;
let elapsedTime = 0; // in milliseconds
let lapTimes = [];

const display = document.getElementById('display');
const lapList = document.getElementById('lapList');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
document.getElementById('toggleColor').addEventListener('click', toggleColorMode);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        const startTime = Date.now() - elapsedTime;

        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.innerText = formatTime(elapsedTime);
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.innerText = '00:00:00';
    lapTimes = [];
    lapList.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        lapTimes.push(elapsedTime);
        const lapTime = document.createElement('li');
        lapTime.className = 'list-group-item'; // This will apply the correct styles
        lapTime.innerText = formatTime(elapsedTime);
        lapList.appendChild(lapTime);
    }
}
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function toggleColorMode() {
    document.body.classList.toggle('dark-mode');
}