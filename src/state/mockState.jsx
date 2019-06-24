export const selectedTable = {
  type: '',
  fields: {},
  fieldIndex: 1,
  tableID: -1
};

export const initialTable = {
  type: '',
  fields: {
      1: {
      name: '',
      type: 'ID',
      primaryKey: false,
      unique: false,
      defaultValue: '',
      required: false,
      relationSelected: false,
      relation: {
        tableIndex: -1,
        fieldIndex: -1,
        refType: ''
      },
      refBy: new Set(),
      queryable: true,
      tableNum: tableIndex,
      fieldNum: 1,
    }
  },
  fieldIndex: 2,
  tableID: -1
};

export const initialField = {
  name: '',
  type: 'ID',
  primaryKey: false,
  unique: false,
  required: false,
  defaultValue: '',
  relationSelected: false,
  relation: {
    tableIndex: -1,
    fieldIndex: -1,
    refType: ''
  },
  tableNum: -1,
  fieldNum: -1,
  refBy: new Set(),
  queryable: true
};

export const tableIndex = 2;

export const tables = {
  0: {
    type: 'Author',
    fields: {
      0: {
        name: 'id',
        type: 'ID',
        primaryKey: true,
        unique: true,
        required: false,
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
        unique: false,
        required: true,
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
        unique: false,
        required: true,
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
        unique: true,
        required: false,
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
        unique: false,
        required: true,
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
        unique: false,
        required: true,
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

export const view = 'table';

export const popUp = 'welcome';

export const gqlSchema = `const { gql } = require('apollo-server-express');\n\nmodule.exports = typeDefs;\n`;

export const gqlResolvers = `const pool = require('./sqlPool');\n\nmodule.exports = resolvers;\n`;

export const sqlScripts = ``;
