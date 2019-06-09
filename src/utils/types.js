// User must npm install 'apollo-server' or 'apollo-server-express'
// https://www.apollographql.com/docs/tutorial/schema/
const schemaText = `
  const { gql } = require('apollo-server-express');
  const typeDefs = gql\`\`;

  module.exports = typeDefs;
`;

// Autogenerate default GQL types with object & scalar GQL fields
const buildGQLTypes = tables => {
  let gqlTypeCode = '';

  // Define a GQL Type for each table
  for (let tbIndex in tables) {
    const table = tables[tbIndex];
    gqlTypeCode += `${tabs(1)}type ${table.type} {\n`; // Open GQL type definition
    // Iterate through each table field and define its respective GQL property 
    for (let fieldIndex in table.fields) {
      const field = table.fields[fieldIndex];
      gqlTypeCode += field.relationSelected ? addObjectField(field) : addScalarField(field);
      gqlTypeCode += `\n`;
    }
    gqlTypeCode += `${tabs(1)}}\n\n`; // Close GQL type definition
  }

  return gqlTypeCode;
}

/********************************   HELPER FUNCTIONS    **********************************/

// Returns string of user-input tabbed spaces to indent our code
const tabs = numTabSpaces => {
  let tabSpaces = ``;
  while (numTabSpaces > 0) {
    tabSpaces += `  `;
    numTabSpaces--;
  } 
  return tabSpaces;
}

// Returns a string of a GQL object field 
const addObjectField = field => {
  const { tableIndex, refType } = field.relation;
  // Wrap linked field in curly braces if we have an 'xxx to many' relationship
  let object = refType.slice(-4) === `many` ? 
    `${tabs(2)}related${tables[tableIndex].type}: [${tables[tableIndex].type}]` : 
    `${tabs(2)}related${tables[tableIndex].type}: ${tables[tableIndex].type}`;
  return object;
}

// Returns a string of a GQL scalar field 
const addScalarField = field => {
  let scalar = `${tabs(2)}${field.name}: ${field.type}`;
  scalar += field.required ?  `!` : ``;
  return scalar;
}

console.log(buildGQLTypes(tables));