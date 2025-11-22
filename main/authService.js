const fs = require('fs');
const path = require('path');
const { resourcesDataPath } = require('./paths');

const usersFile = () => path.join(resourcesDataPath(), 'users.json');

function readUsers() {
  const p = usersFile();
  if (!fs.existsSync(p)) {
    const defaultUsers = [
      { username: 'admin', password: 'admin' }
    ];
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, JSON.stringify(defaultUsers, null, 2));
    return defaultUsers;
  }
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function verify(username, password) {
  const users = readUsers();
  console.log(users);
  return users.find(u => u.username === username && u.password === password) || null;
}

module.exports = { readUsers, verify };
