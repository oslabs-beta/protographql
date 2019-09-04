import tabs from './tabs';

const buildGQLResolvers = tables => {
  let gqlResolvers = `const pool = require('../db/sqlPool');\n\n`;
  gqlResolvers += `const resolvers = {\n\n`;

  // QUERY TYPE RESOLVERS
  gqlResolvers += `${tabs(1)}Query: {\n`;
  for (let tbIndex in tables) {
    const table = tables[tbIndex];

    // handles getAll_______ Queries
    gqlResolvers += `${tabs(2)}getAll${table.type}() {\n`;
    gqlResolvers += `${tabs(3)}const sql = \`SELECT * FROM "${table.type}";\`;\n`;
    gqlResolvers += `${tabs(3)}return pool.query(sql)\n`;
    gqlResolvers += `${tabs(4)}.then(res => res.rows)\n`;
    gqlResolvers += `${tabs(4)}.catch(err => console.error('Error is: ', err));\n`;
    gqlResolvers += `${tabs(2)}},\n`;

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

    // Custom Queries (get____(args: ...))
    let customQryResolver = ``;
    if (queryable) {
      customQryResolver += `${tabs(2)}get${table.type}(parent, args, context, info) {\n`;
      customQryResolver += `${tabs(3)}let sql = \`SELECT * FROM "${table.type}"\`;\n`;
      customQryResolver += `${tabs(3)}let whereClause = \` WHERE \`;\n`;
      customQryResolver += `${tabs(3)}Object.keys(args).forEach((fieldName, i , arr) => {\n`;
      customQryResolver += `${tabs(4)}whereClause += \`"\${fieldName}" = '\${args[fieldName]}'\`;\n`;
      customQryResolver += `${tabs(4)}if (i !== arr.length - 1) whereClause += \` AND \`;\n`;
      customQryResolver += `${tabs(4)}else whereClause += \`;\`;\n`;
      customQryResolver += `${tabs(3)}});\n`;
      customQryResolver += `${tabs(3)}sql += whereClause;\n`;
    }

    customQryResolver += `${tabs(3)}return pool.query(sql)\n`;
    customQryResolver += `${tabs(4)}.then(res => res.rows)\n`;
    customQryResolver += `${tabs(4)}.catch(err => console.error('Error is: ', err));\n`;
    customQryResolver += `${tabs(2)}},\n`;

    // If the table has at least one queryable field, then provide a query by that field
    if (queryable) gqlResolvers += customQryResolver;
  }

  gqlResolvers += `${tabs(1)}},\n\n`;

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

    gqlResolvers += `${tabs(1)}},\n\n`;

  }

  
  //MUTATION TYPE RESOLVERS
  gqlResolvers += `${tabs(1)}Mutation: {\n`;
  for (let tbIndex in tables) {
    const table = tables[tbIndex];
    
    // handles add_______ Queries
    gqlResolvers += `${tabs(2)}add${table.type}(parent, args, context, info) {\n`;
    gqlResolvers += `${tabs(3)}let sql = \`INSERT INTO "${table.type}" \`;\n`;
    gqlResolvers += `${tabs(3)}let valuesStr = \` VALUES (\`;\n`;
    gqlResolvers += `${tabs(3)}let values = [];\n`;
    gqlResolvers += `${tabs(3)}let columnsStr = \`(\`\n`;
    gqlResolvers += `${tabs(3)}Object.keys(args.input).forEach((fieldName, i, arr) => {\n`;
    gqlResolvers += `${tabs(4)}if(i == arr.length - 1){\n`;
    gqlResolvers += `${tabs(5)}columnsStr += \`\${fieldName})\`\n`;
    gqlResolvers += `${tabs(4)}} else {\n`;
    gqlResolvers += `${tabs(5)}columnsStr += \`\${fieldName},\`\n`;
    gqlResolvers += `${tabs(4)}}\n`;
    gqlResolvers += `${tabs(3)}})\n`;
    gqlResolvers += `${tabs(3)}Object.values(args.input).forEach((value, i, arr) => {\n`;
    gqlResolvers += `${tabs(4)}if( i == arr.length - 1){\n`;
    gqlResolvers += `${tabs(5)}valuesStr += \`$\${i + 1})\`\n`;
    gqlResolvers += `${tabs(4)}} else {\n`;
    gqlResolvers += `${tabs(5)}valuesStr += \`$\${i + 1},\`\n`;
    gqlResolvers += `${tabs(4)}}\n`;
    gqlResolvers += `${tabs(4)}values.push(value);\n`;
    gqlResolvers += `${tabs(3)}})\n`;
    gqlResolvers += `${tabs(3)}sql = sql + columnsStr + valuesStr;\n`;
    gqlResolvers += `${tabs(3)}return pool.query(sql, values)\n`;
    gqlResolvers += `${tabs(3)}.then(res => res.rows)\n`;
    gqlResolvers += `${tabs(3)}.catch(err => console.error('Error is: ', err));\n`;
    gqlResolvers += `${tabs(2)}}\n`;
    gqlResolvers += `${tabs(1)}},\n`;
    
  }
  
  gqlResolvers += `}\n\n`;
  
  gqlResolvers += `module.exports = resolvers;\n`;
  
  return gqlResolvers;
}

export default buildGQLResolvers;
