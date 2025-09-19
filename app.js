const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const minutesEl = document.querySelector('.minutes');
const secondsEl = document.querySelector('.seconds');

// circle setup
const circle = document.getElementById('progress');
const radius = 90;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = 0;

function setProgress(percent) {
  const offset = circumference - percent * circumference;
  circle.style.strokeDashoffset = offset;
}

let myInterval;
let state = true;

const appTimer = () => {
  const sessionAmount = Number.parseInt(minutesEl.textContent);

  if (state) {
    state = false;
    let totalSeconds = sessionAmount * 60;
    let remainingSeconds = totalSeconds;

    const updateSeconds = () => {
      if (remainingSeconds <= 0) {
        clearInterval(myInterval);
        bells.play();
        state = true; // allow restart
        return;
      }

      remainingSeconds--;

      // Calculate minutes and seconds
      const mins = Math.floor(remainingSeconds / 60);
      const secs = remainingSeconds % 60;

      // Update DOM
      minutesEl.textContent = String(mins).padStart(2, '0');
      secondsEl.textContent = String(secs).padStart(2, '0');

      // Update circle progress
      setProgress(remainingSeconds / totalSeconds);
    };

    // Run immediately so it doesn’t wait 1s
    updateSeconds();
    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.');
  }
};

startBtn.addEventListener('click', appTimer);
