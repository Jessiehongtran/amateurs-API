
exports.up = function(knex) {
  return knex.schema.createTable('images', tbl => {
      tbl.increments()
      tbl.string('img_url')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('images');
};
