import tabs from './tabs';

// Autogenerate default GQL types with object & scalar GQL fields
const buildGQLInputTypes = tables => {
  let gqlTypes = ``;

  // Define a GQL Type for each table
  for (let tbIndex in tables) {
    const table = tables[tbIndex];
    gqlTypes += `${tabs(1)}input ${table.type}Input {\n`; // Open GQL type definition
    // Iterate through each table field and define its respective GQL property 
    for (let fieldIndex in table.fields) {
      const field = table.fields[fieldIndex];
      gqlTypes += field.relationSelected ? addObjectField(tables, field) : addScalarField(field);
      gqlTypes += `,\n`;
    }
    gqlTypes += `${tabs(1)}}\n\n`; // Close GQL type definition
  }

  return gqlTypes;
}

/**********************************    HELPER FUNCTIONS    **********************************/

// Returns a string of a GQL object field 
const addObjectField = (tables, field) => {
  const { tableIndex, refType } = field.relation;
  const linkedTableName = tables[tableIndex].type;
  // Wrap linked field in curly braces if we have an 'xxx to many' relationship
  let objectField = refType.slice(-4) === `many` ? 
    `${tabs(2)}${linkedTableName.toLowerCase()}: [${linkedTableName}]` : 
    `${tabs(2)}${linkedTableName.toLowerCase()}: ${linkedTableName}`;
  return objectField;
}

// Returns a string of a GQL scalar field 
const addScalarField = field => {
  let scalarField = `${tabs(2)}${field.name}: ${field.type}`;
  scalarField += field.required ?  `!` : ``;
  return scalarField;
}

export default buildGQLInputTypes;