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

// Autogenerate default GQL queries
const buildGQLQuery = tables => {
  let gqlQuery = `${tabs(1)}type Query {\n`;

  // Define a GQL query for each table
  for (let tbIndex in tables) {
    const table = tables[tbIndex];
    gqlQuery += `${tabs(2)}getAll${table.type}: [${table.type}]\n`; 
    // If the table field has a UNIQUEID (at field index 0) then provide a query by ID
    gqlQuery += table.fields[0] ? `${tabs(2)}get${table.type}ByID(id: ID!): ${table.type}\n` : ``; 
  }

  gqlQuery += `${tabs(1)}}\n`;

  return gqlQuery;
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

console.log(buildGQLQuery(tables));