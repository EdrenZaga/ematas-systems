// State management
let todos = [];
let currentFilter = 'all';

// DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');
const filterButtons = document.querySelectorAll('.filter-btn');
const emptyState = document.getElementById('empty-state');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

// Load todos from localStorage
function loadTodos() {
  try {
    const saved = localStorage.getItem('todos');
    if (saved) {
      todos = JSON.parse(saved);
    } else {
      // Default initial starter tasks if empty
      todos = [
        { id: 1, text: 'Welcome to your To-Do app!', completed: false },
        { id: 2, text: 'Check off a task when done', completed: true },
        { id: 3, text: 'Try filtering by Active or Completed', completed: false }
      ];
    }
  } catch (e) {
    console.error('Failed to parse todos from localStorage', e);
    todos = [];
  }
}

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Add a new todo
function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const newTodo = {
    id: Date.now(),
    text: trimmed,
    completed: false
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();
}

// Toggle todo completion
function toggleTodo(id) {
  const todo = todos.find(item => item.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}

// Delete a todo
function deleteTodo(id) {
  todos = todos.filter(item => item.id !== id);
  saveTodos();
  renderTodos();
}

// Clear all completed todos
function clearCompleted() {
  todos = todos.filter(item => !item.completed);
  saveTodos();
  renderTodos();
}

// Set active filter
function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach(btn => {
    if (btn.dataset.filter === filter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  renderTodos();
}

// Filter todos according to currentFilter
function getFilteredTodos() {
  switch (currentFilter) {
    case 'active':
      return todos.filter(item => !item.completed);
    case 'completed':
      return todos.filter(item => item.completed);
    case 'all':
    default:
      return todos;
  }
}

// Render todos to the DOM
function renderTodos() {
  const filteredTodos = getFilteredTodos();
  todoList.innerHTML = '';

  if (filteredTodos.length === 0) {
    emptyState.classList.remove('hidden');
    const emptyText = emptyState.querySelector('.empty-text');
    if (currentFilter === 'active') {
      emptyText.textContent = 'No active tasks';
    } else if (currentFilter === 'completed') {
      emptyText.textContent = 'No completed tasks yet';
    } else {
      emptyText.textContent = 'No tasks yet. Add one above!';
    }
  } else {
    emptyState.classList.add('hidden');

    filteredTodos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      li.dataset.id = todo.id;

      const leftContainer = document.createElement('div');
      leftContainer.className = 'todo-item-left';

      // Checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'todo-checkbox';
      checkbox.checked = todo.completed;
      checkbox.setAttribute('aria-label', `Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`);
      checkbox.addEventListener('change', () => toggleTodo(todo.id));

      // Text span
      const textSpan = document.createElement('span');
      textSpan.className = 'todo-text';
      textSpan.textContent = todo.text;
      textSpan.addEventListener('click', () => toggleTodo(todo.id));

      leftContainer.appendChild(checkbox);
      leftContainer.appendChild(textSpan);

      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn-delete';
      deleteBtn.innerHTML = '&times;';
      deleteBtn.setAttribute('aria-label', `Delete task "${todo.text}"`);
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTodo(todo.id);
      });

      li.appendChild(leftContainer);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  }

  // Update remaining count (active tasks)
  const activeCount = todos.filter(t => !t.completed).length;
  taskCount.textContent = `${activeCount} ${activeCount === 1 ? 'item' : 'items'} left`;

  // Toggle clear-completed button visibility
  const hasCompleted = todos.some(t => t.completed);
  if (hasCompleted) {
    clearCompletedBtn.classList.remove('hidden');
  } else {
    clearCompletedBtn.classList.add('hidden');
  }
}

// Event listeners
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo(todoInput.value);
  todoInput.value = '';
  todoInput.focus();
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setFilter(btn.dataset.filter);
  });
});

clearCompletedBtn.addEventListener('click', clearCompleted);

// Initialize app
loadTodos();
renderTodos();
