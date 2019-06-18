// This is not yet written in our codebase
const { Pool } = require('pg');

const pool = new Pool({
  host: 'isilo.db.elephantsql.com',
  database: 'kzbujefd',
  user: 'kzbujefd',
  password: 'az33ZfTosSKCrfqnrM1dtGHDPIywoiQ2',
  port: 5432
});

pool.connect((err, client, done) => {
  if (err) return console.error('Could not connect to postgres', err);
  console.log('Successfully connected to db!');
});

module.exports = pool;
