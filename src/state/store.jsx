import React from 'react';
import * as state from '../state/mockState';
import deepClone from '../utils/deepClone';

const initialState = state;

function reducer(state, action) {

  const newState = deepClone(state);
  let selectedTable;

  switch (action.type) {
    case "SET_POP_UP":
      return { ...state, popUp: action.payload };

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

    case "EDIT_SELECTED_TABLE_NAME":
      newState.selectedTable.type = action.payload;
      return { ...state, selectedTable: newState.selectedTable };

    case "SET_SELECTED_TABLE":
      
      if (action.payload === -1) {
        selectedTable = newState.initialTable;
        selectedTable.tableID = newState.tableIndex;
        selectedTable.fields[1].tableNum = newState.tableIndex;
      }
      if (action.payload !== -1) selectedTable = newState.tables[action.payload];
      return { ...state, selectedTable };

    case "SET_TABLE_INDEX":
      return { ...state, tableIndex: action.payload };

    case "SET_TABLES":
      return { ...state, tables: action.payload };

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