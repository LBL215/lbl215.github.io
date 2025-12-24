const bootLines = [
  "initializing system core...",
  "loading kernel modules...",
  "mounting virtual filesystem...",
  "checking memory integrity... OK",
  "establishing encrypted channel...",
  "syncing neural interface...",
  "loading UI modules...",
  "injecting matrix stream...",
  "verifying permissions...",
  "access level: USER",
  "launching interface...",
  "system ready."
];

const boot = document.createElement("div");
boot.id = "boot";

const terminal = document.createElement("pre");
terminal.id = "bootText";

boot.appendChild(terminal);
document.body.appendChild(boot);

let line = 0;

function typeLine(text, cb) {
  let i = 0;
  const interval = setInterval(() => {
    terminal.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      terminal.textContent += "\n";
      setTimeout(cb, 300);
    }
  }, 25);
}

function runBoot() {
  if (line < bootLines.length) {
    typeLine("> " + bootLines[line], () => {
      line++;
      runBoot();
    });
  } else {
    setTimeout(() => {
      boot.classList.add("hide");
    }, 700);
  }
}

runBoot();
