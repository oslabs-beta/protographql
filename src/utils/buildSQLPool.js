import tabs from './tabs';

const buildSQLPool = URI => {
  let SQLPool = ``;
  SQLPool += `const URI = '${URI}';\n`;
  SQLPool += `const { Pool } = require('pg');\n\n`;

  SQLPool += `const pool = new Pool({\n`;
  SQLPool += `${tabs(1)}connectionString: URI,\n`;
  SQLPool += `${tabs(1)}ssl: true,\n`;
  SQLPool += `})\n\n`;

  SQLPool += `pool.connect((err, client, done) => {\n`
  SQLPool += `${tabs(1)}if (err) return console.log(\`Error connecting to db, \${err}\`);\n`;
  SQLPool += `${tabs(1)}console.log('Connected to db :)')\n`;
  SQLPool += `${tabs(1)}done();\n`;
  SQLPool += `})\n\n`;

  SQLPool += `module.exports = pool;\n`;
  return SQLPool;
}

export default buildSQLPool;

