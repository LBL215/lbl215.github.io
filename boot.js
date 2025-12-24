// boot.js — Tron boot with beeps (iPad-safe)

const bootLines = [
  "INITIALIZING SYSTEM CORE",
  "LOADING KERNEL MODULES",
  "MOUNTING VIRTUAL FILESYSTEM",
  "SYNCING MEMORY BUFFERS",
  "STARTING UI SERVICES",
  "SYSTEM ONLINE"
];

let audioCtx;

// 🔊 Beep function
function beep(freq = 800, duration = 60) {
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.value = freq;
  osc.type = "square";

  gain.gain.value = 0.05;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration / 1000);
}

// Create boot overlay
const boot = document.createElement("div");
boot.id = "boot";

const terminal = document.createElement("pre");
terminal.id = "bootText";
terminal.textContent = "TAP TO INITIALIZE SYSTEM\n\n";

const barContainer = document.createElement("div");
barContainer.id = "progressContainer";

const bar = document.createElement("div");
bar.id = "progressBar";

barContainer.appendChild(bar);
boot.appendChild(terminal);
boot.appendChild(barContainer);
document.body.appendChild(boot);

let line = 0;
let progress = 0;

// Typing effect (fast)
function typeLine(text, cb) {
  let i = 0;
  const interval = setInterval(() => {
    terminal.textContent += text[i];
    beep(900, 40);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      terminal.textContent += "\n";
      setTimeout(cb, 120);
    }
  }, 12);
}

function updateProgress() {
  progress += Math.floor(100 / bootLines.length);
  bar.style.width = Math.min(progress, 100) + "%";
  beep(500, 60);
}

function runBoot() {
  if (line < bootLines.length) {
    typeLine("> " + bootLines[line], () => {
      updateProgress();
      line++;
      runBoot();
    });
  } else {
    bar.style.width = "100%";
    beep(1200, 150);
    setTimeout(() => boot.classList.add("hide"), 500);
  }
}

// 🚀 Start boot AFTER user tap (iPad requirement)
boot.addEventListener("click", () => {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  terminal.textContent = "";
  runBoot();
}, { once: true });
