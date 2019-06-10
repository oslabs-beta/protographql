import tabs from './tabs';

const buildGQLResolvers = tables => {

  let gqlResolvers = `const resolvers = {\n`;
  // query type resolver
  gqlResolvers += `${tabs(1)}Query: {\n`;
  for (let tbIndex in tables) {
    const table = tables[tbIndex];
    // handles getAll_______ Queries
    gqlResolvers += `${tabs(2)}getAll${table.type}() {\n`;
    gqlResolvers += `${tabs(3)}const sql = \`SELECT * FROM "${table.type}";\`;\n`;
    gqlResolvers += `${tabs(3)}return pool.query(sql)\n`;
    gqlResolvers += `${tabs(4)}.then(res => res.rows)\n`;
    gqlResolvers += `${tabs(4)}.catch(err => console.error('Error is: ', err))\n`;
    gqlResolvers += `${tabs(2)}},\n`;
    // handles get_______ByID Queries
    if (table.fields[0]) {
      const field = table.fields[0].name;
      gqlResolvers += `${tabs(2)}get${table.type}ByID(parent, args, context, info) {\n`;
      gqlResolvers += `${tabs(3)}const sql = \`SELECT * FROM "${table.type}" WHERE "${field}" = '$\{args.${field}}';\`;\n`;
      gqlResolvers += `${tabs(3)}return pool.query(sql)\n`;
      gqlResolvers += `${tabs(4)}.then(res => res.rows[0])\n`;
      gqlResolvers += `${tabs(4)}.catch(err => console.error('Error is: ', err))\n`;
      gqlResolvers += `${tabs(2)}},\n`;
    }
  }
  gqlResolvers += `${tabs(1)}},\n`;
  // object type resolvers
  for (let tbIndex in tables) {
    const table = tables[tbIndex];
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
        gqlResolvers += `${tabs(2)}},\n`
      }
    }
    gqlResolvers += `${tabs(1)}},\n`;
  }
  gqlResolvers += `}`;
  return gqlResolvers;
}

export default buildGQLResolvers;