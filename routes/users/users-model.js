const db = require('../../data/db-config');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('users as u')
  .select('u.id', 'u.username', 'u.password', 'r.name')
  .join('roles as r', 'r.id', 'u.role_id')
}

function findBy(filter) {
  return db('users')
    .select('id', 'username', 'password')
    .where(filter);
}

function add(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db('users')
    .select('id', 'username')
    .where({ id })
    .first();
}
