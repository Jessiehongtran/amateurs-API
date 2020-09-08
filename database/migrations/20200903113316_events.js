
exports.up = function(knex) {
    return knex.schema.createTable('events', tbl => {
        tbl.increments()
        tbl.time('start_time').notNullable()
        tbl.date('start_date').notNullable()
        tbl.string('title')
        tbl.string('description')
        tbl.integer('joined')
        tbl.integer('host_id')
           .notNullable()
           .unsigned()
           .references('id')
           .inTable('users')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
        tbl.string('banner_img')
        tbl.timestamp('created_at').defaultTo(knex.fn.now())
    })
  };
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('events');
  };
