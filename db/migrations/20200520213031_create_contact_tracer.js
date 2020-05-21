exports.up = async (knex) => {
  await knex.schema.createTable('contact_tracer', table => {
    table.increments('id').primary()
    table.string('username').notNull()
    table.string('password').notNull()
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON contact_tracer
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `);
};

exports.down = function(knex) {
  return knex.schema.dropTable('contact_tracer')
};
