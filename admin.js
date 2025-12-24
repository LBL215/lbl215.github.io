document.getElementById("loginBtn").addEventListener("click", () => {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (user === "admin" && pass === "2015October31!@") {
    localStorage.setItem("admin", "true");
    window.location.href = "editor.html";
  } else {
    document.getElementById("error").textContent = "ACCESS DENIED";
  }
});
