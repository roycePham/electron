const fs = require('fs');
const path = require('path');
const { resourcesDataPath } = require('./paths');

const dbFile = () => path.join(resourcesDataPath(), 'database.json');

function readDB() {
  const p = dbFile();
  if (!fs.existsSync(p)) {
    const initial = { items: [], imports: [], exports: [] };
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, JSON.stringify(initial, null, 2));
    return initial;
  }
  const raw = fs.readFileSync(p, 'utf-8');
  return JSON.parse(raw);
}

function writeDB(data) {
  const p = dbFile();
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { readDB, writeDB };
