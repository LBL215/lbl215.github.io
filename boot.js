// boot.js

const bootLines = [
  "INITIALIZING SYSTEM CORE",
  "LOADING KERNEL MODULES",
  "MOUNTING VIRTUAL FILESYSTEM",
  "SYNCING MEMORY BUFFERS",
  "STARTING UI SERVICES",
  "SYSTEM ONLINE"
];

// Create boot overlay
const boot = document.createElement("div");
boot.id = "boot";

const terminal = document.createElement("pre");
terminal.id = "bootText";

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

// Faster typing
function typeLine(text, cb) {
  let i = 0;
  const interval = setInterval(() => {
    terminal.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      terminal.textContent += "\n";
      setTimeout(cb, 120);
    }
  }, 12);
}

// Progress bar animation
function updateProgress() {
  progress += Math.floor(100 / bootLines.length);
  bar.style.width = Math.min(progress, 100) + "%";
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
    setTimeout(() => {
      boot.classList.add("hide");
    }, 500);
  }
}

runBoot();
