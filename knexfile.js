require('dotenv')

const connInfo = process.env.NODE_ENV === 'test' 
  ? require('./test/envVars') 
  : process.env

module.exports = {
  client: 'pg',
  connection: {
    host: connInfo.DB_HOST,
    user: connInfo.DB_USER,
    password: connInfo.DB_PASS,
    database: connInfo.DB_NAME
  },
  migrations: {
    directory: __dirname + '/db/migrations'
  }
};
