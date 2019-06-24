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
        refBy: {},
        queryable: false
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
        refBy: {},
        queryable: false
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
        refBy: {},
        queryable: false
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
        refBy: {},
        queryable: true
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
        refBy: {},
        queryable: true
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
        refBy: {},
        queryable: true
      }
    },
    fieldIndex: 3,
    tableID: 1
  },
};


/**********************************    HELPER FUNCTIONS    **********************************/
// Returns a string of a GQL object field 
const addObjectField = (tables, field) => {
  const { tableIndex, refType } = field.relation;
  const linkedTableName = tables[tableIndex].type;
  // Wrap linked field in curly braces if we have an 'xxx to many' relationship
  let objectField = refType.slice(-4) === `many` ? 
    `"${linkedTableName.toLowerCase()}": ["${linkedTableName}"]` : 
    `"${linkedTableName.toLowerCase()}": "${linkedTableName}"`;
  return objectField;
}

// Returns a string of a GQL scalar field 
const addScalarField = field => {
  let scalarField = `"${field.name}": "${field.type}`;
  scalarField += field.required ?  `!"` : `"`;
  return scalarField;
}


// Autogenerate default GQL types with object & scalar GQL fields
const buildGQLObjTypes = tables => {
  let gqlTypes = `{`;

  // Define a GQL Type for each table
  for (let tbIndex in tables) {
    const table = tables[tbIndex];
    gqlTypes += `\n"${table.type}": \n{`; // Open GQL type definition
    // Iterate through each table field and define its respective GQL property 
    for (let fieldIndex in table.fields) {
      const field = table.fields[fieldIndex];
      gqlTypes += field.relationSelected ? addObjectField(tables, field) : addScalarField(field);
      if (fieldIndex !== Object.keys(table.fields)[Object.keys(table.fields).length - 1]) {
        gqlTypes += `,\n`;  
      }
    }
    gqlTypes += `}`
    if (tbIndex !== Object.keys(tables)[Object.keys(tables).length - 1]) {
      gqlTypes += `,`
    } // Close GQL type definition
  }
  gqlTypes += '\n}'

  return gqlTypes;
}

console.log(JSON.parse(buildGQLObjTypes(tables)))
const test = buildGQLObjTypes(tables)


