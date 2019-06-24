import tabs from './tabs';

const showFields = fields => {
  const totalFields = Math.max(...Object.keys(fields));
  let output = ``;

  // Define each field in SQL
  for (let i in fields) {
    const field = fields[i];
    output += `${tabs(1)}"${field.name}"`;
    output += field.type === `String` ? ` VARCHAR(256)` : ``;
    output += field.type === `ID` ? ` SERIAL` : ``;
    output += field.type !== `String` && field.type !== `ID` ? ` ${field.type}` : ``;
    output += field.primaryKey ? ` PRIMARY KEY` : ``;
    output += field.unique ? ` UNIQUE` : ``;
    output += field.required ? ` NOT NULL` : ``;
    output += field.defaultValue ? ` DEFAULT '${field.defaultValue}'` : ``;
    output += i < totalFields ? `,\n` : `\n);\n\n`;
  }

  return output;
}

const buildSQLScripts = tableState => {
  const tables = Object.values(tableState); 
  let sqlScripts = ``;

  tables.forEach(table => {
    sqlScripts += `CREATE TABLE "${table.type}" (\n`;
    sqlScripts += showFields(table.fields);
  });

  return sqlScripts;
}

export default buildSQLScripts;
