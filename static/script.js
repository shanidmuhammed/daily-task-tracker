const activeList = document.getElementById('activeList');
const completedList = document.getElementById('completedList');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const completeAllBtn = document.getElementById('completeAllBtn');
const darkModeBtn = document.getElementById('darkModeBtn');

function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';

  // Custom toggle button
  const btnToggle = document.createElement('button');
  btnToggle.className = 'btn-toggle' + (task.completed ? ' selected' : '');
  btnToggle.title = task.completed ? 'Undo' : 'Mark Completed';

  const radioCircle = document.createElement('span');
  radioCircle.className = 'radio-circle';
  const radioDot = document.createElement('span');
  radioDot.className = 'radio-dot';
  radioCircle.appendChild(radioDot);
  btnToggle.appendChild(radioCircle);

  btnToggle.addEventListener('click', async () => {
    await fetch(`/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    });
    refreshTasks();
  });

  // Label with editable task name
  const label = document.createElement('p');
  label.className = 'task-label' + (task.completed ? ' task-completed' : '');
  label.textContent = task.task;
  label.style.flexGrow = '1';
  label.style.cursor = 'pointer';

  // Inline editing handler
  label.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = label.textContent;
    input.className = 'task-edit-input form-control';
    input.style.flexGrow = '1';
    label.replaceWith(input);
    input.focus();

    async function saveEdit() {
      const newText = input.value.trim() || '(Untitled Task)';
      await fetch(`/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: newText }),
      });
      refreshTasks();
    }

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') saveEdit();
    });
  });

  // Delete button
  const btnDelete = document.createElement('button');
  btnDelete.textContent = '×';
  btnDelete.className = 'btn-delete';
  btnDelete.title = 'Delete Task';
  btnDelete.addEventListener('click', async () => {
    await fetch(`/tasks/${task.id}`, { method: 'DELETE' });
    refreshTasks();
  });

  li.appendChild(btnToggle);
  li.appendChild(label);
  li.appendChild(btnDelete);

  return li;
}

async function refreshTasks() {
  const response = await fetch('/tasks');
  const tasks = await response.json();
  activeList.innerHTML = '';
  completedList.innerHTML = '';
  tasks.forEach(task => {
    const taskEl = createTaskElement(task);
    if (task.completed) completedList.appendChild(taskEl);
    else activeList.appendChild(taskEl);
  });
}

taskForm.addEventListener('submit', async e => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  await fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task: taskText }),
  });

  taskInput.value = '';
  refreshTasks();
});

clearCompletedBtn.addEventListener('click', async () => {
  const response = await fetch('/tasks');
  const tasks = await response.json();
  for (const task of tasks) {
    if (task.completed) {
      await fetch(`/tasks/${task.id}`, { method: 'DELETE' });
    }
  }
  refreshTasks();
});

// Mark All Button
completeAllBtn.addEventListener('click', async () => {
  const response = await fetch('/tasks');
  const tasks = await response.json();

  for (const task of tasks) {
    if (!task.completed) {
      await fetch(`/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      });
    }
  }

  refreshTasks();
});

// Dark Mode Toggle
darkModeBtn.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark-mode');
  document.body.classList.toggle('dark-mode', isDark);
  localStorage.setItem('darkMode', isDark ? '1' : '');
});

// Load Dark Mode pref on page load
if (localStorage.getItem('darkMode')) {
  document.body.classList.add('dark-mode');
}

// Load tasks on page load
refreshTasks();
