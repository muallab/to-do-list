// src/public/admin.js
const container = document.getElementById('table-container');

fetch('/api/todos', {
  credentials: 'include'   // ← send the login cookie
})
  .then(res => {
    if (res.status === 401) {
      // not logged in? send back to login page
      window.location.href = '/login.html';
      throw new Error('Not authorized');
    }
    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }
    return res.json();
  })
  .then(todos => {
    if (!todos.length) {
      container.textContent = 'No todos to display.';
      return;
    }
    // build the table
    const cols = Object.keys(todos[0]);
    let html = '<table><thead><tr>' +
      cols.map(c => `<th>${c}</th>`).join('') +
      '</tr></thead><tbody>';
    todos.forEach(todo => {
      html += '<tr>' + cols.map(c => `<td>${todo[c]}</td>`).join('') + '</tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  })
  .catch(err => {
    console.error(err);
    container.textContent = 'Failed to load todos.';
  });

  