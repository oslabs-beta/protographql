import tabs from './tabs';

// Autogenerate default GQL queries
const buildGQLQueryType = tables => {
  let gqlQuery = `${tabs(1)}type Query {\n`;

  // Define a GQL query for each table
  for (let tbIndex in tables) {
    const table = tables[tbIndex];
    gqlQuery += `${tabs(2)}getAll${table.type}: [${table.type}]\n`;
    
    // Check if table has at least one queryable field
    // and extract the last queryable field index from table
    let queryable = false;
    let lastQryFieldIndex = -1;
    for (let fieldIndex in table.fields) {
      const field = table.fields[fieldIndex];
      if (field.queryable) {
        queryable = true;
        lastQryFieldIndex = Math.max(fieldIndex, lastQryFieldIndex);
      }
    }

    // If the table has at least one queryable field, then provide a query by that field
    if (queryable) {
      gqlQuery += `${tabs(2)}get${table.type}(\n`;
      for (let fieldIndex in table.fields) {
        const field = table.fields[fieldIndex];
        // check if the field is queryable
        if (field.queryable) {
          gqlQuery += `${tabs(3)}${field.name}: ${field.type}`;
          if (lastQryFieldIndex !== Number(fieldIndex)) gqlQuery += ',';
          gqlQuery += `\n`;
        }
      }
      gqlQuery += `${tabs(2)}): [${table.type}]\n`;
    }
  }

  gqlQuery += `${tabs(1)}}\n`;

  return gqlQuery;
}

export default buildGQLQueryType;