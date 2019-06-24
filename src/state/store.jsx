import React from 'react';
import * as state from '../state/mockState';
import deepClone from '../utils/deepClone';
import buildGQLSchema from '../utils/buildGQLSchema';
import buildGQLResolvers from '../utils/buildGQLResolvers';
import buildSQLScripts from '../utils/buildSQLScripts';

const initialState = state;

function reducer(state, action) {

  const newState = deepClone(state);
  let selectedTable;

  switch (action.type) {
    case "SET_POP_UP":
      return { ...state, popUp: action.payload };

    case "ADD_TABLE":
      selectedTable = newState.initialTable;
      selectedTable.tableID = newState.tableIndex;
      selectedTable.fields[1].tableNum = newState.tableIndex;  
      return { ...state, selectedTable, tableIndex: newState.tableIndex + 1 };

    case "EDIT_TABLE":
      selectedTable = newState.tables[action.payload];
      return { ...state, selectedTable };

    case "ADD_FIELD":
      // Assign which table and field this newly added field belongs to
      newState.initialField.tableNum = newState.selectedTable.tableID;
      newState.initialField.fieldNum = newState.selectedTable.fieldIndex;

      // Add the new field to our selectedTable and increment the field index on our selectedTable
      newState.selectedTable.fields[newState.selectedTable.fieldIndex++] = newState.initialField;
      return { ...state, selectedTable: newState.selectedTable };

    case "DELETE_FIELD":
      delete newState.selectedTable.fields[action.payload];
      return { ...state, selectedTable: newState.selectedTable };

    case "EDIT_FIELD":
      const { fieldKey, fieldProperty, value } = action.payload;
      newState.selectedTable.fields[fieldKey][fieldProperty] = value;
      return { ...state, selectedTable: newState.selectedTable};

    case "EDIT_RELATIONS":
      const { relationFieldKey, relationFieldProperty, relationValue } = action.payload;
      const currentRelation = newState.selectedTable.fields[relationFieldKey].relation;
      currentRelation[relationFieldProperty] = relationValue;
      if (currentRelation.tableIndex !== -1) newState.selectedTable.fields[relationFieldKey].relationSelected = true;
      else newState.selectedTable.fields[relationFieldKey].relationSelected = false;
      return { ...state, selectedTable: newState.selectedTable};

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
        gqlSchema: buildGQLSchema(newState.tables),
        gqlResolvers: buildGQLResolvers(newState.tables),
        sqlScripts: buildSQLScripts(newState.tables)
      };

    case "DELETE_TABLE":
      delete newState.tables[action.payload];
      return { ...state, tables: newState.tables };

    case "SET_VIEW":
      return { ...state, view: action.payload };

    default:
      return state;
  }
}

export const Store = React.createContext("");

export function StoreProvider (props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}