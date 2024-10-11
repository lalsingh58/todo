// Get DOM elements
const form = document.getElementById('todo-form');
const titleInput = document.getElementById('title');
const bodyInput = document.getElementById('body');
const taskList = document.getElementById('task-list');
const searchBar = document.getElementById('search-bar');

let tasks = [];

// Handle form submission to add a new task
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (title && body) {
    const newTask = {
      id: Date.now(),
      title,
      body,
      completed: false,
    };

    tasks.push(newTask);
    renderTasks();
    form.reset();
  }
});

// Render tasks on the screen
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    if (task.completed) {
      taskElement.classList.add('completed');
    }

    taskElement.innerHTML = `
      <div>
        <h3>${task.title}</h3>
        <p>${task.body}</p>
      </div>
      <div>
        <button class="edit" onclick="editTask(${task.id})">Edit</button>
        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
        <button class="toggle-status" onclick="toggleStatus(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
      </div>
    `;

    taskList.appendChild(taskElement);
  });
}

// Delete task by ID
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Edit task
function editTask(id) {
  const task = tasks.find(task => task.id === id);
  const newTitle = prompt('Edit Title:', task.title);
  const newBody = prompt('Edit Body:', task.body);

  if (newTitle && newBody) {
    task.title = newTitle;
    task.body = newBody;
    renderTasks();
  }
}

// Toggle task status (complete/incomplete)
function toggleStatus(id) {
  const task = tasks.find(task => task.id === id);
  task.completed = !task.completed;
  renderTasks();
}

// Search functionality
searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(query) || task.body.toLowerCase().includes(query)
  );
  renderFilteredTasks(filteredTasks);
});

// Render filtered tasks
function renderFilteredTasks(filteredTasks) {
  taskList.innerHTML = '';
  filteredTasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    if (task.completed) {
      taskElement.classList.add('completed');
    }

    taskElement.innerHTML = `
      <div>
        <h3>${task.title}</h3>
        <p>${task.body}</p>
      </div>
      <div>
        <button class="edit" onclick="editTask(${task.id})">Edit</button>
        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
        <button class="toggle-status" onclick="toggleStatus(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
      </div>
    `;

    taskList.appendChild(taskElement);
  });
}
