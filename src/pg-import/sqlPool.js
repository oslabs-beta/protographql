const { Pool } = require('pg');
require("dotenv").config();

const URI = 'postgres://yjmnkrxd:AXHzChrA4_EG_6NIYlDlLMjXVi2WERwO@raja.db.elephantsql.com:5432/yjmnkrxd'


const pool = new Pool({
  connectionString: URI,
  ssl: true,
})

pool.connect((err, client, done) => {
  if (err) return console.log(`Error connecting to db, ${err}`);
  console.log('Connected to db 😄')
  done();
})

module.exports = pool;