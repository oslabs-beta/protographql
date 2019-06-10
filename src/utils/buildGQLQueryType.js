import tabs from './tabs';

// Autogenerate default GQL queries
const buildGQLQueryType = tables => {
  let gqlQuery = `${tabs(1)}type Query {\n`;

  // Define a GQL query for each table
  for (let tbIndex in tables) {
    const table = tables[tbIndex];
    gqlQuery += `${tabs(2)}getAll${table.type}: [${table.type}]\n`;
    let custom = `${tabs(2)}get${table.type}(\n`;
    let queryable = false;
    for (let fieldIndex in table.fields) {
      const field = table.fields[fieldIndex];
      if (field.queryable) {
        queryable = true;
        custom += `${tabs(3)}${field.name}: ${field.type}`;
        if (table.fieldIndex - 1 !== field.fieldNum) custom += ',';
        custom += `\n`;
      // check if the field is queryable
      // If the table field has a UNIQUEID (at field index 0) then provide a query by ID
      }
    }
    if (queryable) {
      gqlQuery += custom;
      gqlQuery += `${tabs(2)}): [${table.type}]\n`;
    }
  }
  gqlQuery += `${tabs(1)}}\n`;

  return gqlQuery;
}

export default buildGQLQueryType;