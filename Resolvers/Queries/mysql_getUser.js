var common = require("../Common/mysql_common");
const Client = require("serverless-mysql");
exports.func = async (_, { uuid }) => {
  var client = Client({
    config: {
      host: process.env.MYSQL_DB_HOST,
      database: process.env.MYSQL_DB_NAME,
      user: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
    },
  });
  await common.init(client);
  var resp = await common.getUser(client, uuid);
  client.quit();
  return resp;
};