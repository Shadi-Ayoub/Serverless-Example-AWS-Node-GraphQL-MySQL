//const uuidv4 = require("uuid/v4");
const { v4: uuidv4 } = require("uuid");
var common = require("../Common/mysql_common");
const Client = require("serverless-mysql");

exports.func = async (_, obj) => {
  var client = Client({
    config: {
      host: process.env.MYSQL_DB_HOST,
      database: process.env.MYSQL_DB_NAME,
      user: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
    },
  });

  await common.init(client);
  var userUUID = uuidv4();
  let user = await client.query("INSERT INTO users (uuid, name) VALUES(?,?)", [userUUID, obj.input.Name]);
  for (let index = 0; index < obj.input.Posts.length; index++) {
    const element = obj.input.Posts[index];
    await client.query("INSERT INTO posts (uuid, text, user_id) VALUES(?, ?, ?)", [uuidv4(), element.Text, user.insertId]);
  }
  var resp = await common.getUser(client, userUUID);
  client.quit();
  return resp;
};
