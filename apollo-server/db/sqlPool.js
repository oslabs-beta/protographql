const URI = '';
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: URI,
  ssl: true,
})

pool.connect((err, client, done) => {
  if (err) return console.log(`Error connecting to db, ${err}`);
  console.log('Connected to db :)')
  done();
})

module.exports = pool;