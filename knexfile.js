// Update with your config settings.

if (process.env.NODE_ENV === 'test') {
  require('./testSetup')
}

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  migrations: {
    directory: __dirname + '/db/migrations'
  }
};
