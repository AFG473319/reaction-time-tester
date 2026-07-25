function startProcess(speedtestButton) {
  const timeoutValue = Math.floor(Math.random() * 3000) + 2000; // 2000-5000ms (2-5 seconds)
  
  speedtestButton.classList.add("waiting-button");
  speedtestButton.innerHTML = "WAIT...";

  const timeoutId = setTimeout(() => {
    speedtestButton.classList.remove("waiting-button");
    speedtestButton.classList.add("ready-button");
    speedtestButton.innerHTML = "PRESS ME NOW!";
    speedtestButton.disabled = false;
    speedtestButton.dataset.startTime = Date.now();
  }, timeoutValue);
  speedtestButton.dataset.timeoutId = String(timeoutId);
}

function endProcess(speedtestButton) {
  const end = Date.now();
  const start = speedtestButton.dataset.startTime;
  const delay = end - start;
  
  const bestRecord = localStorage.getItem("best-record");
  const bestRecordValue = bestRecord ? JSON.parse(bestRecord) : Infinity;
  
  if (delay < bestRecordValue) {
    localStorage.setItem("best-record", JSON.stringify(delay));
    bestRecordParagraph.innerHTML = `Best record yet: ${delay}ms`;
  } else {
    bestRecordParagraph.innerHTML = `Best record yet: ${bestRecordValue === Infinity ? "None yet" : bestRecordValue}ms`;
  }
  
  alert(`${delay}ms`);
  delete speedtestButton.dataset.startTime;
  speedtestButton.classList.remove("ready-button");
  speedtestButton.innerHTML = "CLICK TO START";
}

// Attach the initial click handler

const speedtestButton = document.querySelector('.js-speedtest-button');
const penaltyParagraph = document.querySelector(".js-penalty-paragraph");
const bestRecordParagraph = document.querySelector(".js-best-all-time");
let penaltyTimeoutId = null;
const bestRecord = localStorage.getItem("best-record");
if (bestRecord !== null) {
  bestRecordParagraph.innerHTML = `Best record yet: ${JSON.parse(bestRecord)}ms`;
} else {
  bestRecordParagraph.innerHTML = "Best record yet: None yet";
}
document.querySelector('.js-speedtest-button').addEventListener('click', () => {
  // If the user wants to start a new test
  if (!(speedtestButton.classList.contains("ready-button")) && !(speedtestButton.classList.contains("waiting-button"))) {
    startProcess(speedtestButton);
  } else if (speedtestButton.classList.contains("ready-button")) {
    // If the user is finishing the started test
    endProcess(speedtestButton);
  } else if (speedtestButton.classList.contains("waiting-button")) {
    // If the user is clicking the button before the waiting process is done
    if (!penaltyTimeoutId) {
      clearTimeout(Number(speedtestButton.dataset.timeoutId));
      delete speedtestButton.dataset.timeoutId;
      speedtestButton.classList.remove("waiting-button");
      speedtestButton.innerHTML = "CLICK TO START";
      penaltyParagraph.style.display = "block";
      penaltyTimeoutId = setTimeout(() => {
        penaltyParagraph.style.display = "none";
        penaltyTimeoutId = null;
      }, 5000);
    } else {
      clearTimeout(penaltyTimeoutId);
      delete speedtestButton.dataset.timeoutId;
      speedtestButton.classList.remove("waiting-button");
      speedtestButton.innerHTML = "CLICK TO START";
      penaltyParagraph.style.display = "block";
      penaltyTimeoutId = setTimeout(() => {
        penaltyParagraph.style.display = "none";
        penaltyTimeoutId = null;
      }, 5000);
    }
  }
});