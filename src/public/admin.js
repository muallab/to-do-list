// src/public/admin.js
const container = document.getElementById('table-container');

fetch('/api/todos', {
  credentials: 'include'
})
  .then(res => {
    if (res.status === 401) {
      window.location.href = '/login.html';
      throw new Error('Not authorized');
    }
    return res.json();
  })
  .then(todos => {
    if (!todos.length) {
      container.textContent = 'No todos to display.';
      return;
    }

    // Only these columns:
    const cols = ['text', 'completed', 'createdAt'];

    // Build header
    let html = '<table><thead><tr>' +
      cols.map(c => `<th>${c}</th>`).join('') +
      '</tr></thead><tbody>';

    // Build rows
    todos.forEach(todo => {
      html += '<tr>' +
        [
          todo.text,
          todo.completed ? '✔️' : '❌',
          new Date(todo.createdAt).toLocaleString()
        ].map(val => `<td>${val}</td>`).join('') +
      '</tr>';
    });

    html += '</tbody></table>';
    container.innerHTML = html;
  })
  .catch(err => {
    console.error(err);
    container.textContent = 'Failed to load todos.';
  });
