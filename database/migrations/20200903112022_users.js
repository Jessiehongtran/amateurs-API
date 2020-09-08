
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments()
      tbl.string('nick_name').notNullable()
      tbl.string('email').unique().notNullable()
      tbl.string('password').notNullable()
      tbl.integer('year_of_birth')
      tbl.string('moto')
      tbl.string('avatar')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
