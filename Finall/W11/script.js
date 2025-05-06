let users = JSON.parse(localStorage.getItem('users') || '[]');

function register(e) {
  e.preventDefault();
  let user = {
    name: val('name'), email: val('email'), mobile: val('mobile'),
    dob: val('dob'), city: val('city'), address: val('address'),
    username: val('username'), password: val('password')
  };
  
  if (users.find(u => u.username === user.username)) {
    alert("Username already exists!");
    return;
  }

  users.push(user);
  saveUsers();
  alert("Registered successfully!");
  window.location.href = "login.html";
}

function login(e) {
  e.preventDefault();
  let uname = val('loginUsername'), pass = val('loginPassword');
  let found = users.find(u => u.username === uname && u.password === pass);
  
  if (found) {
    alert("Login successful!");
    window.location.href = "list.html";
  } else {
    alert("Invalid credentials!");
  }
}

function showUsers() {
  let list = document.getElementById('userList');
  if (!list) return;
  list.innerHTML = users.map(u => `<li>${u.name} (${u.email})</li>`).join('');
}

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
  
  // Simulating AJAX POST
  fetch('users.json', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(users)
  });
}

function val(id) {
  return document.getElementById(id).value.trim();
}
