const api = '/api/todos';
const list = document.getElementById('todo-list');
const input = document.getElementById('new-todo');
const addBtn = document.getElementById('add-btn');

async function loadTodos() {
  const res = await fetch(api);
  const todos = await res.json();
  list.innerHTML = '';
  todos.forEach(createTodoElement);
}

function createTodoElement(todo) {
  const li = document.createElement('li');
  const chk = document.createElement('input');
  chk.type = 'checkbox';
  chk.checked = todo.completed;
  chk.addEventListener('change', () => toggleComplete(todo._id, chk.checked, li));

  const span = document.createElement('span');
  span.textContent = todo.text;

  const del = document.createElement('button');
  del.textContent = 'Delete';
  del.className = 'delete';
  del.addEventListener('click', () => deleteTodo(todo._id, li));

  li.append(chk, span, del);
  if (todo.completed) li.classList.add('completed');
  list.appendChild(li);
}

addBtn.addEventListener('click', async () => {
  const text = input.value.trim();
  if (!text) return;
  const res = await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ text })
  });
  createTodoElement(await res.json());
  input.value = '';
});

async function toggleComplete(id, done, li) {
  await fetch(`${api}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ completed: done })
  });
  li.classList.toggle('completed', done);
}

async function deleteTodo(id, li) {
  await fetch(`${api}/${id}`, { method: 'DELETE' });
  li.remove();
}

// example in script.js
await fetch('/api/todos', {
    method: 'POST',
    credentials: 'include',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ text })
  });
  

document.addEventListener('DOMContentLoaded', loadTodos);
