import buildGQLSchema from './buildGQLSchema';
import { build } from 'protobufjs';

const testInput = {
  0: {
    type: 'FirstTable',
    fields: {
      0: {
        name: 'FirstColumn',
        type: 'ID',
        primaryKey: true,
        unique: true,
        required: false,
        defaultValue: '1',
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
        name: 'SecondColumn',
        type: 'String',
        primaryKey: false,
        unique: false,
        required: true,
        defaultValue: 'thisIsADefaultValue',
        relationSelected: false,
        relation: {
          tableIndex: -1,
          fieldIndex: -1,
          refType: ''
        },
        tableNum: 0,
        fieldNum: 1,
        queryable: true
      },
      2: {
        name: 'ThirdColumn',
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
    type: 'SecondTable',
    fields: {
      0: {
        name: 'SecondTableFirstColumn',
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
        name: 'SecondSecondColumn',
        type: 'String',
        primaryKey: false,
        unique: false,
        required: true,
        defaultValue: 'anotherDefaultValue',
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
        name: 'SecondThirdColumn',
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

const testOutput = `const { gql } = require('apollo-server-express');

const typeDefs = gql\`

  type FirstTable {
    FirstColumn: ID
    SecondColumn: String!
    ThirdColumn: String!
  }

  type SecondTable {
    SecondTableFirstColumn: ID
    SecondSecondColumn: String!
    firsttable: FirstTable
  }

  input FirstTableInput {
    FirstColumn: ID,
    SecondColumn: String!,
    ThirdColumn: String!,
  }

  input SecondTableInput {
    SecondTableFirstColumn: ID,
    SecondSecondColumn: String!,
    firsttable: FirstTableInput,
  }

  type Mutation {
    addFirstTable(
      input: FirstTableInput
    ): [FirstTable]
    addSecondTable(
      input: SecondTableInput
    ): [SecondTable]
  }

  type Query {
    getAllFirstTable: [FirstTable]
    getFirstTable(
      SecondColumn: String
    ): [FirstTable]
    getAllSecondTable: [SecondTable]
    getSecondTable(
      SecondTableFirstColumn: ID,
      SecondSecondColumn: String,
      SecondThirdColumn: ID
    ): [SecondTable]
  }

\`;

module.exports = typeDefs;
`

test('Building GQL Schema does not return null: ', () => {
    expect(buildGQLSchema(testInput)).not.toBeNull;
});

test('When trying to create the GQL Schema the result is a string: ', () => {
  expect(typeof(buildGQLSchema(testInput))).toBe('string');
});

test('Building GQL Schema works given test input: ', () => {
  expect(buildGQLSchema(testInput)).toBe(testOutput);
});