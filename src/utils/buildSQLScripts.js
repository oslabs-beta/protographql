import tabs from './tabs';

const showFields = fields => {
  const totalFields = Math.max(...Object.keys(fields));
  let output = ``;

  // Define each field in SQL
  for (let i in fields) {
    const field = fields[i];
    output += `${tabs(1)}"${field.name}"`;
    
    let sqlType = '';
    switch(field.type) {
      case `ID`:
        sqlType += ` SERIAL`;
        break;
      case `String`:
        sqlType += ` VARCHAR(256)`;
        break;
      case `Int`:
        sqlType += ` INTEGER`;
        break;
      case `Float`:
        sqlType += ` FLOAT(8)`;
        break;
      case `Boolean`:
        sqlType += ` BOOLEAN`;
        break;
      default:
        sqlType += field.type;
    }
    
    output += sqlType;
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
