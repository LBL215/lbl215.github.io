// Boot lines
const bootLines = [
  "loading modules...",
  "injecting matrix stream...",
  "verifying permissions...",
  "access level: USER",
  "launching interface...",
  "system ready."
];

// Create boot container
const boot = document.createElement("div");
boot.id = "boot";
boot.style.position = "fixed";
boot.style.top = "0";
boot.style.left = "0";
boot.style.width = "100%";
boot.style.height = "100%";
boot.style.background = "#000";
boot.style.color = "#0f0";
boot.style.fontFamily = "monospace";
boot.style.fontSize = "1.2em";
boot.style.padding = "20px";
boot.style.whiteSpace = "pre-wrap";
boot.style.overflowY = "auto";
boot.style.zIndex = "9999";

const terminal = document.createElement("pre");
terminal.id = "bootText";
boot.appendChild(terminal);
document.body.appendChild(boot);

// Hide main content until boot finishes
const mainSections = document.querySelectorAll("main");
mainSections.forEach(sec => sec.style.display = "none");

// Typing effect for a line
let line = 0;
function typeLine(text, cb) {
  let i = 0;
  const interval = setInterval(() => {
    terminal.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      terminal.textContent += "\n";
      setTimeout(cb, 300); // small delay before next line
    }
  }, 25);
}

// Run boot sequence
function runBoot() {
  if (line < bootLines.length) {
    typeLine("> " + bootLines[line], () => {
      line++;
      runBoot();
    });
  } else {
    // Boot finished: fade out
    boot.style.transition = "opacity 0.7s";
    boot.style.opacity = "0";
    setTimeout(() => {
      boot.remove();
      // Show main content
      mainSections.forEach(sec => sec.style.display = "block");
    }, 700);
  }
}

runBoot();
