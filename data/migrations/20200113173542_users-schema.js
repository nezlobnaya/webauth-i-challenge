
exports.up = function(knex) {
  return knex.schema
    .createTable('roles', tbl => {
        tbl.increments()
        tbl.string('name', 128).unique().notNullable()
    })
    .createTable('users', tbl => {
        tbl.increments()
        tbl.string('username', 128).unique().notNullable()
        tbl.string('password', 128).notNullable()
        tbl.integer('role_id')
        .unsigned() 
        .notNullable()
        .references('id')
        .inTable('roles')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('users')
  .dropTableIfExists('roles')
};
