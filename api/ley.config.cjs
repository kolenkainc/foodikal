// const { parse } = require('pg-connection-string');
// require('dotenv').config();

/*
postgresql://
neondb_owner:npg_nJt1yxWFuBa2
@ep-lucky-cloud-a2tzbej5-pooler.eu-central-1.aws.neon.tech
/neondb
?sslmode=require
&channel_binding=require
*/

// const { host, port, database, user, password } = parse(
//   process.env.WRANGLER_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE
// );

module.exports = {
  host: 'ep-lucky-cloud-a2tzbej5-pooler.eu-central-1.aws.neon.tech',
  port: 443,
  database: 'neondb',
  username: 'neondb_owner',
  password: 'npg_nJt1yxWFuBa2',
  ssl: require
};
