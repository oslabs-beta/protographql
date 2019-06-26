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
        queryable: true
      }
    },
    fieldIndex: 3,
    tableID: 1
  },
};

export const view = 'table';

export const popUp = 'welcome';

export const visualizeJSON = {"name":"Queries", "children":[{"name":"getAllAuthor","type":"[Author]","children":[{"name":"Author","type":"[Author]"}]},{"name": "getAuthor","type":"[Author]","children":[{"name": "Author","type": "[Author]","children": [{"name":"id", "type":"ID"},{"name":"first_name", "type":"String"},{"name":"last_name", "type":"String"}]}]},{"name":"getAllBooks","type":"[Books]","children":[{"name":"Books","type":"[Books]"}]},{"name": "getBooks","type":"[Books]","children":[{"name": "Books","type": "[Books]","children": [{"name":"id", "type":"ID"},{"name":"name", "type":"String"},{"name":"author_id", "type":"ID"}]}]}]}

export const gqlSchema = `const { gql } = require('apollo-server-express');

const typeDefs = gql\`

  type Author {
    id: ID
    first_name: String!
    last_name: String!
  }

  type Books {
    id: ID
    name: String!
    author: Author
  }

  type Query {
    getAllAuthor: [Author]
    getAllBooks: [Books]
    getBooks(
      id: ID,
      name: String,
      author_id: ID
    ): [Books]
  }

\`;

module.exports = typeDefs;`;

export const gqlResolvers = `const pool = require('../db/sqlPool');

const resolvers = {

  Query: {
    getAllAuthor() {
      const sql = \`SELECT * FROM "Author";\`;
      return pool.query(sql)
        .then(res => res.rows)
        .catch(err => console.error('Error is: ', err));
    },
    getAllBooks() {
      const sql = \`SELECT * FROM "Books";\`;
      return pool.query(sql)
        .then(res => res.rows)
        .catch(err => console.error('Error is: ', err));
    },
    getBooks(parent, args, context, info) {
      let sql = \`SELECT * FROM "Books"\`;
      let whereClause = \` WHERE \`;
      Object.keys(args).forEach((fieldName, i , arr) => {
        whereClause += \`"\${fieldName}" = '\${args[fieldName]}'\`;
        if (i !== arr.length - 1) whereClause += \` AND \`;
        else whereClause += \`;\`;
      });
      sql += whereClause;
      return pool.query(sql)
        .then(res => res.rows)
        .catch(err => console.error('Error is: ', err));
    },
  },

  Author: {
    id: (parent, args, context, info) => {
      return parent.id;
    },
    first_name: (parent, args, context, info) => {
      return parent.first_name;
    },
    last_name: (parent, args, context, info) => {
      return parent.last_name;
    },
  },

  Books: {
    id: (parent, args, context, info) => {
      return parent.id;
    },
    name: (parent, args, context, info) => {
      return parent.name;
    },
    author: (parent, args, context, info) => {
      const sql = \`SELECT * FROM "Author" WHERE "id" = '\${parent.author_id}';\`;
      return pool.query(sql)
        .then(res => res.rows[0])
        .catch(err => console.error('Error is: ', err))
    },
  },

}

module.exports = resolvers;`;

export const sqlScripts = `CREATE TABLE "Author"(
  "id" SERIAL PRIMARY KEY UNIQUE,
  "first_name" VARCHAR(256) NOT NULL,
  "last_name" VARCHAR(256) NOT NULL
);

CREATE TABLE "Books"(
  "id" SERIAL PRIMARY KEY UNIQUE,
  "name" VARCHAR(256) NOT NULL,
  "author_id" SERIAL NOT NULL
);`;

export const dbConnectionURI = '';

export const displayError = { displayStatus: false, throttleStatus: true, relatedTable: -1, relatedField: -1 };
