

exports.up = function(knex) {
    return knex.schema.createTable('event_participants', tbl => {
        tbl.increments()
        tbl.integer('event_id')
           .notNullable()
           .unsigned()
           .references('id')
           .inTable('events')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
        tbl.integer('participant_id')
           .notNullable()
           .unsigned()
           .references('id')
           .inTable('users')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
    })
  };
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('event_participants');
  };