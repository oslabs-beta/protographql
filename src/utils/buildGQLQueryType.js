import tabs from './tabs';

// Autogenerate default GQL queries
const buildGQLQueryType = tables => {
  let gqlQuery = `${tabs(1)}type Query {\n`;

  // Define a GQL query for each table
  for (let tbIndex in tables) {
    const table = tables[tbIndex];
    gqlQuery += `${tabs(2)}getAll${table.type}: [${table.type}]\n`; 
    // If the table field has a UNIQUEID (at field index 0) then provide a query by ID
    gqlQuery += table.fields[0] ? `${tabs(2)}get${table.type}ByID(id: ID!): ${table.type}\n` : ``; 
  }

  gqlQuery += `${tabs(1)}}\n`;

  return gqlQuery;
}

export default buildGQLQueryType;