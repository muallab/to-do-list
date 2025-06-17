// example in script.js
await fetch('/api/todos', {
    method: 'POST',
    credentials: 'include',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ text })
  });
  