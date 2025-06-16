// src/services/logger.js
const { appendFile } = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../../logs/requests.log');

/**
 * Append a line to logs/requests.log in the format:
 * [ISO timestamp] METHOD URL
 */
function logRequest(req) {
  const line = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  appendFile(logFile, line, (err) => {
    if (err) console.error('Logging failed:', err);
  });
}

module.exports = { logRequest };
