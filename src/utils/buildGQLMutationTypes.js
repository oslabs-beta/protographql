import tabs from './tabs';

// Autogenerate default GQL queries
const buildGQLMutationTypes = tables => {
  let gqlMutation = `${tabs(1)}type Mutation {\n`;

  // Define a GQL mutation for each table
  for (let tbIndex in tables) {
    const table = tables[tbIndex];
    gqlMutation += `${tabs(2)}add${table.type}(\n${tabs(3)}input: ${table.type}Input\n${tabs(2)}): [${table.type}]\n`;
    
  }

  gqlMutation += `${tabs(1)}}\n\n`;

  return gqlMutation;
}

export default buildGQLMutationTypes;