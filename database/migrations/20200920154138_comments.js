
exports.up = function(knex) {
  return knex.schema.createTable('comments', tbl => {
      tbl.increments()
      tbl.integer('event_id')
         .notNullable()
         .unsigned()
         .references('id')
         .inTable('events')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
      tbl.integer('user_id')
         .notNullable()
         .unsigned()
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
      tbl.string('comment')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comments');
};
