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


// Xóa sản phẩm theo id
function deleteById(id) {
  const db = readDB();
  const newItems = db.items.filter(i => String(i.id) !== String(id));
  db.items = newItems;
  writeDB(db);
  return true;
}


// Tìm sản phẩm theo id, name hoặc price
function searchItem(key) {
  const db = readDB();
  if (!key) return db.items;
  const lowerKey = String(key).toLowerCase();
  return db.items.filter(i =>
    String(i.id).toLowerCase().includes(lowerKey) ||
    (i.name && i.name.toLowerCase().includes(lowerKey)) ||
    (typeof i.price !== 'undefined' && String(i.price).includes(lowerKey))
  );
}

module.exports = { readDB, writeDB, deleteById, searchItem };
