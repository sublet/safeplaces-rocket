
exports.up = function(knex) {
  return knex.schema.createTable('admin', table => {
    table.increments('id').primary()
    table.string('username').notNull()
    table.string('password').notNull()
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('admin')
};
