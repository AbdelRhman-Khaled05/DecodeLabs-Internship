// ============================================================
//  data/store.js — In-memory data store
//  Acts as the "database" for this project.
//  In a real app this would be replaced by MongoDB / PostgreSQL.
// ============================================================

let users = [
  {
    id:        1,
    name:      'Abdelrahman Sabaa',
    email:     'abdelrahman@example.com',
    role:      'intern',
    createdAt: '2026-05-10T00:00:00.000Z'
  },
  {
    id:        2,
    name:      'DecodeLabs Admin',
    email:     'admin@decodelabs.tech',
    role:      'admin',
    createdAt: '2026-01-01T00:00:00.000Z'
  }
];

// Auto-incrementing ID counter
let nextId = 3;

module.exports = {
  getAll:    ()     => users,
  getById:   (id)   => users.find(u => u.id === id),
  create:    (user) => {
    const newUser = { id: nextId++, ...user, createdAt: new Date().toISOString() };
    users.push(newUser);
    return newUser;
  },
  update:    (id, data) => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...data };
    return users[index];
  },
  remove:    (id) => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  }
};
