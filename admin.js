// admin.js
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault(); // prevent page reload
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;

  // Simple hardcoded check
  if(user === 'admin' && pass === '1234') {
    document.getElementById('msg').innerText = "Login successful!";
    // redirect to admin dashboard or show content
  } else {
    document.getElementById('msg').innerText = "Wrong username or password!";
  }
});
