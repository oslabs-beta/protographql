export const selectedTable = {
  type: '',
  fields: {},
  fieldIndex: 1,
  tableID: 0
};

// specifies the initial values of the input table that appears when a user clicks 'Add Table'
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
      queryable: true,
      tableNum: 0,
      fieldNum: 1,
    }
  },
  fieldIndex: 2,
  tableID: 0
};

/*
specifies the initial values of the input table that appears when a user clicks 'Add Field' within
the input table that appears after a user clicks 'Add Table'
*/
export const initialField = {
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
  queryable: true,
  tableNum: -1,
  fieldNum: -1,
};

export const tableIndex = 0;

export const tables = {};

//this will toggle the tab shown in the sandbox area
//potential tabs for MVP are code & schema, stretch would include GQL setup area
export const view = 'schema';

//this will toggle popups
//potential popups are welcome and export (select folder to save & success)
export const popUp = 'welcome';

export const visualizeJSON = { "name": "Queries" };

export const gqlSchema = `const { gql } = require('apollo-server-express');\n\nmodule.exports = typeDefs;\n`;

export const gqlResolvers = `const pool = require('../db/sqlPool');\n\nmodule.exports = resolvers;\n`;

export const sqlScripts = ``;

export const queries = [[], []];

export const displayError = { displayStatus: false, throttleStatus: true, relatedTable: -1, relatedField: -1 };

// stores the Apollo server URI input by the user in tests view
export const apolloServerURI = '';
