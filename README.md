# Reaction Time Tester

A minimal, single-page web app that measures how fast you can react to a visual cue.

## How it works

1. Click the **CLICK TO START** button to begin a test.
2. The button turns **red** and shows `WAIT...`. A random delay between 2 and 5 seconds passes.
3. When the button turns **green** and shows `PRESS ME NOW!`, click it as fast as you can.
4. Your reaction time (in milliseconds) is displayed in an alert.

## Project structure

```
reaction-time-tester/
├── index.html        # Markup and the speed-test button
├── scripts/
│   └── main.js       # Test logic (start, wait, measure, end)
└── styles/
    └── main.css      # Button states and layout
```

## Running locally

No build step or dependencies are required. Simply open `index.html` in a web browser:

- Double-click `index.html`, or
- Serve the folder with any static file server, e.g.:

  ```bash
  python -m http.server 8000
  ```

  then visit `http://localhost:8000`.

## How the timing works

- `startProcess()` disables the button, shows `WAIT...`, and schedules a `setTimeout` with a random delay (`Math.random() * 3000 + 2000`, i.e. 2000–5000 ms). When the timer fires, the button turns green and records the start time via `dataset.startTime`.
- `endProcess()` computes `Date.now() - startTime` to get the reaction delay and shows it in an alert.

## Technologies

- Plain HTML, CSS, and vanilla JavaScript (no frameworks or libraries).
