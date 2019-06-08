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
        type: 'String',
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
        type: 'String',
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
        type: 'String',
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

// User must npm install 'apollo-server' or 'apollo-server-express'
// https://www.apollographql.com/docs/tutorial/schema/
const schemaText = `
  const { gql } = require('apollo-server-express');
  const typeDefs = gql\`\`;

  module.exports = typeDefs;
`;

// Autogenerate default GQL types with scalar GQL fields
const buildGQLTypes = tables => {
  let gqlTypeCode = '';

  // Iterate through each table in our state. Define a GQL Type for each table.
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