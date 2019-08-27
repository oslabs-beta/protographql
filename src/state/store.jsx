/* eslint-disable no-case-declarations */
import React from 'react';
import * as state from '../state/initialState';
import deepClone from '../utils/deepClone';
import buildGQLSchema from '../utils/buildGQLSchema';
import buildGQLResolvers from '../utils/buildGQLResolvers';
import buildSQLScripts from '../utils/buildSQLScripts';
import { buildVisualizerJson } from '../utils/buildVisualizerJson';

// sets the intial state of the application as found in '../state/initialState'
const initialState = state;

function reducer(state, action) {

  // makes a deep clone of 'state' to enable updates of 'state'
  const newState = deepClone(state);
  let selectedTable;
  let tables;

  switch (action.type) {
    case "SET_POP_UP":
      return { ...state, popUp: action.payload };

    case "ADD_TABLE":
      selectedTable = newState.initialTable;
      selectedTable.tableID = newState.tableIndex;
      selectedTable.fields[1].tableNum = newState.tableIndex;
      return { ...state, selectedTable, tableIndex: newState.tableIndex + 1 };

    case "ADD_FIELD":
      // Assign which table and field this newly added field belongs to
      newState.initialField.tableNum = newState.selectedTable.tableID;
      newState.initialField.fieldNum = newState.selectedTable.fieldIndex;

      // Add the new field to our selectedTable and increment the field index on our selectedTable
      newState.selectedTable.fields[newState.selectedTable.fieldIndex++] = newState.initialField;
      return { ...state, selectedTable: newState.selectedTable };

    case "EDIT_TABLE":
      newState.selectedTable = newState.tables[action.payload];
      return { ...state, selectedTable: newState.selectedTable };

    case "EDIT_FIELD":
      const { fieldKey, fieldProperty, value } = action.payload;
      newState.selectedTable.fields[fieldKey][fieldProperty] = value;
      return { ...state, selectedTable: newState.selectedTable };

    case "EDIT_RELATIONS":
      const { relationFieldKey, relationFieldProperty, relationValue } = action.payload;
      const currentRelation = newState.selectedTable.fields[relationFieldKey].relation;
      currentRelation[relationFieldProperty] = relationValue;
      if (currentRelation.tableIndex !== -1) newState.selectedTable.fields[relationFieldKey].relationSelected = true;
      else newState.selectedTable.fields[relationFieldKey].relationSelected = false;
      return { ...state, selectedTable: newState.selectedTable };

    case "EDIT_TABLE_NAME":
      newState.selectedTable.type = action.payload;
      return { ...state, selectedTable: newState.selectedTable };

    // This case will increment tableIndex regardless whether we're adding a new table or editing an existing one
    case "SAVE_TABLE":
      newState.tables[newState.selectedTable.tableID] = newState.selectedTable;

      return {
        ...state,
        tables: newState.tables,
        tableIndex: newState.tableIndex + 1,
        visualizeJSON: buildVisualizerJson(deepClone(newState.tables)),
        gqlSchema: buildGQLSchema(newState.tables),
        gqlResolvers: buildGQLResolvers(newState.tables),
        sqlScripts: buildSQLScripts(newState.tables)
      };


    case "DELETE_TABLE":
      tables = Object.values(newState.tables);
      for (let table of tables) {
        const fields = Object.values(table.fields);
        for (let field of fields) {
          if (Number(field.relation.tableIndex) === Number(action.payload)) {
            newState.displayError.displayStatus = true;
            newState.displayError.relatedTable = table.type;
            newState.displayError.relatedField = field.name;
            return { ...state, displayError: newState.displayError };
          }
        }
      }
      delete newState.tables[action.payload];
      return {
        ...state,
        tables: newState.tables,
        visualizeJSON: buildVisualizerJson(deepClone(newState.tables)),
        gqlSchema: buildGQLSchema(newState.tables),
        gqlResolvers: buildGQLResolvers(newState.tables),
        sqlScripts: buildSQLScripts(newState.tables)
      };

    case "DELETE_FIELD":
      tables = Object.values(newState.tables);
      for (let table of tables) {
        const fields = Object.values(table.fields);
        for (let field of fields) {
          if (Number(field.relation.tableIndex) === Number(newState.selectedTable.tableID) && field.relation.fieldIndex === action.payload) {
            newState.displayError.displayStatus = true;
            newState.displayError.relatedTable = table.type;
            newState.displayError.relatedField = field.name;
            return { ...state, displayError: newState.displayError };
          }
        }
      }

      delete newState.selectedTable.fields[action.payload];
      return { ...state, selectedTable: newState.selectedTable };

    case "SET_VIEW":
      return { ...state, view: action.payload };

    case "HIDE_DISPLAY_ERROR":
      newState.displayError.displayStatus = false;
      return { ...state, displayError: newState.displayError };

    case "THROTTLE_DISPLAY_ERROR":
      newState.displayError.throttleStatus = !newState.displayError.throttleStatus;
      return { ...state, displayError: newState.displayError };

    case "UPDATE_QUERIES":
      console.log(action.payload[0][0]);
      return {
        ...state,
        queries: [state.queries[0].concat(action.payload[0][0]), state.queries[1].concat(action.payload[1][0])]
      }

    case "UPDATE_URI_STRING": 
      return {
        ...state, 
        uriInputString += action.payload;
      }

      case "ADD_APOLLO_SERVER_URI":
        let newStr = uriInputString;
        uriInputString = '';
        return {
          ...state,
          apolloServerURI = newStr,
        }

    default:
      return state;
  }
}

export const Store = React.createContext("");

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}