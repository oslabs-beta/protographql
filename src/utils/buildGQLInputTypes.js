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
      gqlTypes += addScalarField(field);
      gqlTypes += `,\n`;
    }
    gqlTypes += `${tabs(1)}}\n\n`; // Close GQL type definition
  }

  return gqlTypes;
}

/**********************************    HELPER FUNCTIONS    **********************************/

// Returns a string of a GQL scalar field 
const addScalarField = field => {
  let scalarField = `${tabs(2)}${field.name}: ${field.type}`;
  scalarField += field.required ?  `!` : ``;
  return scalarField;
}

export default buildGQLInputTypes;