const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { resourcesDataPath } = require('./paths');

const usersFile = () => path.join(resourcesDataPath(), 'users.json');

function readUsers() {
  const p = usersFile();
  if (!fs.existsSync(p)) {
    const defaultUsers = [
      { username: 'admin', password: md5('admin') }
    ];
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, JSON.stringify(defaultUsers, null, 2));
    return defaultUsers;
  }
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function md5(text) {
  return crypto.createHash('md5').update(text).digest('hex');
}

function verify(username, passwordHash) {
  const users = readUsers();
  return users.find(u => u.username === username && u.password === passwordHash) || null;
}

module.exports = { readUsers, verify, md5 };
