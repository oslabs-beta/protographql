import tabs from './tabs';

// Autogenerate default GQL queries
const buildGQLQueryType = tables => {
  let gqlQuery = `${tabs(1)}type Query {\n`;

  // Define a GQL query for each table
  for (let tbIndex in tables) {
    const table = tables[tbIndex];
    gqlQuery += `${tabs(2)}getAll${table.type}: [${table.type}]\n`;
    
    // Check if table is queryable
    let queryable = false;
    let customQuery = `${tabs(2)}get${table.type}(\n`;
    for (let fieldIndex in table.fields) {
      const field = table.fields[fieldIndex];
      // check if the field is queryable
      if (field.queryable) {
        queryable = true;
        customQuery += `${tabs(3)}${field.name}: ${field.type}`;

        if (table.fieldIndex - 1 !== field.fieldNum) customQuery += ',';
        customQuery += `\n`;
      }
    }

    // If the table has at least one queryable field, then provide a query by that field
    if (queryable) {
      gqlQuery += customQuery;
      gqlQuery += `${tabs(2)}): [${table.type}]\n`;
    }
  }
  gqlQuery += `${tabs(1)}}\n`;

  return gqlQuery;
}

export default buildGQLQueryType;