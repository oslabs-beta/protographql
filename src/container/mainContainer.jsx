import React, { useState } from 'react';
import Header from '../components/header/header';
import NavSideBar from '../components/navSideBar/navSidebar';
import Welcome from '../components/popup/welcome';

const Main = () => {

  //State constants instantiated using useState
    //Clean initial state
      /*
      const [selectedTable, setSelectedTable] = useState({
        type: '',
        fields: {},
        fieldIndex: 1,
        tableID: -1
      });

      const [selectedField, setSelectedField] = useState({
        name: '',
        type: 'string',
        primaryKey: false,
        autoIncrement: false,
        unique: false,
        defaultValue: '',
        required: false,
        multipleValues: false,
        relationSelected: false,
        relation: {
          tableIndex: -1,
          fieldIndex: -1,
          refType: ''
        },
        refBy: new Set(),
        tableNum: -1,
        fieldNum: -1,
      });

      const [tableIndex, setTableIndex] = useState(0);

      const [tables, setTables] = useState({});

      //this will toggle the tab shown in the sandbox area
      //potential tabs for MVP are code & schema, stretch would include GQL setup area
      const [view, setView] = useState('schema');

      //this will toggle popups
      //potential popups are welcome and export (select folder to save & success)
      const [popUp, setPopUp] = useState('welcome');

      */
  
  //Mock state data
  const [selectedTable, setSelectedTable] = useState({
    type: '',
    fields: {},
    fieldIndex: 1,
    tableID: -1
  });

  const [selectedField, setSelectedField] = useState({
    name: '',
    type: 'string',
    primaryKey: false,
    autoIncrement: false,
    unique: false,
    required: false,
    multipleValues: false,
    defaultValue: '',
    relationSelected: false,
    relation: {
        tableIndex: -1,
        fieldIndex: -1,
        refType: ''
    },
    tableNum: -1,
    fieldNum: -1,
    refBy: new Set()
  });

  const [tableIndex, setTableIndex] = useState(2);

  const [tables, setTables] = useState({
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
  });

  const [view, setView] = useState('schema');

  const [popUp, setPopUp] = useState('welcome');


  //Rendered components and elements
  return (
    <div>
      <h1> Our cool ProtoGraphQL App </h1>
      {/* 
      uncomment the components to test
      <Header />
      <NavSideBar />
      <Welcome /> */}
    </div>
  )
}


export default Main;