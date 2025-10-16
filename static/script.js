    const activeList = document.getElementById('activeList');
    const completedList = document.getElementById('completedList');
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const completeAllBtn = document.getElementById('completeAllBtn');

    taskForm.addEventListener('submit', e => {
      e.preventDefault();
      const text = taskInput.value.trim();
      if (!text) return;
      activeList.appendChild(createTaskItem(text, false));
      taskInput.value = '';
      taskInput.focus();
    });

    function createTaskItem(text, completed) {
      const li = document.createElement('li');
      li.className = 'list-group-item';

      const btnToggle = document.createElement('button');
      btnToggle.className = 'btn-toggle' + (completed ? ' selected' : '');
      btnToggle.title = completed ? 'Undo' : 'Mark Completed';

      const radioCircle = document.createElement('span');
      radioCircle.className = 'radio-circle';

      const radioDot = document.createElement('span');
      radioDot.className = 'radio-dot';

      radioCircle.appendChild(radioDot);
      btnToggle.appendChild(radioCircle);

      const label = document.createElement('p');
      label.className = 'task-label' + (completed ? ' task-completed' : '');
      label.textContent = text;

      label.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'task-edit-input';
        input.value = label.textContent;
        label.replaceWith(input);
        input.focus();
        input.select();
        function finishEdit() {
          label.textContent = input.value.trim() || '(Untitled Task)';
          input.replaceWith(label);
        }
        input.addEventListener('blur', finishEdit);
        input.addEventListener('keydown', e => {
          if (e.key === 'Enter') finishEdit();
        });
      });

      btnToggle.addEventListener('click', () => {
        if (li.classList.contains('completed')) {
          li.classList.remove('completed');
          label.classList.remove('task-completed');
          btnToggle.classList.remove('selected');
          activeList.appendChild(li);
        } else {
          li.classList.add('completed');
          label.classList.add('task-completed');
          btnToggle.classList.add('selected');
          completedList.appendChild(li);
        }
      });

      const btnDelete = document.createElement('button');
      btnDelete.className = 'btn-delete';
      btnDelete.title = 'Delete Task';
      btnDelete.innerHTML = '&times;';
      btnDelete.addEventListener('click', () => li.remove());

      li.appendChild(btnToggle);
      li.appendChild(label);
      li.appendChild(btnDelete);

      return li;
    }

    clearCompletedBtn.addEventListener('click', () => {
      completedList.innerHTML = '';
    });

    completeAllBtn.addEventListener('click', () => {
      const tasks = [...activeList.children];
      tasks.forEach(li => {
        li.classList.add('completed');
        const label = li.querySelector('.task-label');
        const btnToggle = li.querySelector('.btn-toggle');
        label.classList.add('task-completed');
        btnToggle.classList.add('selected');
        completedList.appendChild(li);
      });
    });