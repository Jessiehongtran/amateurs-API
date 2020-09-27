const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          nick_name: "Anonymous",
          email: "anonymous@gmail.com",
          password: bcrypt.hashSync("abc123", 10),
          avatar: "https://res.cloudinary.com/zofuku/image/upload/v1600635037/Profile-PNG-Icon_wdgkjg.png"
        }
        
      ]);
    });
};
