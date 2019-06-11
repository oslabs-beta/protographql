import tabs from './tabs';

const buildGQLResolvers = tables => {

  let gqlResolvers = `const resolvers = {\n`;
  // QUERY TYPE RESOLVERS
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

    // Custom Queries (get____(args: ...))
    let queryable = false;
    let customQryResolver = `${tabs(2)}get${table.type}(parent, args, context, info) {\n`;
    customQryResolver += `${tabs(3)}const sql = \`\n${tabs(4)}SELECT *\n`;
    customQryResolver += `${tabs(4)}FROM "${table.type}"\n`;
    customQryResolver += `${tabs(4)}WHERE `;

    for (let fieldIndex in table.fields) {
      const field = table.fields[fieldIndex];
      // check if the field is queryable
      if (field.queryable) {
        queryable = true;
        customQryResolver += `"${field.name}" = '$\{args.${field.name}}'`;

        if (table.fieldIndex - 1 !== field.fieldNum) customQryResolver += ' AND ';
      }      
    }
    customQryResolver += `;\n${tabs(3)}\`;\n`
    customQryResolver += `${tabs(3)}return pool.query(sql)\n`;
    customQryResolver += `${tabs(4)}.then(res => res.rows)\n`;
    customQryResolver += `${tabs(4)}.catch(err => console.error('Error is: ', err));\n`;
    customQryResolver += `${tabs(2)}},\n`;

    // If the table has at least one queryable field, then provide a query by that field
    if (queryable) gqlResolvers += customQryResolver;
  }

  gqlResolvers += `${tabs(1)}},\n`;

  // OBJECT TYPE RESOLVERS
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