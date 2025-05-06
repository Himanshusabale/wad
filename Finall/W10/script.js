let tasks = [];

window.onload = loadTasks;

function loadTasks() {
  fetch('task.json')
    .then(res => res.json())
    .then(data => {
      tasks = data;
      showTasks();
    });
}

function showTasks() {
  document.getElementById("taskList").innerHTML = tasks.map((t, i) =>
    `<li>${t} 
      <button onclick="editTask(${i})">Edit</button> 
      <button onclick="deleteTask(${i})">Delete</button>
    </li>`
  ).join('');
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value) return;
  tasks.push(input.value);
  input.value = "";
  saveTasks();
}

function editTask(i) {
  const updated = prompt("Update Task:", tasks[i]);
  if (updated) tasks[i] = updated;
  saveTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  saveTasks();
}

function saveTasks() {
  fetch('task.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tasks)
  });
  showTasks();
}
