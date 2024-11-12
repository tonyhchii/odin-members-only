const { Pool } = require("pg");
const poolInstance = new Pool({
  host: "localhost",
  user: "tonyhuang",
  database: "members",
  password: "123qwe",
  port: 5432,
});

module.exports = poolInstance;
