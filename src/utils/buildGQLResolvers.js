import tabs from './tabs';

const buildGQLResolvers = tables => {

  let gqlResolvers = `const resolvers = {\n`;
  for (let tbIndex in tables) {
    const table = tables[tbIndex];

    // object type resolvers
    gqlResolvers += `${tabs(1)}${table.type}: {\n`;
    for (let fieldIndex in table.fields) {
      const field = table.fields[fieldIndex];
      // handle scalar fields
      if (!field.relationSelected) {
        gqlResolvers += `${tabs(2)}${field.name}: (parent, args, context, info) => {\n`;
        gqlResolvers += `${tabs(3)}return parent.${field.name};\n${tabs(2)}},\n`;
      } else {
        // handle non-scalar fields
        const linkedTable = tables[field.relation.tableIndex];
        const linkedTableName = linkedTable.type;
        const linkedTableField = linkedTable.fields[field.relation.fieldIndex].name;
        gqlResolvers += `${tabs(2)}${linkedTableName.toLowerCase()}: (parent, args, context, info) => {\n`;
        gqlResolvers += `${tabs(3)}const sql = \`SELECT * FROM "${linkedTableName}" WHERE "${linkedTableField}" = '$\{parent.${field.name}}';\`;\n`;
        gqlResolvers += `${tabs(3)}return pool.query(sql)\n`;
        gqlResolvers += `${tabs(4)}.then(res => res.rows[0])\n`;
        gqlResolvers += `${tabs(4)}.catch(err => console.error('Error is: ', err))\n`;
        gqlResolvers += `${tabs(2)}}\n`
      }
    }
    gqlResolvers += `${tabs(1)}},\n`;
    
  }
  // query type resolver
  gqlResolvers += `}`;
  return gqlResolvers;
}

export default buildGQLResolvers;