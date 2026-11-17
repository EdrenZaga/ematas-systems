// Timer mode durations and configurations
const MODES = {
  pomodoro: { label: 'Focus (25m)', time: 25 * 60, color: '#4338ca', darkColor: '#6366f1' },
  shortBreak: { label: 'Short Break (5m)', time: 5 * 60, color: '#0d9488', darkColor: '#14b8a6' },
  longBreak: { label: 'Long Break (15m)', time: 15 * 60, color: '#0284c7', darkColor: '#38bdf8' }
};

// State
let currentMode = 'pomodoro';
let totalTime = MODES.pomodoro.time;
let timeLeft = totalTime;
let timerId = null;
let isRunning = false;
let completedSessions = parseInt(localStorage.getItem('pomodoro-completed-sessions') || '0', 10);

// DOM Elements
const timeDisplay = document.getElementById('time-display');
const modeStatus = document.getElementById('mode-status');
const progressRingBar = document.getElementById('progress-ring-bar');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const modeButtons = document.querySelectorAll('.mode-btn');
const sessionCountDisplay = document.getElementById('session-count');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// SVG Ring Circumference: 2 * π * r (r = 115)
const RADIUS = 115;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Initialize SVG Ring
progressRingBar.style.strokeDasharray = `${CIRCUMFERENCE} ${CIRCUMFERENCE}`;
progressRingBar.style.strokeDashoffset = '0';

// Initialize session counter display
sessionCountDisplay.textContent = completedSessions;

// Gentle browser beep using Web Audio API
function playGentleBeep() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const playTone = (freq, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Gentle envelope: soft attack, exponential fade
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.18, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    playTone(587.33, now, 0.22);        // D5
    playTone(880.00, now + 0.18, 0.35); // A5
  } catch (err) {
    console.warn('Audio beep could not be played:', err);
  }
}

// Dark Mode Toggle Logic
function initTheme() {
  const savedTheme = localStorage.getItem('pomodoro-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

  if (isDark) {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    themeIcon.textContent = '🌙';
  }
  updateRingColor();
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('pomodoro-theme', isDark ? 'dark' : 'light');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  updateRingColor();
}

function updateRingColor() {
  const isDark = document.body.classList.contains('dark-mode');
  progressRingBar.style.stroke = isDark ? MODES[currentMode].darkColor : MODES[currentMode].color;
}

// Format seconds to MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Update clock display, progress ring, and browser title
function updateDisplay() {
  const formatted = formatTime(timeLeft);
  timeDisplay.textContent = formatted;
  document.title = `${formatted} - ${MODES[currentMode].label}`;

  const fraction = timeLeft / totalTime;
  const offset = CIRCUMFERENCE - (fraction * CIRCUMFERENCE);
  progressRingBar.style.strokeDashoffset = `${offset}`;
}

// Start timer
function startTimer() {
  if (isRunning) return;

  isRunning = true;
  startBtn.disabled = true;
  pauseBtn.disabled = false;

  timerId = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft -= 1;
      updateDisplay();
    } else {
      handleTimerComplete();
    }
  }, 1000);
}

// Pause timer
function pauseTimer() {
  if (!isRunning) return;

  clearInterval(timerId);
  timerId = null;
  isRunning = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

// Reset timer
function resetTimer() {
  pauseTimer();
  timeLeft = totalTime;
  updateDisplay();
}

// Complete timer countdown
function handleTimerComplete() {
  pauseTimer();
  playGentleBeep();

  if (currentMode === 'pomodoro') {
    completedSessions += 1;
    localStorage.setItem('pomodoro-completed-sessions', completedSessions.toString());
    sessionCountDisplay.textContent = completedSessions;
    alert('Focus session completed! Great job. Time for a break!');
    switchMode('shortBreak');
  } else {
    alert('Break finished! Ready to focus again?');
    switchMode('pomodoro');
  }
}

// Switch timer modes
function switchMode(modeKey) {
  if (!MODES[modeKey]) return;

  currentMode = modeKey;
  totalTime = MODES[modeKey].time;
  timeLeft = totalTime;

  modeStatus.textContent = MODES[modeKey].label;
  updateRingColor();

  modeButtons.forEach(btn => {
    if (btn.dataset.mode === modeKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  resetTimer();
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
themeToggle.addEventListener('click', toggleTheme);

modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    switchMode(btn.dataset.mode);
  });
});

// Initialize
initTheme();
updateDisplay();
