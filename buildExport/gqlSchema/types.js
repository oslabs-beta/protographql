// Copy from mockState.tablesState -- Need to replace this so that this is linked to our Main Container state.
const tables = {
  0: {
    type: 'Author',
    fields: {
      0: {
        name: 'id',
        type: 'ID',
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        required: false,
        multipleValues: false,
        defaultValue: '',
        relationSelected: false,
        relation: {
            tableIndex: -1,
            fieldIndex: -1,
            refType: ''
        },
        tableNum: 0,
        fieldNum: 0,
        refBy: {}
      },
      1: {
        name: 'first_name',
        type: 'string',
        primaryKey: false,
        autoIncrement: false,
        unique: false,
        required: true,
        multipleValues: false,
        defaultValue: '',
        relationSelected: false,
        relation: {
            tableIndex: -1,
            fieldIndex: -1,
            refType: ''
        },
        tableNum: 0,
        fieldNum: 1,
        refBy: {}
      },
      2: {
        name: 'last_name',
        type: 'string',
        primaryKey: false,
        autoIncrement: false,
        unique: false,
        required: true,
        multipleValues: false,
        defaultValue: '',
        relationSelected: false,
        relation: {
            tableIndex: -1,
            fieldIndex: -1,
            refType: ''
        },
        tableNum: 0,
        fieldNum: 2,
        refBy: {}
      }
    },
    fieldIndex: 3,
    tableID: 0
  },
  1: {
    type: 'Books',
    fields: {
      0: {
        name: 'id',
        type: 'ID',
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        required: false,
        multipleValues: false,
        defaultValue: '',
        relationSelected: false,
        relation: {
            tableIndex: -1,
            fieldIndex: -1,
            refType: ''
        },
        tableNum: 1,
        fieldNum: 0,
        refBy: {}
      },
      1: {
        name: 'name',
        type: 'string',
        primaryKey: false,
        autoIncrement: false,
        unique: false,
        required: true,
        multipleValues: false,
        defaultValue: '',
        relationSelected: false,
        relation: {
            tableIndex: -1,
            fieldIndex: -1,
            refType: ''
        },
        tableNum: 1,
        fieldNum: 1,
        refBy: {}
      },
      2: {
        name: 'author_id',
        type: 'ID',
        primaryKey: false,
        autoIncrement: false,
        unique: false,
        required: true,
        multipleValues: false,
        defaultValue: '',
        relationSelected: true,
        relation: {
            tableIndex: '0',
            fieldIndex: '0',
            refType: 'many to one'
        },
        tableNum: 1,
        fieldNum: 2,
        refBy: {}
      }
    },
    fieldIndex: 3,
    tableID: 0
  },
};

// User must npm install 'apollo-server'
// https://www.apollographql.com/docs/tutorial/schema/
const schemaText = `
  const { gql } = require('apollo-server');
  const typeDefs = gql\`\`;

  module.exports = typeDefs;
`;

// Autogenerate default GQL types with scalar GQL fields
const buildGQLTypes = tables => {
  let gqlTypeCode = '';

  // Iterate through each table in our state. Define a GQL Type for each table.
  for (let tbIndex in tables) {
    const table = tables[tbIndex];
    gqlTypeCode += `type ${table.type} {\n`;

    // Iterate through each field in each table. Define a GQL field for each field
    for (let fieldIndex in table.fields) {
      const field = table.fields[fieldIndex];
      gqlTypeCode += `  ${field.name}: ${field.type}`; // Need map between SQL and GQL types OR fix field.type 
      // ID, String, Boolean, Int, Float -- NEED TO ENFORCE THIS RULE FOR EACH FIELD TYPE.
      gqlTypeCode += field.required ?  `!` : ``;
      gqlTypeCode += `\n`;
    }
    gqlTypeCode += `}\n\n`;
  }

  return gqlTypeCode;
}

console.log(buildGQLTypes(tables));