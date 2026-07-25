# Reaction Time Tester

A minimal, single-page web app that measures how fast you can react to a visual cue. Features a persistent best-record tracker and a penalty system for clicking too early.

## How it works

1. Click the **CLICK TO START** button to begin a test.
2. The button turns **red** and shows `WAIT...`. A random delay between 2 and 5 seconds passes.
3. When the button turns **green** and shows `PRESS ME NOW!`, click it as fast as you can.
4. Your reaction time (in milliseconds) is displayed in an alert.
5. Your **best record** is saved in `localStorage` and displayed at the top.
6. If you click during the `WAIT...` phase, a penalty message appears for 5 seconds and the test resets.

## Project structure

```
reaction-time-tester/
├── index.html        # Markup: button, best-record display, penalty message
├── scripts/
│   └── main.js       # Test logic: start, wait, measure, end, penalty, best-record
└── styles/
    └── main.css      # Button states (default/waiting/ready), layout, penalty & best-record styles
```

## Running locally

No build step or dependencies required. Simply open `index.html` in a web browser:

- Double-click `index.html`, or
- Serve the folder with any static file server, e.g.:

  ```bash
  python -m http.server 8000
  ```

  then visit `http://localhost:8000`.

## How it works

### Button states
| Class | State | Appearance |
|-------|-------|------------|
| `.speedtest-button` | Default | Light blue circle, "CLICK TO START" |
| `.waiting-button` | Waiting (2–5s delay) | Red, "WAIT..." |
| `.ready-button` | Ready to test | Green, "PRESS ME NOW!" |

### Timing logic (`scripts/main.js`)
- **`startProcess()`** – Adds `.waiting-button`, sets text to `WAIT...`, schedules a `setTimeout` with a random delay (2000–5000 ms). Stores the `timeoutId` in `dataset.timeoutId`.
- When the timeout fires – Removes `.waiting-button`, adds `.ready-button`, sets text to `PRESS ME NOW!`, records `Date.now()` in `dataset.startTime`.
- **`endProcess()`** – Calculates `Date.now() - startTime` for reaction time. Compares against `localStorage.getItem("best-record")` and updates if faster. Shows reaction time in an `alert()`. Resets button to default state.
- **Penalty system** – If the user clicks during `.waiting-button`:
  1. Clears the pending timeout.
  2. Resets button to default state.
  3. Shows the penalty message (`.penalty-paragraph`) for 5 seconds.
  4. If they click again during the penalty, the 5-second timer resets.

### Persistence
- Best reaction time is stored in `localStorage` under key `"best-record"` (value: milliseconds as JSON number).
- On page load, the best record is read from `localStorage` and displayed in `.best-all-time`.

## Technologies

- Plain HTML, CSS, and vanilla JavaScript (no frameworks or libraries).
- Uses `localStorage` for persistence.
- Vanilla `setTimeout`/`clearTimeout` for timing.
