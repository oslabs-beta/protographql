import tabs from './tabs';

const showFields = fields => {
  const totalFields = Math.max(...Object.keys(fields));
  let output = ``;

  // Define each field in SQL
  for (let i in fields) {
    const field = fields[i];
    output += `${tabs(1)}"${field.name}"`;

    if (field.type === `String`) output += ` VARCHAR(256)`;
    else if (field.type !== `ID`) output += ` ${field.type}`;

    output += field.autoIncrement || field.type === `ID` ? ` SERIAL` : ``;
    output += field.primaryKey ? ` PRIMARY KEY` : ``;
    output += field.unique ? ` UNIQUE` : ``;
    output += field.required ? ` NOT NULL` : ``;
    output += field.defaultValue ? ` DEFAULT '${field.defaultValue}'` : ``;
    output += i < totalFields ? `,\n` : `\n)`;
  }

  return output;
}

const buildSQLScripts = tableState => {
  const tables = Object.values(tableState); // array with actual table objects
  let sqlScripts = ``;

  tables.forEach(table => {
    sqlScripts += `CREATE TABLE "${table.type}" (\n`;
    sqlScripts += showFields(table.fields);
    sqlScripts += `\n\n`; 
  });

  return sqlScripts;
}

export default buildSQLScripts;
