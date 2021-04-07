exports.init = async (client) => {
  await client.query(`
      CREATE TABLE IF NOT EXISTS users
      (
          id INT UNSIGNED NOT NULL AUTO_INCREMENT,
          created DATETIME DEFAULT CURRENT_TIMESTAMP,
          uuid CHAR(36) NOT NULL,
          name VARCHAR(100) NOT NULL,

          username VARCHAR(50) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,

          PRIMARY KEY (id)
      );  
      `);

  await client.query(`
      CREATE TABLE IF NOT EXISTS posts
      (
          id INT UNSIGNED NOT NULL AUTO_INCREMENT,
          created DATETIME DEFAULT CURRENT_TIMESTAMP,
          uuid CHAR(36) NOT NULL,
          text VARCHAR(100) NOT NULL,
          user_id MEDIUMINT UNSIGNED NOT NULL,
          PRIMARY KEY (id)
      );  
      `);
};

exports.getUser = async (client, uuid) => {
  var user = {};
  var userFromDb = await client.query(
    `
      select id, uuid, name from users where uuid = ? 
      `,
    [uuid]
  );
  if (userFromDb.length == 0) {
    return null;
  }
  var postsFromDb = await client.query(
    `
      select uuid, text from posts where user_id = ?
      `,
    [userFromDb[0].id]
  );

  user.UUID = userFromDb[0].uuid;
  user.Name = userFromDb[0].name;

  if (postsFromDb.length > 0) {
    user.Posts = postsFromDb.map(function (x) {
      return { UUID: x.uuid, Text: x.text };
    });
  }
  return user;
};
