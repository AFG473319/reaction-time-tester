function startProcess(speedtestButton) {
  const timeoutValue = Math.floor(Math.random() * 3000) + 2000; // 2000-5000ms (2-5 seconds)
  
  speedtestButton.classList.add("waiting-button");
  speedtestButton.innerHTML = "WAIT...";
  speedtestButton.disabled = true;

  setTimeout(() => {
    speedtestButton.classList.remove("waiting-button");
    speedtestButton.classList.add("ready-button");
    speedtestButton.innerHTML = "PRESS ME NOW!";
    speedtestButton.disabled = false;
    speedtestButton.dataset.startTime = Date.now();
  }, timeoutValue);
}

function endProcess(speedtestButton) {
  const end = Date.now();
  const start = speedtestButton.dataset.startTime
  delay = end - start;
  alert(`${delay}ms`);
  delete speedtestButton.dataset.startTime
  speedtestButton.classList.remove("ready-button");
  speedtestButton.innerHTML = "CLICK TO START";
}

// Attach the initial click handler

const speedtestButton = document.querySelector('.js-speedtest-button');
document.querySelector('.js-speedtest-button').addEventListener('click', () => {
  // If the user wants to start a new test
  if (!speedtestButton.disabled && !(speedtestButton.classList.contains("ready-button"))) {
    startProcess(speedtestButton)
  }
  // If the user is finishing the started test
  if (!speedtestButton.disabled && speedtestButton.classList.contains("ready-button")) {
    endProcess(speedtestButton)
  }
});